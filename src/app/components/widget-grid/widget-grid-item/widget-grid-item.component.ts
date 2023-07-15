import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-grid-item',
  templateUrl: './widget-grid-item.component.html',
  styleUrls: ['./widget-grid-item.component.scss']
})
export class WidgetGridItemComponent implements OnInit {

  @Input() headerText: string;
  @Input() headerColor: string = '#3f88c5';

  constructor() { }

  ngOnInit(): void {
  }

}
