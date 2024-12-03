import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  formRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private navCtrl: NavController
  ) {
    this.formRegistro = this.fb.group({
      rut: ['', [Validators.required, this.validarRUT]],
      nombreCompleto: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContraseña: ['', [Validators.required]],
    });
  }

  validarRUT(control: any) {
    const rut = control.value;
    const regex = /^[0-9]+-[0-9Kk]$/; // Formato 12345678-9
    return regex.test(rut) ? null : { rutInvalido: true };
  }

  registrar() {
    if (this.formRegistro.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    if (this.formRegistro.value.contraseña !== this.formRegistro.value.confirmarContraseña) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const usuario = { ...this.formRegistro.value, rol: 'estudiante' };
    delete usuario.confirmarContraseña;

    this.httpService.post('usuarios', usuario).subscribe({
      next: () => {
        alert('Registro exitoso.');
        this.navCtrl.navigateRoot('/login');
      },
      error: (err) => {
        console.error(err);
        alert('Hubo un error al registrar el usuario.');
      },
    });
  }
}
