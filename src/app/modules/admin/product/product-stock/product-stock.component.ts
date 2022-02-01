import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { ProductStockService } from './product-stock.service';

@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.scss']
})
export class ProductStockComponent implements OnInit {

  formApp = new FormGroup({
    additional_stock: new FormControl(''),
    note: new FormControl('')
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private productStockService: ProductStockService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }

  submitForm(f: NgForm) {
    const _this = this;
    if (this.data.formType == 'add_stock') {
      this.productStockService.addStock(this.data.productId, f.value).subscribe(function (res) {
        _this.productService.getProducts().subscribe();
        _this.dialogRef.close();
      })
    }
  }

}
