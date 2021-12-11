import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {

  isLoading : boolean = false

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addDialog(){
    const dialog = this.dialog.open(FormComponent,{
      data:{
        formTitle:'Add new Courier',
        formType: 'add'
      },
      autoFocus: false
    });

    dialog.afterClosed().subscribe(result=>{
      
    })
  }

}
