import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionClasesPage } from './gestion-clases.page';

describe('GestionClasesPage', () => {
  let component: GestionClasesPage;
  let fixture: ComponentFixture<GestionClasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
