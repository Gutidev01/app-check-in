import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificarInasistenciaPage } from './justificar-inasistencia.page';

describe('JustificarInasistenciaPage', () => {
  let component: JustificarInasistenciaPage;
  let fixture: ComponentFixture<JustificarInasistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificarInasistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
