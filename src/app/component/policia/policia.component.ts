import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-policia',
  templateUrl: './policia.component.html',
  styleUrls: ['./policia.component.css']
})
export class PoliciaComponent {
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {
  }
}
