import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-soal-preview',
  templateUrl: './soal-preview.component.html',
  styleUrls: ['./soal-preview.component.scss']
})
export class SoalPreviewComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
      console.log(this.dialogRef);
  }

}
