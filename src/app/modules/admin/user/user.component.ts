import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isLoading = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  modalAddDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        formTitle: 'Add Admin',
        formType: 'add'
      },
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {
    })
  }

}
