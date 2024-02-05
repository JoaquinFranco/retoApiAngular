import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnidadoComponent } from './form-anidado.component';

describe('FormAnidadoComponent', () => {
  let component: FormAnidadoComponent;
  let fixture: ComponentFixture<FormAnidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAnidadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAnidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
