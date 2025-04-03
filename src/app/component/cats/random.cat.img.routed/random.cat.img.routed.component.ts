import { Component, OnInit } from '@angular/core';
import { CatService } from '../../../service/cat.service';
import { ICatImg } from '../../../model/catImg.interface';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { take } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//PRIMENG
import { SelectButton } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { Fluid } from 'primeng/fluid';
import { ProgressSpinner } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-random.cat.img.routed',
  templateUrl: './random.cat.img.routed.component.html',
  standalone: true,
  styleUrls: ['./random.cat.img.routed.component.css'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    //PrimeNG
    SelectButton,
    ButtonModule,
    InputNumber,
    Fluid,
    ProgressSpinner,
    CardModule,
    Message
  ],
})
export class RandomCatImgRoutedComponent implements OnInit {
  //PrimeNG
  stateOptions: any[] = [
    { label: 'ASC', value: 'ASC' },
    { label: 'DESC', value: 'DESC' },
    { label: 'RAND', value: 'RAND' },
  ];

  value: string = 'off';
  //
  cats: ICatImg[] = [];

  catForm: FormGroup = new FormGroup({});

  nPage: number = 0;
  limit: number = 10;
  order: string = 'RAND';
  tieneRaza: number = 0;

  isLoading: boolean = false;

  constructor(private catService: CatService) {
    this.createForm();
  }

  ngOnInit() {
    this.catForm.markAllAsTouched();
  }

  createForm() {
    this.catForm = new FormGroup({
      limit: new FormControl(10, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
        Validators.pattern('^[0-9]+$'),
      ]),
    });
  }

  changeSiRazas(tieneRaza: number) {
    this.tieneRaza = tieneRaza;
  }

  getCat() {
    this.cats = [];
    this.isLoading = true;
    this.catService
      .getCatImg(this.nPage, this.limit, this.order, this.tieneRaza)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.cats = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
  }

  onSubmit() {
    if (this.catForm.valid) {
      this.limit = this.catForm.get('limit')!.value;
      this.getCat();
    } else {
      console.log('fomulario invalido');
    }
  }
}
