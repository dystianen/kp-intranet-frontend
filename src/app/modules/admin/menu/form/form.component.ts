import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { MenuService } from '../menu.service';
import { Menu } from '../menu.types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  formApp = new FormGroup({
    menuCode: new FormControl(),
    menuName: new FormControl(),
    description: new FormControl(),
    path: new FormControl(),
    icon: new FormControl(),
    parentId: new FormControl()
  })

  public formAttribute: any

  ID: number;

  menus$: Observable<Menu[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _service: MenuService, public _navigationService: NavigationService, public dialog: MatDialogRef<any>) { }

  ngOnInit(): void {
    const _this = this;

    this.formAttribute = this.data;
    // this._service.getMenus();
    this.menus$ = this._service.menus$;

    if (this.data.parentId) {
      _this.formApp.patchValue({ parentId: this.data.parentId });
    }


    if (this.data.formType == 'edit') {
      if (this._service.menus$) {
        this._service.menu$.subscribe(function (data: Menu) {
          _this.ID = data.id;
          _this.formApp.patchValue(data);
        })
      }
    }

  }


  submitForm(f: NgForm) {
    const _this = this;
    if (!f.valid) {
      return;
    }
    const form = f.value;

    if (this.data.formType == 'add') {
      this._service.createMenu(form).subscribe(function (data) {
        if (data) {
          _this.dialog.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Menu has created',
            icon: 'success'
          })
          _this._service.getMenus().subscribe();
        }
      });
    }

    if (this.data.formType == 'edit') {
      let id = _this.ID;
      this._service.updateMenu(id, form).subscribe(function (data) {
        if (data) {
          _this.dialog.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Menu has updated',
            icon: 'success'
          })
          _this._navigationService.getNavigation().subscribe();
          _this._service.getMenus().subscribe();
        }
      });
    }

  }

}
