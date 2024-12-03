import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.page.html',
  styleUrls: ['./mis-solicitudes.page.scss'],
})
export class MisSolicitudesPage implements OnInit {
  justificaciones: any[] = [];
  asignaturas: any[] = [];
  estudianteId: string = '';

  constructor(private httpService: HttpService, private alertController: AlertController) {}

  ngOnInit() {
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if (usuarioAutenticado) {
      this.estudianteId = JSON.parse(usuarioAutenticado).id;
      this.cargarDatos();
    }
  }

  cargarDatos() {
    this.httpService.get('justificaciones').subscribe({
      next: (justificaciones: any[]) => {
        this.justificaciones = justificaciones.filter((j) => j.estudianteId === this.estudianteId);
      },
      error: (err) => console.error('Error al cargar justificaciones:', err),
    });

    this.httpService.get('asignaturas').subscribe({
      next: (asignaturas: any[]) => {
        this.asignaturas = asignaturas;
      },
      error: (err) => console.error('Error al cargar asignaturas:', err),
    });
  }

  getAsignaturaNombre(asignaturaId: number): string {
    const asignatura = this.asignaturas.find((a) => a.id === asignaturaId);
    return asignatura ? asignatura.nombre : 'Asignatura desconocida';
  }

  async editarJustificacion(justificacion: any) {
    const alert = await this.alertController.create({
      header: 'Editar Justificación',
      inputs: [
        { name: 'motivo', type: 'text', value: justificacion.motivo, placeholder: 'Motivo' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            justificacion.motivo = data.motivo;
            this.httpService.put('justificaciones', justificacion.id, justificacion).subscribe({
              next: () => console.log('Justificación actualizada'),
              error: (err) => console.error('Error al actualizar justificación:', err),
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async eliminarJustificacion(justificacionId: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Justificación',
      message: '¿Estás seguro de eliminar esta justificación?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.httpService.delete('justificaciones', justificacionId).subscribe({
              next: () => {
                this.justificaciones = this.justificaciones.filter((j) => j.id !== justificacionId);
                console.log('Justificación eliminada');
              },
              error: (err) => console.error('Error al eliminar justificación:', err),
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
