import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CourierService } from '../courier.service';
import { Courier } from '../courier.types';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  couriers$: Observable<Courier[]>

  constructor(private _service: CourierService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.couriers$ = this._service.couriers$;
  }

  editDialog(id: number) {
    const _this = this;
    this._service.getCourier(id).subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Edit Courier',
          formType: 'edit'
        },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {

      })
    })
  }

}
