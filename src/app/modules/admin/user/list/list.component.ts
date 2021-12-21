import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { RoleComponent } from '../role/role.component';
import { SiteComponent } from '../site/site.component';
import { UserService } from '../user.service';
import { User } from '../user.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private _service: UserService, public dialog: MatDialog) { }

  users$: Observable<any[]>

  ngOnInit(): void {
    this.users$ = this._service.users$;
  }

  editDialog(id: number) {
    const _this = this;
    const getUser = this._service.getUser(id);
    getUser.subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Edit User',
          formType: 'edit'
        },
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    });
  }

  roleDialog(userId: number) {
    const _this = this;
    const dialogRef = _this.dialog.open(RoleComponent, {
      data: {
        formTitle: 'Role Setting',
        formType: 'role',
        selectedUserId: userId
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  siteDialog(userId: number) {
    const _this = this;
    const dialogRef = _this.dialog.open(SiteComponent, {
      data: {
        formTitle: 'Site Setting',
        formType: 'site',
        selectedUserId: userId
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

}
