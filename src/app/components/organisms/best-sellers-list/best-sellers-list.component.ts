import { Component, Input, OnInit } from '@angular/core';
import { IItemData } from 'src/app/services/shared/shared.model';

@Component({
  selector: 'app-best-sellers-list',
  templateUrl: './best-sellers-list.component.html',
  styleUrls: ['./best-sellers-list.component.scss']
})
export class BestSellersListComponent implements OnInit {

  constructor() { }

  @Input() analysisData: IItemData[] = [];
  @Input() totalProductsSales: number = 0;

  ngOnInit(): void {
  }

}
