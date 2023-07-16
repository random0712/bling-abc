import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IItemData } from 'src/app/services/shared/shared.model';
import { CurveRank } from './abc-curve-list.model';


export interface IAbcCurveListRow {
  name: string;
  curveRank: string;
  buyPercent: string;
}

@Component({
  selector: 'app-abc-curve-list',
  templateUrl: './abc-curve-list.component.html',
  styleUrls: ['./abc-curve-list.component.scss']
})
export class AbcCurveListComponent implements OnInit, AfterViewInit {

  constructor() { }

  @Input() set analysisData(data: IItemData[]){
    this.generateAbcCurve(data);
  };

  @Input() totalProductsSales: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterValue: string;


  displayedColumns: string[] = ['name', 'buyPercent', 'curveRank'];
  dataSource: MatTableDataSource<IAbcCurveListRow>;

  ngOnInit(): void {
  }

  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  generateTableValues(analysisData: IItemData[], totalProductsSales: number): IAbcCurveListRow[] {
    let totalPercent = 0;
    const generateTableRow = (data: IItemData): IAbcCurveListRow => {
      const { quantity, product } = data;
      const buyPercent = quantity / totalProductsSales * 100;
      totalPercent += buyPercent;
      const curveRank = this.calculateCurveRank(totalPercent);

      return {
        buyPercent: buyPercent.toFixed(2),
        curveRank,
        name: product?.produto.descricao || 'Nome não localizado'
      }
    }

    return analysisData.map(generateTableRow);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private calculateCurveRank(totalPercent: number): CurveRank {
    if(totalPercent <= 60) {
      return 'A';
    }

    if(totalPercent <= 80) {
      return 'B'
    }

    return 'C';
  }


  private generateAbcCurve(analysisData: IItemData[] = []) {
    const rows = this.generateTableValues(analysisData, this.totalProductsSales);
    this.dataSource = new MatTableDataSource(rows);
  }
}
