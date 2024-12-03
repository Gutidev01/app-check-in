import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  usuarioAutenticado: any = null;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.verificarSesion();
  }

  verificarSesion() {
    const usuario = localStorage.getItem('usuarioAutenticado');
    if (usuario) {
      this.usuarioAutenticado = JSON.parse(usuario);
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      this.navCtrl.navigateRoot('/login');
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioAutenticado');
    this.isLoggedIn = false;
    this.usuarioAutenticado = null;
    this.navCtrl.navigateRoot('/login');
  }
}
