import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-captura-qr',
  templateUrl: './captura-qr.page.html',
  styleUrls: ['./captura-qr.page.scss'],
})
export class CapturaQrPage implements OnInit {
  qrData: any = null;
  scannerControls: IScannerControls | null = null;
  docenteId: string | null = null; // ID del docente logueado

  constructor(private alertController: AlertController, private http: HttpService) {}

  ngOnInit(): void {
    this.obtenerDocenteLogueado();
    this.iniciarEscaneo(); // Inicia el escaneo automáticamente
  }

  obtenerDocenteLogueado() {
    const usuarioLogueado = localStorage.getItem('usuarioAutenticado');
    if (usuarioLogueado) {
      const usuario = JSON.parse(usuarioLogueado);
      if (usuario.rol === 'docente') {
        this.docenteId = usuario.id;
      } else {
        console.error('El usuario logueado no es un docente.');
      }
    } else {
      console.error('No se encontró un usuario logueado.');
    }
  }

  async iniciarEscaneo() {
    try {
      const codeReader = new BrowserQRCodeReader();
      const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        await this.mostrarAlerta('Error', 'No se encontraron dispositivos de cámara.');
        return;
      }

      const selectedDeviceId = videoInputDevices[0].deviceId;
      const videoElement = document.getElementById('video-preview') as HTMLVideoElement;

      if (this.scannerControls) {
        this.scannerControls.stop(); // Detiene el escaneo anterior si existe
      }

      this.scannerControls = await codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        videoElement,
        async (result, error, controls) => {
          if (result) {
            try {
              console.log('QR Detectado:', result.getText());
              this.qrData = JSON.parse(result.getText());

              // Validar los datos del QR
              await this.validarDatosQR(this.qrData);

              controls.stop();
              this.scannerControls = null;
            } catch (error) {
              console.error('Error al procesar el QR:', error);
              await this.mostrarAlerta('Error', 'El código QR escaneado no contiene datos válidos.');
            }
          }

          if (error) {
            console.warn('Error de escaneo:', error.message);
          }
        }
      );
    } catch (err) {
      console.error('Error al iniciar el escaneo:', err);
      await this.mostrarAlerta('Error', 'Hubo un problema al iniciar el escaneo.');
    }
  }

  async validarDatosQR(qrData: any) {
    // Verificar que los campos necesarios estén presentes
    if (
      !qrData.asignatura || // Cambiado de asignaturaId a asignatura
      !qrData.docente ||
      !qrData.fecha ||
      !qrData.estudianteRut ||
      !qrData.estudianteNombre
    ) {
      console.error('Datos del QR incompletos:', qrData);
      await this.mostrarAlerta('Error', 'El QR no contiene todos los datos necesarios.');
      return;
    }
  
    // Validar que el QR corresponde al docente logueado
    if (qrData.docenteId !== this.docenteId) {
      await this.mostrarAlerta('Error', 'El QR no corresponde a este docente.');
      return;
    }
  
    // Validar la fecha del QR con la fecha actual
    const hoy = new Date().toISOString().split('T')[0];
    if (qrData.fecha !== hoy) {
      await this.mostrarAlerta('Error', 'El QR no es válido para la fecha de hoy.');
      return;
    }
  
    // Verificar si el estudiante ya está registrado en esta asignatura y fecha
    this.http.get('asistencia').subscribe(async (asistencia: any[]) => {
      const registroExistente = asistencia.find(
        (a) =>
          a.fecha === qrData.fecha &&
          a.asignatura === qrData.asignatura && // Cambiado de asignaturaId a asignatura
          a.estudiantes.some((e: any) => e.rut === qrData.estudianteRut)
      );
  
      if (registroExistente) {
        await this.mostrarAlerta(
          'Error',
          `El estudiante ${qrData.estudianteNombre} ya está registrado en esta asignatura para hoy.`
        );
        return;
      }
  
      await this.registrarAsistencia(qrData);
    });
  }
  
  async registrarAsistencia(qrData: any) {
    const { fecha, asignatura, estudianteRut, estudianteNombre } = qrData; // Asignatura ajustada al campo esperado
  
    this.http.get('asistencia').subscribe(async (asistencia: any[]) => {
      const registro = asistencia.find((a) => a.fecha === fecha && a.asignatura === asignatura);
  
      if (registro) {
        registro.estudiantes.push({
          rut: estudianteRut,
          nombre: estudianteNombre,
          estado: 'presente',
        });
  
        this.http.put('asistencia', registro.id, registro).subscribe({
          next: () =>
            this.mostrarAlerta('Éxito', `Asistencia registrada correctamente para el estudiante: ${estudianteNombre}`),
          error: (err) => console.error('Error al registrar asistencia:', err),
        });
      } else {
        const nuevoRegistro = {
          fecha,
          asignatura,
          docenteId: this.docenteId,
          estudiantes: [
            {
              rut: estudianteRut,
              nombre: estudianteNombre,
              estado: 'presente',
            },
          ],
        };
  
        this.http.post('asistencia', nuevoRegistro).subscribe({
          next: () =>
            this.mostrarAlerta('Éxito', `Asistencia registrada correctamente para el estudiante: ${estudianteNombre}`),
          error: (err) => console.error('Error al registrar asistencia:', err),
        });
      }
    });
  }
  

  detenerEscaneo() {
    if (this.scannerControls) {
      this.scannerControls.stop();
      this.scannerControls = null;
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
