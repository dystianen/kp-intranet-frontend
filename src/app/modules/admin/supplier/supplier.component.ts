import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierService } from './supplier.service';
import { Suppliers } from './suppliers.types';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  isLoading: boolean = false;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  /**
   * Open dialog form
   */
  addSupplierDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        formTitle: 'Add Supplier'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    })
  }


}
