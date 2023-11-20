import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pertenencia',
  templateUrl: './pertenencia.component.html',
  styleUrls: ['./pertenencia.component.css']
})
export class PertenenciaComponent {
  constructor(public route:ActivatedRoute){};
}
