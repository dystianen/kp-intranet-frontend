import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { InputStockService } from '../input-stock.service';

@Component({
  selector: 'app-list-input-stock-history',
  templateUrl: './list-input-stock-history.component.html',
  styleUrls: ['./list-input-stock-history.component.scss']
})
export class ListInputStockHistoryComponent implements OnInit {

  product$: Observable<any>;

  constructor(private inputStockService: InputStockService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.product$=this.inputStockService.findProductBySku(this.route.snapshot.paramMap.get('sku'));
  }
}
