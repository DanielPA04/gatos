import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pi.routed',
  templateUrl: './pi.routed.component.html',
  styleUrls: ['./pi.routed.component.css'],
  imports: [
    DecimalPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class PiRoutedComponent implements OnInit {
  pi: number = 0;
  strPipe: string = '1.10-10';

  piForm: FormGroup = new FormGroup({});

  constructor() {
    this.createForm();
  }

  ngOnInit() {
    this.getPi();
  }

  getPi() {
    this.pi = Math.PI;
  }

  createForm() {
    this.piForm = new FormGroup({
      num: new FormControl(10, [
        Validators.required,
        Validators.pattern('^([0-9]|1[0-5])$'),
      ]),
    });
  }

  changeDecimalNumber() {
    if (!this.piForm.valid) {
      console.log('error, numero negativo o superior a 15 introducido');
      return;
    }
    this.strPipe = '1.' + this.piForm.get('num')!.value + '-' + this.piForm.get('num')!.value;
  }
}
