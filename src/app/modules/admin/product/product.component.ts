import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isLoading = false

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
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
