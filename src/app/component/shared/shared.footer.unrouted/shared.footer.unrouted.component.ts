import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-shared-footer-unrouted',
  templateUrl: './shared.footer.unrouted.component.html',
  styleUrls: ['./shared.footer.unrouted.component.css'],
  standalone: true,
  imports: [MatTooltipModule],
})
export class SharedFooterUnroutedComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
