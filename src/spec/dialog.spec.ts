import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedDialogUnroutedComponent } from '../app/component/shared/shared.dialog.unrouted/shared.dialog.unrouted.component';
import { mockResponseBreedDialog } from './mocks/mockBreed.mock';

describe('Dialog', () => {
  let component: SharedDialogUnroutedComponent;
  let fixture: ComponentFixture<SharedDialogUnroutedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        SharedDialogUnroutedComponent,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockResponseBreedDialog },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDialogUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Deberia crear el componente', () => {
    const fixture = TestBed.createComponent(SharedDialogUnroutedComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Deberia inyectar los datos correctamente', () => {
    expect(component.data).toEqual(mockResponseBreedDialog);
  });

});
