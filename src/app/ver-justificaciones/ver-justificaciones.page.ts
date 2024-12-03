import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-ver-justificaciones',
  templateUrl: './ver-justificaciones.page.html',
  styleUrls: ['./ver-justificaciones.page.scss'],
})
export class VerJustificacionesPage implements OnInit {
  justificaciones: any[] = [];
  justificacionesFiltradas: any[] = [];
  asignaturasDelDocente: any[] = [];
  docente: any;
  asignaturaSeleccionada: number | null = null; // Para manejar el filtro

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.cargarDocenteAutenticado();
  }

  cargarDocenteAutenticado() {
    const docenteActivo = localStorage.getItem('usuarioAutenticado');
    if (docenteActivo) {
      this.docente = JSON.parse(docenteActivo);

      if (this.docente.rol !== 'docente') {
        console.error('El usuario autenticado no es un docente.');
        return;
      }

      this.cargarAsignaturasDelDocente();
    } else {
      console.error('No hay un usuario autenticado.');
    }
  }

  cargarAsignaturasDelDocente() {
    if (!this.docente || !this.docente.asignaturasImpartidas) {
      console.error('El docente no tiene asignaturas asignadas.');
      return;
    }

    const asignaturasDelDocente = this.docente.asignaturasImpartidas.map((id: any) =>
      typeof id === 'string' ? parseInt(id, 10) : id
    );

    this.httpService.get('asignaturas').subscribe({
      next: (asignaturas: any[]) => {
        this.asignaturasDelDocente = asignaturas.filter((a: any) =>
          asignaturasDelDocente.includes(
            typeof a.id === 'string' ? parseInt(a.id, 10) : a.id
          )
        );

        if (this.asignaturasDelDocente.length === 0) {
          console.log('El docente no tiene asignaturas asignadas.');
        } else {
          console.log('Asignaturas del docente:', this.asignaturasDelDocente);
          this.cargarJustificaciones();
        }
      },
      error: (err) => {
        console.error('Error al cargar asignaturas:', err);
      },
    });
  }

  cargarJustificaciones() {
    this.httpService.get('justificaciones').subscribe({
      next: (justificaciones: any[]) => {
        this.justificaciones = justificaciones.filter((j) =>
          this.asignaturasDelDocente.some((a) => a.id === j.asignaturaId)
        );

        if (this.justificaciones.length === 0) {
          console.log('No hay justificaciones asociadas a las asignaturas del docente.');
        } else {
          console.log('Justificaciones filtradas:', this.justificaciones);
        }

        this.filtrarJustificaciones(); // Inicializa el filtro
      },
      error: (err) => {
        console.error('Error al cargar justificaciones:', err);
      },
    });
  }

  filtrarJustificaciones() {
    if (this.asignaturaSeleccionada) {
      this.justificacionesFiltradas = this.justificaciones.filter(
        (j) => j.asignaturaId === this.asignaturaSeleccionada
      );
    } else {
      this.justificacionesFiltradas = [...this.justificaciones];
    }
  }

  getAsignaturaNombre(asignaturaId: number): string {
    const asignatura = this.asignaturasDelDocente.find((a) => a.id === asignaturaId);
    return asignatura ? asignatura.nombre : 'Asignatura desconocida';
  }
}
