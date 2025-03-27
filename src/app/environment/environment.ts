import { HttpHeaders } from '@angular/common/http';
import { TheCatAPI } from '@thatapicompany/thecatapi';

export const serverURL: string = 'https://api.thecatapi.com';

export const key: string =
  'live_LwbQUqjMR6mYi8SOuoWpO2DPgxYSJCFiqji4vlHsIxS1pLidhDTYuCcSdoj6uPqj';

export const theCatAPI = new TheCatAPI(
  'live_LwbQUqjMR6mYi8SOuoWpO2DPgxYSJCFiqji4vlHsIxS1pLidhDTYuCcSdoj6uPqj'
);

export const httpHeader = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-api-key': key,
  }),
};
