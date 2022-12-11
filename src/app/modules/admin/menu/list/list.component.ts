import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { MenuService } from '../menu.service';
import { Menu } from '../menu.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  menus$: Observable<Menu[]>

  constructor(private _service: MenuService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.menus$ = this._service.menus$;
  }

  editDialog(id: number) {
    const _this = this;
    this._service.getMenu(id).subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          ...data,
          formTitle: 'Edit Menu',
          formType: 'edit',
        },
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {

      })
    })
  }
}
