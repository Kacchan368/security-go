import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comisaria',
  templateUrl: './comisaria.component.html',
  styleUrls: ['./comisaria.component.css']
})
export class ComisariaComponent {
  constructor(public route: ActivatedRoute) { };
}
