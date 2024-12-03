import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private navCtrl: NavController,
    private alertController: AlertController // Inyección del controlador de alertas
  ) {
    this.formLogin = this.fb.group({
      rut: ['', [Validators.required]],
      contraseña: ['', [Validators.required]],
    });
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  iniciarSesion() {
    const { rut, contraseña } = this.formLogin.value;
  
    this.httpService.get('usuarios').subscribe({
      next: (usuarios) => {
        const usuario = usuarios.find(
          (u: any) => u.rut === rut && u.contraseña === contraseña
        );
  
        if (usuario) {
          localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
          this.navCtrl.navigateRoot('/inicio'); // Redirige al inicio
        } else {
          console.error('Credenciales incorrectas');
        }
      },
      error: () => {
        console.error('Error al conectar con el servidor.');
      },
    });
  }  
  
}
