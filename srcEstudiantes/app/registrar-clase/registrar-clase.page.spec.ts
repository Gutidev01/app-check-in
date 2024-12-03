import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarClasePage } from './registrar-clase.page';

describe('RegistrarClasePage', () => {
  let component: RegistrarClasePage;
  let fixture: ComponentFixture<RegistrarClasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
