import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SharedTableUnroutedComponent } from '../../shared/shared.table.unrouted/shared.table.unrouted.component';
import { ICatImg } from '../../../model/catImg.interface';
import { CatService } from '../../../service/cat.service';
import { IBreed } from '../../../model/breed.interface';

@Component({
  selector: 'app-breeds.cat.routed',
  templateUrl: './breeds.cat.routed.component.html',
  styleUrls: ['./breeds.cat.routed.component.css'],
  imports: [SharedTableUnroutedComponent],
})
export class BreedsCatRoutedComponent implements OnInit {

  cats: ICatImg[] = [];
  breeds: IBreed[] = [];

  limit: number = 10;
  nPage: number = 0;
  order: string = 'RAND';
  tieneRaza: number = 1;

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.getCat();
  }
  
  receiveMessage(event: number) {
    this.nPage = event;
    this.getCat();
  }

  getCat() {
    this.catService
      .getCatImg(this.nPage, this.limit, this.order, this.tieneRaza)
      .subscribe({
        next: (data) => {
          this.cats = data;
          this.breeds = [];
          
          this.cats.forEach(cat => {
            const id = cat.breeds?.[0].id;
            if (!this.breeds.some(breed => breed.id === id)) {
              this.breeds.push(cat.breeds?.[0] as IBreed);
            }
          });
          
          this.breeds = [...this.breeds];  

        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
