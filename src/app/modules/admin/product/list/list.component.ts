import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { ProductService } from '../product.service';
import { Product } from '../product.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products$: Observable<Product[]>

  constructor(private _service: ProductService, public dialog: MatDialog) {
    this._service.setShowBackButton(false);
  }

  ngOnInit(): void {
    this.products$ = this._service.products$;
  }

  /**
 * open edit dialog form
 * @param id 
 */
  editDialog(id: number) {
    const _this = this;
    const getSupplier = this._service.getProduct(id);
    getSupplier.subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Edit Product',
          formType: 'edit'
        },
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    });
  }

}
