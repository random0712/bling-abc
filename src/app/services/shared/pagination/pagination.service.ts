import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  convertArrayInPages(data: any[], pageLength: number): any[][] {
    const pages = [];
    for(let i = 0; i < data.length; i += pageLength) {
      const pageEnd = i + pageLength;
      let limit = pageEnd;
      if(limit > data.length) {
        limit = data.length;
      }
      const newPage = data.slice(i, limit);
      pages.push(newPage);
    }

    return pages;
  }
}
