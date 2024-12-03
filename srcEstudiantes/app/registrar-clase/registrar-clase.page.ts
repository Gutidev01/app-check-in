import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-clase',
  templateUrl: './registrar-clase.page.html',
  styleUrls: ['./registrar-clase.page.scss'],
})
export class RegistrarClasePage implements OnInit {
  formClase: FormGroup;
  codigoQR: string = '';
  usuarioAutenticado: any;
  docentes: any[] = [];
  asignaturas: any[] = [];
  asignaturasFiltradas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private alertController: AlertController
  ) {
    this.formClase = this.fb.group({
      docente: ['', Validators.required],
      asignatura: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarUsuarioAutenticado();
  }

  cargarUsuarioAutenticado() {
    const usuarioActivo = localStorage.getItem('usuarioAutenticado');
    if (usuarioActivo) {
      this.usuarioAutenticado = JSON.parse(usuarioActivo);

      this.cargarDocentes();
      this.cargarAsignaturas();
    } else {
      this.mostrarAlerta('Error', 'No se encontró un usuario autenticado.');
    }
  }

  cargarDocentes() {
    this.httpService.get('usuarios').subscribe({
      next: (usuarios: any[]) => {
        this.docentes = usuarios.filter((u) => u.rol === 'docente');
        console.log('Docentes disponibles:', this.docentes);
      },
      error: () => {
        this.mostrarAlerta('Error', 'No se pudieron cargar los docentes.');
      },
    });
  }

  cargarAsignaturas() {
    this.httpService.get('asignaturas').subscribe({
      next: (asignaturas: any[]) => {
        this.asignaturas = asignaturas;
        console.log('Asignaturas disponibles:', this.asignaturas);
      },
      error: () => {
        this.mostrarAlerta('Error', 'No se pudieron cargar las asignaturas.');
      },
    });
  }

  actualizarAsignaturas() {
    const docenteSeleccionado = this.formClase.get('docente')?.value;

    this.asignaturasFiltradas = this.asignaturas.filter(
      (a) => a.docenteId === docenteSeleccionado
    );
    console.log('Asignaturas filtradas:', this.asignaturasFiltradas);

    this.formClase.patchValue({ asignatura: '' }); // Resetea la selección de asignatura
  }

  generarCodigoQR() {
    const { docente, asignatura, fecha } = this.formClase.value;

    const docenteSeleccionado = this.docentes.find((d) => d.id === docente);
    const asignaturaSeleccionada = this.asignaturas.find(
      (a) => a.id === asignatura
    );

    if (!docenteSeleccionado || !asignaturaSeleccionada) {
      this.mostrarAlerta('Error', 'Debe seleccionar un docente y una asignatura válidos.');
      return;
    }

    const datosQR = {
      asignatura: asignaturaSeleccionada.nombre,
      fecha,
      docente: docenteSeleccionado.nombreCompleto,
      docenteId: docenteSeleccionado.id, // ID del docente seleccionado
      estudianteRut: this.usuarioAutenticado.rut.slice(0, 8), // 8 primeros caracteres del RUT
      estudianteCorreo: this.usuarioAutenticado.correo,
      estudianteNombre: this.usuarioAutenticado.nombreCompleto,
    };

    this.codigoQR = JSON.stringify(datosQR);
    console.log('Código QR generado:', this.codigoQR);
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
