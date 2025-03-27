import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedNavbarUnroutedComponent } from './component/shared/shared.navbar.unrouted/shared.navbar.unrouted.component';
import { SharedFooterUnroutedComponent } from './component/shared/shared.footer.unrouted/shared.footer.unrouted.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedNavbarUnroutedComponent,SharedFooterUnroutedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gatos';
}
