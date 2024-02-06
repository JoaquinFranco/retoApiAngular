import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

interface Dir {
  street: FormControl<string>;
  number: FormControl<number>;
  zip: FormControl<string>;
}

interface Formulario {
  name: string;
  lastName: string;
  bankDetails: {
    bankName: string;
    iban: string;
  };
  address: Direccion[];
}

interface Direccion {
  street: string;
  number: number;
  zip: string;
}

@Component({
  selector: 'app-form-anidado',
  templateUrl: './form-anidado.component.html',
  styleUrl: './form-anidado.component.css',
})
export class FormAnidadoComponent {
  infoFormulario: string = '';

  formShowed!: Formulario;

  constructor(private fb: NonNullableFormBuilder) {}

  formUser = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    bankDetail: this.fb.group({
      bankName: ['', [Validators.required]],
      iban: ['', [Validators.required]],
    }),
    address: this.fb.array<FormGroup<Dir>>([]),
  });

  get address() {
    return this.formUser.controls['address'] as FormArray<FormGroup<Dir>>;
  }

  addAddress() {
    const form = this.fb.group({
      street: ['', [Validators.required]],
      number: [0, [Validators.required]],
      zip: ['', [Validators.required]],
    });
    this.address.push(form);
  }

  deleteAddress(index: number) {
    this.address.removeAt(index);
  }

  submit() {
    this.formShowed = {
      name: this.formUser.value.name!,
      lastName: this.formUser.value.lastName!,
      bankDetails: this.getBankDetails(),
      address: [],
    };
    this.formUser.controls.address.controls.forEach(
      (control: FormGroup<Dir>) => {
        let dirObject = this.getDirObject(control);
        this.formShowed.address.push(dirObject);
      }
    );

    this.infoFormulario = JSON.stringify(this.formShowed);
  }

  private getDirObject(control: FormGroup<Dir>) {
    return {
      street: control.value.street!,
      number: control.value.number!,
      zip: control.value.zip!,
    };
  }

  private getBankDetails() {
    return {
      bankName: this.formUser.value.bankDetail?.bankName!,
      iban: this.formUser.value.bankDetail?.iban!,
    };
  }

  rellenar() {
    this.formUser.controls.address.clear();
    let obj = {
      name: 'Prueba',
      lastName: 'Prueba',
      bankDetail: {
        bankName: 'BankName',
        iban: 'ES000049000000000000',
      },
      address: [
        {
          street: 'calle',
          number: 0,
          zip: '41089',
        },
        {
          street: 'calle',
          number: 0,
          zip: '41089',
        },
        {
          street: 'calle',
          number: 0,
          zip: '41089',
        },
      ],
    };
    obj.address.forEach((element) => {
      this.addAddress();
    });
    this.formUser.patchValue(obj);
  }

  limpiar() {
    this.formUser.controls.address.clear();
    this.formUser.reset();
  }
}
