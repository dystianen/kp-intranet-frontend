import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormComponent } from './form/form.component';
import { ProductService } from './product.service';
import { Product } from './product.types';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isLoading = false
  showBackButton$ = false
  title$: string = "Products"

  constructor(public dialog: MatDialog, private _productService: ProductService) {
    
  }

  ngOnInit(): void {
    let _this = this;
  }


}
