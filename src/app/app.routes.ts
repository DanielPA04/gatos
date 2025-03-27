import { Routes } from '@angular/router';
import { RandomCatImgRoutedComponent } from './component/cats/random.cat.img.routed/random.cat.img.routed.component';
import { BreedsCatRoutedComponent } from './component/cats/breeds.cat.routed/breeds.cat.routed.component';
import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';
import { PiRoutedComponent } from './component/pi/pi.routed/pi.routed.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SharedHomeRoutedComponent },
  { path: 'random', component: RandomCatImgRoutedComponent },
  { path: 'breeds', component: BreedsCatRoutedComponent },
  { path: 'pi', component: PiRoutedComponent },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
