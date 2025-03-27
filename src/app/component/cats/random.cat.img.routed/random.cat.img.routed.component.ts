import { Component, OnInit } from '@angular/core';
import { CatService } from '../../../service/cat.service';
import { ICatImg } from '../../../model/catImg.interface';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { take } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-random.cat.img.routed',
  templateUrl: './random.cat.img.routed.component.html',
  standalone: true,
  styleUrls: ['./random.cat.img.routed.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
  ],
})
export class RandomCatImgRoutedComponent implements OnInit {
  cats: ICatImg[] = [];

  catForm: FormGroup = new FormGroup({});

  nPage: number = 0;
  limit: number = 5;
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
        Validators.pattern('^(100|[1-9][0-9]?)$'),
      ]),
    });
  }

  changeOrder(order: string) {
    this.order = order;
  }

  changeSiRazas(tieneRaza: number) {
    this.tieneRaza = tieneRaza;
  }

  getRandomCats(limit: number) {
    this.limit = limit;
    this.getCat();
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
