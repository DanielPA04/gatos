import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RandomCatImgRoutedComponent } from '../app/component/cats/random.cat.img.routed/random.cat.img.routed.component';
import { CatService } from '../app/service/cat.service';
import { of } from 'rxjs';
import { ICatImg } from '../app/model/catImg.interface';
import {
  mockResponseSinInfoASC,
  mockResponseSinInfoDESC,
  mockResponseSinInfoLimit15,
  mockResponseSinInfoRAND,
} from './mocks/mockCatSinInfo.mock';
import { mockResponseConInfoLimit1 } from './mocks/mockCatConInfo.mock';

function isSortedASC(mock: ICatImg[]): boolean {
  const sortedMock = [...mock].sort((a, b) => a.id.localeCompare(b.id));

  return JSON.stringify(mock) === JSON.stringify(sortedMock);
}

function isSortedDESC(mock: ICatImg[]): boolean {
  const sortedMock = [...mock].sort((a, b) => b.id.localeCompare(a.id));

  return JSON.stringify(mock) === JSON.stringify(sortedMock);
}

function isSortedRAND(mock: ICatImg[]): boolean {
  return !isSortedASC(mock) && !isSortedDESC(mock);
}

describe('Pruebas randomCat', () => {
  let fixture: ComponentFixture<RandomCatImgRoutedComponent>;
  let tableComponent: RandomCatImgRoutedComponent;
  let catServiceMock: jasmine.SpyObj<CatService>;
  let nPage = 0;

  beforeEach(() => {
    catServiceMock = jasmine.createSpyObj('CatService', ['getCatImg']);

    TestBed.configureTestingModule({
      imports: [RandomCatImgRoutedComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: CatService, useValue: catServiceMock },
      ],
    });

    fixture = TestBed.createComponent(RandomCatImgRoutedComponent);
    tableComponent = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Debería crear el componente', () => {
    expect(tableComponent).toBeTruthy();

    // TODO: Eliminar
    let ids: string[] = mockResponseSinInfoASC.map((item) => item.id);
    let a1 = [...ids].sort((a, b) => a.localeCompare(b)); // Copia del array antes de ordenar
    let b1 = [...ids].sort((a, b) => b.localeCompare(a)); // Copia del array antes de ordenar

    let ids2: string[] = mockResponseSinInfoDESC.map((item) => item.id);
    let a2 = [...ids2].sort((a, b) => a.localeCompare(b)); // Copia del array antes de ordenar
    let b2 = [...ids2].sort((a, b) => b.localeCompare(a)); // Copia
    
    console.log('hola');
  });

  it('Prueba existencia de Orden, TieneRaza, Limit', () => {
    expect(tableComponent.order).toBeDefined();
    expect(tableComponent.tieneRaza).toBeDefined();
    expect(tableComponent.limit).toBeDefined();
  });

  it('Deberia actualizar orden', () => {
    tableComponent.changeOrder('DESC');
    expect(tableComponent.order).toBe('DESC');
  });

  it('Deberia actualizar raza', () => {
    tableComponent.changeSiRazas(1);
    expect(tableComponent.tieneRaza).toBe(1);
  });

  it('Deberia actualizar limit', () => {
    catServiceMock.getCatImg.and.returnValue(of([] as ICatImg[]));
    tableComponent.getRandomCats(30);
    expect(tableComponent.limit).toBe(30);
  });

  it('Prueba llamada a getCatImg', () => {
    tableComponent.order = 'ASC';
    tableComponent.limit = 1;
    const mockResponse = mockResponseSinInfoASC;

    catServiceMock.getCatImg.and.returnValue(of(mockResponse));

    tableComponent.getCat();

    expect(catServiceMock.getCatImg).toHaveBeenCalledWith(nPage, tableComponent.limit, tableComponent.order, tableComponent.tieneRaza);
  });

  it('Prueba getCat con ASC, 0, 10', () => {
    let order = 'ASC';
    let tieneRaza = 0;
    let limit = 10;

    const mockResponse = mockResponseSinInfoASC;

    catServiceMock.getCatImg.and.returnValue(of(mockResponse));

    tableComponent.changeOrder(order);
    tableComponent.changeSiRazas(tieneRaza);
    tableComponent.getRandomCats(limit);

    expect(catServiceMock.getCatImg).toHaveBeenCalledWith(nPage, tableComponent.limit, tableComponent.order, tableComponent.tieneRaza);

    expect(tableComponent.cats).toEqual(mockResponse);

    expect(tableComponent.cats.length).toBe(10);
    expect(tableComponent.cats[0].id).toBe(mockResponse[0].id);
    expect(tableComponent.cats[0].breeds).toEqual([]);
    let a = isSortedASC(tableComponent.cats);
    let b = isSortedDESC(tableComponent.cats);
    expect(a).toBeTrue;
    expect(b).toBeFalse;
  });

  it('Prueba getCat con DESC, 0, 10', () => {
    let order = 'DESC';
    let tieneRaza = 0;
    let limit = 10;

    const mockResponse = mockResponseSinInfoDESC;

    catServiceMock.getCatImg.and.returnValue(of(mockResponse));

    tableComponent.changeOrder(order);
    tableComponent.changeSiRazas(tieneRaza);
    tableComponent.getRandomCats(limit);

    expect(catServiceMock.getCatImg).toHaveBeenCalledWith(nPage, tableComponent.limit, tableComponent.order, tableComponent.tieneRaza);

    expect(tableComponent.cats).toEqual(mockResponse);

    expect(tableComponent.cats.length).toBe(10);
    expect(tableComponent.cats[0].id).toBe('EEF-lQ_cw');
    expect(tableComponent.cats[0].breeds).toEqual([]);
    let a = isSortedDESC(tableComponent.cats);
    let b = isSortedASC(tableComponent.cats);
    expect(a).toBeTrue();
    expect(b).toBeFalse();
  });

  it('Prueba getCat con ASC, 0, 15', () => {
    let order = 'ASC';
    let tieneRaza = 0;
    let limit = 15;

    const mockResponse = mockResponseSinInfoLimit15;

    catServiceMock.getCatImg.and.returnValue(of(mockResponse));

    tableComponent.changeOrder(order);
    tableComponent.changeSiRazas(tieneRaza);
    tableComponent.getRandomCats(limit);

    expect(catServiceMock.getCatImg).toHaveBeenCalledWith(nPage, tableComponent.limit, tableComponent.order, tableComponent.tieneRaza);

    expect(tableComponent.cats).toEqual(mockResponse);

    expect(tableComponent.cats.length).toBe(15);
    expect(tableComponent.cats[0].id).toBe(mockResponse[0].id);
    expect(tableComponent.cats[0].breeds).toEqual([]);
  });

  it('Prueba getCat con ASC, 1, 1', () => {
    let order = 'ASC';
    let tieneRaza = 1;
    let limit = 1;

    const mockResponse = mockResponseConInfoLimit1;
    catServiceMock.getCatImg.and.returnValue(of(mockResponse));

    tableComponent.changeOrder(order);
    tableComponent.changeSiRazas(tieneRaza);
    tableComponent.getRandomCats(limit);

    expect(catServiceMock.getCatImg).toHaveBeenCalledWith(nPage, tableComponent.limit, tableComponent.order, tableComponent.tieneRaza);

    expect(tableComponent.cats).toEqual(mockResponse);

    expect(tableComponent.cats.length).toBe(1);
    expect(tableComponent.cats[0].id).toBe(mockResponse[0].id);
    expect(tableComponent.cats[0].breeds!.length).toBe(1);
    expect(tableComponent.cats[0].breeds![0].id).toEqual(mockResponse[0].breeds![0].id);
  });

  it('Prueba getCat con RAND, 0, 10', () => {
    let order = 'RAND';
    let tieneRaza = 0;
    let limit = 10;

    const mockResponse = mockResponseSinInfoRAND;

    catServiceMock.getCatImg.and.returnValue(of(mockResponse));

    tableComponent.changeOrder(order);
    tableComponent.changeSiRazas(tieneRaza);
    tableComponent.getRandomCats(limit);

    expect(catServiceMock.getCatImg).toHaveBeenCalledWith(nPage, tableComponent.limit, tableComponent.order, tableComponent.tieneRaza);

    expect(tableComponent.cats).toEqual(mockResponse);

    expect(tableComponent.cats.length).toBe(10);
    expect(tableComponent.cats[0].id).toBe(mockResponse[0].id);
    expect(tableComponent.cats[0].breeds).toEqual([]);
    expect(isSortedDESC(tableComponent.cats)).toBeFalse();
    expect(isSortedASC(tableComponent.cats)).toBeFalse();
    expect(isSortedRAND(tableComponent.cats)).toBeTrue();

    expect(tableComponent.cats[0]).not.toBe(mockResponseSinInfoASC[0]);
    expect(tableComponent.cats[0]).not.toBe(mockResponseSinInfoDESC[0]);


    console.log('a');
  });

  it('Debe ser válido cuando el límite es 100', () => {
    tableComponent.catForm.controls['limit'].setValue(100);
    expect(tableComponent.catForm.valid).toBeTruthy();
  });

  it('Debe ser válido cuando el límite es 1', () => {
    tableComponent.catForm.controls['limit'].setValue(1);
    expect(tableComponent.catForm.valid).toBeTruthy();
  });

  it('Debe ser inválido cuando el límite es 0', () => {
    tableComponent.catForm.controls['limit'].setValue(0);
    expect(tableComponent.catForm.valid).toBeFalse();
  });

  it('Debe ser inválido cuando el límite es 101', () => {
    tableComponent.catForm.controls['limit'].setValue(101);
    expect(tableComponent.catForm.valid).toBeFalse();
  });

  it('Debe ser inválido cuando el límite es null', () => {
    tableComponent.catForm.controls['limit'].setValue(null);
    expect(tableComponent.catForm.valid).toBeFalse();
  });

  it('Debe ser inválido cuando el límite es undefined', () => {
    tableComponent.catForm.controls['limit'].setValue(undefined);
    expect(tableComponent.catForm.valid).toBeFalse();
  });

  it('Debe ser inválido cuando el límite es un string', () => {
    tableComponent.catForm.controls['limit'].setValue('Hola Mundo!');
    expect(tableComponent.catForm.valid).toBeFalse();
  });
});
