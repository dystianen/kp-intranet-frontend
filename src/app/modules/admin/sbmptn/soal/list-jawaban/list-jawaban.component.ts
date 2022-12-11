import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormJawabanComponent } from '../form-jawaban/form-jawaban.component';
import { SoalService } from '../soal.service';

@Component({
  selector: 'list-jawaban',
  templateUrl: './list-jawaban.component.html',
  styleUrls: ['./list-jawaban.component.scss']
})
export class ListJawabanComponent implements OnInit {

  constructor(private dialog: MatDialog, private _soalService: SoalService) { }

  jawabans: any[] = [];
  jawabans$: Observable<any[]>;

  ngOnInit(): void {
    this._soalService.jawabans$.subscribe((res) => {
      this.jawabans = res;
    })
    this.jawabans$ = this._soalService.jawabans$;
  }

  /**
   * Show add modal
   */
  add() {
    this.dialog.open(FormJawabanComponent, {
      data: {
        title: 'Tambah Jawaban',
        type: 'add',
      },
      autoFocus: true
    })
  }

  setTrue(index) {
    this.jawabans.map((item)=>{
      if(item.key==index){
        item.is_true = true;
      }else{
        item.is_true = false;
      }
    })
    this._soalService._jawabans.next(this.jawabans);
  }

}
