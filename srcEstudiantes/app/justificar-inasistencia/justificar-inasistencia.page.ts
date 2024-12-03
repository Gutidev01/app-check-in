import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-justificar-inasistencia',
  templateUrl: './justificar-inasistencia.page.html',
  styleUrls: ['./justificar-inasistencia.page.scss'],
})
export class JustificarInasistenciaPage implements OnInit {
  formJustificacion: FormGroup;
  asignaturas: any[] = [];
  docentes: any[] = [];
  docenteSeleccionado: string = '';
  archivoAdjunto: File | null = null;
  estudianteId: string = ''; // Ahora será dinámico

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private alertController: AlertController
  ) {
    this.formJustificacion = this.fb.group({
      fecha: ['', Validators.required],
      asignatura: ['', Validators.required],
      docente: [{ value: '', disabled: true }, Validators.required],
      motivo: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit() {
    this.cargarUsuarioAutenticado();
    this.cargarDatos();
  }

  cargarUsuarioAutenticado() {
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    if (usuarioAutenticado) {
      const usuario = JSON.parse(usuarioAutenticado);
      this.estudianteId = usuario.id; // Obtiene dinámicamente el ID del usuario
      console.log('ID del estudiante autenticado:', this.estudianteId);
    } else {
      console.error('No hay un usuario autenticado en el sistema.');
    }
  }

  cargarDatos() {
    if (!this.estudianteId) {
      console.error('ID del estudiante no disponible.');
      return;
    }
  
    this.httpService.get('usuarios').subscribe({
      next: (usuarios: any[]) => {
        // Encuentra al estudiante autenticado por su ID
        const estudiante = usuarios.find(
          (u: any) => u.id === this.estudianteId && u.rol === 'estudiante'
        );
  
        if (!estudiante) {
          console.error('Estudiante no encontrado.');
          return;
        }
  
        console.log('Estudiante autenticado:', estudiante);
  
        // Relaciona las asignaturas del estudiante con el JSON
        const asignaturasEstudiante = estudiante.asignaturas.map((id: any) =>
          typeof id === 'string' ? parseInt(id, 10) : id
        );
  
        this.httpService.get('asignaturas').subscribe({
          next: (asignaturas: any[]) => {
            // Filtra las asignaturas relacionadas con el estudiante
            this.asignaturas = asignaturas.filter((a: any) =>
              asignaturasEstudiante.includes(
                typeof a.id === 'string' ? parseInt(a.id, 10) : a.id
              )
            );
  
            console.log('Asignaturas relacionadas:', this.asignaturas);
          },
          error: (err) => {
            console.error('Error al cargar asignaturas:', err);
          },
        });
  
        // Carga los docentes
        this.httpService.get('usuarios').subscribe({
          next: (usuarios: any[]) => {
            // Filtra los usuarios con rol docente
            this.docentes = usuarios.filter((u: any) => u.rol === 'docente');
            console.log('Docentes disponibles:', this.docentes);
          },
          error: (err) => {
            console.error('Error al cargar docentes:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }
  

  actualizarDocente() {
    const asignaturaSeleccionada = this.formJustificacion.get('asignatura')?.value;

    // Encuentra la asignatura seleccionada
    const asignatura = this.asignaturas.find((a) => a.nombre === asignaturaSeleccionada);

    if (asignatura) {
      // Encuentra al docente asociado a la asignatura seleccionada
      const docente = this.docentes.find((d) => d.id === asignatura.docenteId);

      this.docenteSeleccionado = docente ? docente.nombreCompleto : 'Docente no asignado';
      this.formJustificacion.patchValue({ docente: this.docenteSeleccionado });
    } else {
      console.warn('No se encontró la asignatura seleccionada.');
      this.docenteSeleccionado = 'Docente no asignado';
      this.formJustificacion.patchValue({ docente: '' });
    }
  }

  cargarArchivo(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoAdjunto = file;
    }
  }

  async enviarJustificacion() {
    const { asignatura, fecha, motivo } = this.formJustificacion.value;

    console.log('Datos del formulario:', { asignatura, fecha, motivo });

    const asignaturaId = this.asignaturas.find((a) => a.nombre === asignatura)?.id;

    if (!asignaturaId) {
      console.error('Asignatura no encontrada.');
      return;
    }

    // Crea un objeto JSON plano
    const justificacion = {
      fecha,
      asignaturaId,
      estudianteId: this.estudianteId,
      motivo,
    };

    console.log('Justificación enviada:', justificacion);

    // Envía los datos como JSON
    this.httpService.post('justificaciones', justificacion).subscribe({
      next: async () => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Justificación enviada exitosamente.',
          buttons: ['OK'],
        });
        await alert.present();
        this.formJustificacion.reset();
      },
      error: async (err) => {
        console.error('Error al enviar justificación:', err);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al enviar la justificación.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
}
