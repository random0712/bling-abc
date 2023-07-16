import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoadingDialogComponent } from './components/molecules/loading-dialog/loading-dialog.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { WidgetGridComponent } from './components/widget-grid/widget-grid.component';
import { WidgetGridItemComponent } from './components/widget-grid/widget-grid-item/widget-grid-item.component';
import { ProductRowComponent } from './components/molecules/product-row/product-row.component';
import { BestSellersListComponent } from './components/organisms/best-sellers-list/best-sellers-list.component';
import { HighStockListComponent } from './components/organisms/high-stock-list/high-stock-list.component';
import { SpareListComponent } from './components/organisms/spare-list/spare-list.component';
import { AbcCurveListComponent } from './components/organisms/abc-curve-list/abc-curve-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { SalesByBrandComponent } from './components/organisms/sales-by-brand/sales-by-brand.component';
import { StockByBrandComponent } from './components/organisms/stock-by-brand/stock-by-brand.component';
import { SalesByPlatformComponent } from './components/organisms/sales-by-plataform/sales-by-plataform.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingDialogComponent,
    WidgetGridComponent,
    WidgetGridItemComponent,
    ProductRowComponent,
    BestSellersListComponent,
    HighStockListComponent,
    SpareListComponent,
    AbcCurveListComponent,
    SalesByBrandComponent,
    StockByBrandComponent,
    SalesByPlatformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule, 
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
