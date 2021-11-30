import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormComponent } from '../form/form.component';
import { SiteService } from '../site.service';
import { Site } from './../site.types'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  sites$: Observable<Site[]>

  constructor(private _siteService: SiteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sites$ = this._siteService.sites$;
  }

  /**
 * open edit dialog form
 * @param id 
 */
  editSiteDialog(id: number) {
    const _this = this;
    const getSupplier = this._siteService.getSite(id);
    getSupplier.subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Edit Site',
          formType: 'edit'
        },
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    });
  }

}
