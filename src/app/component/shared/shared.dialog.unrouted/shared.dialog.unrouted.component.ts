import { Component, inject, model, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { IBreed } from '../../../model/breed.interface';
import { MatDivider } from '@angular/material/divider';
@Component({
  selector: 'app-shared.dialog.unrouted',
  templateUrl: './shared.dialog.unrouted.component.html',
  styleUrls: ['./shared.dialog.unrouted.component.css'],
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDivider
  ],
})
export class SharedDialogUnroutedComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<SharedDialogUnroutedComponent>);
  readonly data = inject<IBreed>(MAT_DIALOG_DATA);

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
