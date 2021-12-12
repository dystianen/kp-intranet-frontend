import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isLoading: boolean = false

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addDialog() {
    const dialog = this.dialog.open(FormComponent, {
      data: {
        formTitle: 'Add new Menu',
        formType: 'add'
      },
      autoFocus: false
    });

    dialog.afterClosed().subscribe(result => {

    })
  }

}
