import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormSoalComponent } from '../form-soal/form-soal.component';

@Component({
  selector: 'app-check-soal',
  templateUrl: './check-soal.component.html',
  styleUrls: ['./check-soal.component.scss']
})
export class CheckSoalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,private dialog: MatDialog,private dialogRef: MatDialogRef<any>,) { }

  ngOnInit(): void {
  }

  edit(id) {
    this.dialogRef.close();
    this.dialog.open(FormSoalComponent, {
        id: 'formEditSoal',
        data: {
            title: 'Edit Soal',
            type: 'editSoal',
            id: id
        },
        autoFocus: true,
    });
}


}
