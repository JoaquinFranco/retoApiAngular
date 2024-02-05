import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-anidado',
  templateUrl: './form-anidado.component.html',
  styleUrl: './form-anidado.component.css',
})
export class FormAnidadoComponent {
  infoFormulario: string = '';

  formShowed!: {
    name?: string;
    lastName?: string;
    bankDetails: {
      bankName?: string;
      iban?: string;
    };
    address: [
      {
        street?: string;
        number?: string;
        zip?: string;
      }
    ];
  };

  constructor(private fb: NonNullableFormBuilder) {}

  formUser = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    bankDetail: this.fb.group({
      bankName: ['', [Validators.required]],
      iban: ['', [Validators.required]],
    }),
    address: this.fb.array([]),
  });

  get address() {
    return this.formUser.controls['address'] as FormArray;
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
      name: this.formUser.value.name,
      lastName: this.formUser.value.lastName,
      bankDetails: this.getBankDetails(),
      address: <any>[],
    };
    this.formUser.controls.address.controls.forEach((control: FormControl) => {
      let dirObject = this.getDirObject(control);
      this.formShowed.address.push(dirObject);
    });

    this.infoFormulario = JSON.stringify(this.formShowed);
  }

  private getDirObject(control: FormControl<any>) {
    return {
      street: control.value.street,
      number: control.value.number,
      zip: control.value.zip,
    };
  }

  private getBankDetails() {
    return {
      bankName: this.formUser.value.bankDetail?.bankName,
      iban: this.formUser.value.bankDetail?.iban,
    };
  }
}
