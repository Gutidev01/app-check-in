import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AlertController, ModalController } from '@ionic/angular';
import { RegistrarClasePage } from '../registrar-clase/registrar-clase.page';


@Component({
  selector: 'app-mis-asignaturas',
  templateUrl: './mis-asignaturas.page.html',
  styleUrls: ['./mis-asignaturas.page.scss'],
})
export class MisAsignaturasPage implements OnInit {
  asignaturas: any[] = [];
  estudiante: any;

  constructor(
    private httpService: HttpService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.cargarEstudiante();
  }

  cargarEstudiante() {
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if (!usuarioAutenticado) {
      console.error('No hay un usuario autenticado.');
      return;
    }

    this.estudiante = JSON.parse(usuarioAutenticado);

    if (this.estudiante.rol !== 'estudiante') {
      console.error('El usuario autenticado no es un estudiante.');
      return;
    }

    this.cargarAsignaturas();
  }

  cargarAsignaturas() {
    this.httpService.get('asignaturas').subscribe({
      next: (asignaturas: any[]) => {
        // Filtra las asignaturas que cursa el estudiante autenticado
        this.asignaturas = asignaturas.filter((a: any) =>
          this.estudiante.asignaturas.includes(a.id)
        );
        console.log('Asignaturas del estudiante:', this.asignaturas);
      },
      error: async (err) => {
        console.error('Error al cargar asignaturas:', err);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudieron cargar las asignaturas.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  async registrarClase(asignatura: any) {
    const modal = await this.modalController.create({
      component: RegistrarClasePage,
      componentProps: { asignatura }, // Pasa la asignatura seleccionada al modal
    });
    await modal.present();
  }
}
