import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerJustificacionesPage } from './ver-justificaciones.page';

describe('VerJustificacionesPage', () => {
  let component: VerJustificacionesPage;
  let fixture: ComponentFixture<VerJustificacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerJustificacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
