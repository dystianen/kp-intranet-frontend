import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { SupplierService } from '../supplier.service';
import { Suppliers } from '../suppliers.types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isLoading: boolean = false;

  suppliers$: Observable<Suppliers[]>


  constructor(private _supplierService: SupplierService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.suppliers$ = this._supplierService.suppliers$;
  }

  /**
  * open edit dialog form
  * @param id 
  */
  editSupplierDialog(id: number) {
    const _this = this;
    const getSupplier = this._supplierService.getSupplier(id);
    getSupplier.subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Edit Supplier',
          formType: 'edit'
        },
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    });
  }

  /**
   * delete data;
   * @param id 
   */
  deleteSupplierDialog(id: number) {
    const _this = this;

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        _this._supplierService.deleteSupplier(id).subscribe((data) => {
          _this._supplierService.getSuppliers().subscribe();
          if (data) {
            Swal.fire({
              title: 'Sucess',
              text: data.message,
              icon: 'success'
            })
          }
        })
      }
    })


  }

}
