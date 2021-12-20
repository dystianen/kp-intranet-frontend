import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormComponent } from './form/form.component';
import { ProductService } from './product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isLoading = false
  showBackButton$ = false

  constructor(public dialog: MatDialog, private _productService: ProductService) {

  }

  ngOnInit(): void {
    let _this = this;
    this._productService.showBackButton$.subscribe(function (data) {
      _this.showBackButton$ = data;
    });
  }


  /**
  * Open add dialog form
  */
  addDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        formTitle: 'Add New Product',
        formType: 'add'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

}
