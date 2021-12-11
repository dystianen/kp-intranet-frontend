import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  isLoading: boolean = false

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addDialog() {
    const dialog = this.dialog.open(FormComponent, {
      data: {
        formTitle: 'Add new Role',
        formType: 'add'
      },
      autoFocus: false
    });

    dialog.afterClosed().subscribe(result => {

    })
  }
}
