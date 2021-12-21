import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'app/shared/toast/toast.service';
import { SiteService } from './site.service';
import { SiteService as SiteService2 } from './../../site/site.service'
import * as _ from 'lodash';
import { UserService } from '../user.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  public formAttribute: any;

  formApp: FormGroup
  sites$: any
  selectedUserId: number;
  userHasSite: []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _siteService: SiteService, private _siteService2: SiteService2, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>, private _toastService: ToastService, private _userService: UserService) { }

  ngOnInit(): void {


    const _this = this;
    this.formAttribute = this.data;

    this._siteService2.sites$.subscribe(function (data: []) {
      _this.sites$ = data;
    })
    const controls = this.sites$.map(c => new FormControl(false));

    if (this.data.selectedUserId) {
      this.selectedUserId = this.data.selectedUserId;
      this._siteService.getSiteByUser(this.data.selectedUserId).subscribe(function (userSite: any) {
        _this.userHasSite = userSite;
        _this.userHasSite.forEach(function (_userHasSite: any) {
          const indexSelected = _.findIndex(_this.sites$, function (o: any) {
            return o.id == _userHasSite.siteId
          })
          controls[indexSelected].setValue(true);
        })
      })
    }

    // controls[0].setValue(true);
    this.formApp = this.formBuilder.group({
      sites: new FormArray(controls)
    })

  }

  get sitesFormArray() {
    return this.formApp.controls.sites as FormArray;
  }

  changeSite(siteId: number, value: boolean) {
    const _this = this;
    this._siteService.updateSite(this.selectedUserId, siteId, value == true ? 'add' : 'delete').subscribe(function (data) {
      _this._userService.getUsers().subscribe();
      _this._toastService.message = "Success, Site has updated"
      _this._toastService.open();
    });
  }

  submitForm(f: NgForm) {
    const selectedOrderIds = this.formApp.value.sites
      .map((v, i) => (v ? this.sites$[i].id : null))
      .filter((v) => v !== null);
    console.log(selectedOrderIds);
  }

}
