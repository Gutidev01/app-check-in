import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-gestion-clases',
  templateUrl: './gestion-clases.page.html',
  styleUrls: ['./gestion-clases.page.scss'],
})
export class GestionClasesPage implements OnInit {
  asistencia: any[] = [];
  fechaHoy: string;

  constructor(private http: HttpService) {
    this.fechaHoy = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.cargarAsistencia();
  }

  cargarAsistencia() {
    this.http.get('asistencia').subscribe((data: any[]) => {
      this.asistencia = data.filter((a) => a.fecha === this.fechaHoy);
    });
  }
}
