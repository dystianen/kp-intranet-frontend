import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {

  isLoading = false

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  /**
  * Open add dialog form
  */
  addDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        formTitle: 'New Product Attribute',
        formType: 'add'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

}
