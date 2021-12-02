import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { Product } from '../product.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products$: Observable<Product[]>

  constructor(private _productServices: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.products$ = this._productServices.products$;
    console.log(this.products$);
  }
}
