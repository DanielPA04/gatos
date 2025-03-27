import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CatService } from '../app/service/cat.service';
import { provideHttpClient } from '@angular/common/http';

describe('CatService', () => {
  let catService: CatService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), CatService],
    });

    catService = TestBed.inject(CatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Obtener gato by id test', () => {
    const id = 'bsho';
    const urlID = '?breed_ids=' + id;
    const mockResponse = [
      {
        breeds: [{ id: 'bsho', name: 'British Shorthair' }],
      },
    ];

    catService.getCatById(id).subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0].breeds![0].id).toEqual(id);
    });

    const req = httpMock.expectOne(
      `https://api.thecatapi.com/v1/images/search${urlID}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('Obtener gato page 0, limit 1, de forma ASC test y sin info de raza', () => {
    const page = 0;
    const limit = 1;
    const order = 'ASC';
    const hasBreeds = 0;
    const mockResponse = [
        {
            "breeds": [],
            "categories": [
              {
                "id": 1,
                "name": "hats"
              }
            ],
            "id": "6",
            "url": "https://28.media.tumblr.com/tumblr_ks1a707b1b1qa9hjso1_1280.png",
            "width": 507,
            "height": 375
          }
    ];

    catService.getCatImg(page, limit, order, hasBreeds).subscribe((data) => {
        expect(data.length).toBe(1);
        expect(data).toEqual(mockResponse);
        expect(data[0].id).toEqual(mockResponse[0].id);
      });


    const req = httpMock.expectOne(
        `https://api.thecatapi.com/v1/images/search?page=${page}&limit=${limit}&order=${order}&has_breeds=${hasBreeds}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
  });
});
