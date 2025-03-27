import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ICatImg } from '../../../model/catImg.interface';
import { MatTableModule } from '@angular/material/table';
import { IBreed } from '../../../model/breed.interface';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CatService } from '../../../service/cat.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SharedDialogUnroutedComponent } from '../shared.dialog.unrouted/shared.dialog.unrouted.component';

@Component({
  selector: 'app-shared-table-unrouted',
  templateUrl: './shared.table.unrouted.component.html',
  styleUrls: ['./shared.table.unrouted.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    TrimPipe,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatButton,
  ],
})
export class SharedTableUnroutedComponent implements OnInit, OnChanges {
  @Input() breeds: IBreed[] = [];
  @Output() messageEvent = new EventEmitter<number>();

  page: number = 0;
  selectedBreed: string | undefined;
  cats: ICatImg[] = [];
  isLoading: boolean = true;
  displayedColumns: string[] = [
    'id',
    'name',
    'temperament',
    'origin',
    'description',
  ];

  readonly dialog = inject(MatDialog);

  constructor(private catService: CatService) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;  
      }
    }, 7000); 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SharedDialogUnroutedComponent, {
      data: this.findBreed(this.selectedBreed!, this.breeds),
    });
   
  }

  findBreed(breedID: string, breeds: IBreed[]) : IBreed | undefined {
    return breeds.find(breed => breed.id === breedID);
  }

  sendMessage(num: number) {
    this.page += num;
    this.isLoading = true;
    this.breeds = [];
    this.messageEvent.emit(this.page);
  }

  ngOnChanges(changes: SimpleChanges): void {


   

    if (changes['breeds'] && changes['breeds'].currentValue.length > 0) {
      this.isLoading = false;
    }

 
  }

  get() {
    if (this.selectedBreed) {
      this.catService.getCatById(this.selectedBreed).subscribe({
        next: (data) => {
          this.cats = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
