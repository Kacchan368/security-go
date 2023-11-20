import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lugarhecho',
  templateUrl: './lugarhecho.component.html',
  styleUrls: ['./lugarhecho.component.css']
})
export class LugarhechoComponent {
  constructor(public route: ActivatedRoute) { };
}
