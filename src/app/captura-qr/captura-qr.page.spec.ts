import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturaQrPage } from './captura-qr.page';

describe('CapturaQrPage', () => {
  let component: CapturaQrPage;
  let fixture: ComponentFixture<CapturaQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
