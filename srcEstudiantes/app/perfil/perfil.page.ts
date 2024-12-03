import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  formPerfil: FormGroup;
  usuario: any;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    // Configuración del formulario
    this.formPerfil = this.fb.group({
      rut: [{ value: '', disabled: true }, [Validators.required]],
      nombreCompleto: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: [{ value: '', disabled: true }, [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.cargarUsuarioActivo();
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  cargarUsuarioActivo() {
    // Obtiene el usuario autenticado desde localStorage
    const usuarioActivo = localStorage.getItem('usuarioAutenticado');
    if (usuarioActivo) {
      const usuarioId = JSON.parse(usuarioActivo).id;

      // Petición al JSON Server para obtener los datos del usuario
      this.httpService.get(`usuarios/${usuarioId}`).subscribe({
        next: (data) => {
          this.usuario = data;
          this.formPerfil.patchValue(this.usuario); // Rellena el formulario
        },
        error: async () => {
          await this.mostrarAlerta('Error', 'No se pudo cargar la información del usuario.');
          this.navCtrl.navigateRoot('/login'); // Redirige al login si hay error
        },
      });
    } else {
      // Si no hay usuario autenticado, redirige al login
      this.navCtrl.navigateRoot('/login');
    }
  }

  seleccionarImagen() {
    this.fileInput.nativeElement.click(); // Abre el selector de archivos
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.usuario.imagenPerfil = reader.result as string; // Guarda la imagen como base64
      };
      reader.readAsDataURL(file);
    }
  }

  guardarCambios() {
    const usuarioActualizado = { ...this.usuario, ...this.formPerfil.value };

    this.httpService.put(`usuarios`, usuarioActualizado.id, usuarioActualizado).subscribe({
      next: async () => {
        await this.mostrarAlerta('Éxito', 'Los cambios se han guardado correctamente.');
      },
      error: async () => {
        await this.mostrarAlerta('Error', 'No se pudieron guardar los cambios.');
      },
    });
  }
}
