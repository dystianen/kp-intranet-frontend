import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { RoleService } from '../role.service';
import { Role } from '../role.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  roles$: Observable<Role[]>

  constructor(private _service: RoleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.roles$ = this._service.roles$;
  }

  editDialog(id: number) {
    const _this = this;
    this._service.getRole(id).subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Edit Role',
          formType: 'edit'
        },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {

      })
    })
  }
}
