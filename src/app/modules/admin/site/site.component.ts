import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  isLoading: boolean = false;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

   /**
   * Open add dialog form
   */
    addSiteDialog() {
      const dialogRef = this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Add New Sites or Store',
          formType:'add'
        },
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    }

}
