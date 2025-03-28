import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { SharedTableUnroutedComponent } from '../app/component/shared/shared.table.unrouted/shared.table.unrouted.component';
import { provideHttpClient } from '@angular/common/http';
import { CatService } from '../app/service/cat.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { mockResponseTable } from './mocks/mockBreed.mock';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('Pruebas de Table Breeds', () => {
  let fixture: ComponentFixture<SharedTableUnroutedComponent>;
  let tableComponent: SharedTableUnroutedComponent;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTableUnroutedComponent, MatDialogModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), CatService],
    }).compileComponents();
    fixture = TestBed.createComponent(SharedTableUnroutedComponent);
    tableComponent = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
  });

  it('Deberia crear el componente', () => {
    const fixture = TestBed.createComponent(SharedTableUnroutedComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Prueba findBreed', () => {
    const breeds = mockResponseTable;
    const breedID = mockResponseTable[0].id;
    const breed = tableComponent.findBreed(breedID, breeds);

    expect(breed).not.toBeNull();
    expect(breed!.id).toEqual(breedID);
    expect(breed).toEqual(breeds[0]);
    expect(breed).not.toEqual(breeds[1]);
  });

  it('Debería abrir el diálogo correctamente', () => {
    spyOn(dialog, 'open').and.callThrough();

    tableComponent.openDialog();

    expect(dialog.open).toHaveBeenCalled();
  });

  it('Debería dar timeout', fakeAsync(() => {
    tableComponent.isLoading = true;
    tableComponent.ngOnInit();
    tick(7000);
    expect(tableComponent.isLoading).toBeFalse();
  }));
});
