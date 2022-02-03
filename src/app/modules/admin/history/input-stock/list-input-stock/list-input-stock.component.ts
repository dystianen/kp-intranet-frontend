import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InputStockService } from '../input-stock.service';

@Component({
  selector: 'app-list-input-stock',
  templateUrl: './list-input-stock.component.html',
  styleUrls: ['./list-input-stock.component.scss']
})
export class ListInputStockComponent implements OnInit {

  products$: Observable<any[]>;

  constructor(private inputStockService: InputStockService) { }

  ngOnInit(): void {
    this.products$ = this.inputStockService.input_stocks$;
  }

}
