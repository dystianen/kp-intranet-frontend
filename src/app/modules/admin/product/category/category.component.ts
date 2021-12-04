import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

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
        formTitle: 'New Product Category',
        formType:'add'
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

}
