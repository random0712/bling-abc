import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { IOrderRange } from './header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() newRange: EventEmitter<IOrderRange> = new EventEmitter();

  range: FormGroup;

  constructor() { }

  ngOnInit(): void {
    const now = dayjs();
    const monthsBefore = now.subtract(1, 'month');

    this.range = new FormGroup({
      start: new FormControl(monthsBefore.toDate(), Validators.required),
      end: new FormControl(now.toDate(), Validators.required)
    });

    this.submitNewRange();
  }


  submitNewRange() {
    if(!this.range.valid) {
      return;
    }
    const { start, end } = this.range.value;
    const convertDateInString = (date: Date) => dayjs(date).format('DD/MM/YYYY');
    const newRange: IOrderRange = {
      start: convertDateInString(start),
      end: convertDateInString(end)
    }

    this.newRange.emit(newRange);
  }
  
}
