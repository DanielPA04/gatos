import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-shared-navbar-unrouted',
  templateUrl: './shared.navbar.unrouted.component.html',
  styleUrls: ['./shared.navbar.unrouted.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    FormsModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    MatTooltipModule
  ],
  animations: [
    trigger('rotateElement', [
      state('rotateDir1', style({ transform: 'rotate(0deg)' })),
      state('rotateDir2', style({ transform: 'rotate(1turn)' })),
      transition('rotateDir1 <=> rotateDir2', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class SharedNavbarUnroutedComponent implements OnInit {
  rutaStr: string = '';
  opened: boolean | undefined;
  rotationState = 'rotateDir1';

  constructor(private oRouter: Router) {
    this.oRouter.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.rutaStr = event.url;
      }
    });
  }

  toggleRotation() {
    this.rotationState = this.rotationState === 'rotateDir1' ? 'rotateDir2' : 'rotateDir1';
  }

  ngOnInit() {}
}
