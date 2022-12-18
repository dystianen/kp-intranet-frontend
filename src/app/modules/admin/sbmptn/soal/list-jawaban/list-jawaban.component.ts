import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { omit, pick } from 'lodash';
import { Observable, of } from 'rxjs';
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
  jawabansDeleted: any[] = [];

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
      id: 'formJawaban',
      data: {
        title: 'Tambah Jawaban',
        type: 'add',
      },
      autoFocus: true
    })
  }

  setTrue(index) {
    this.jawabans.map((item) => {
      if (item.key == index) {
        item.is_true = true;
      } else {
        item.is_true = false;
      }
    })
    this._soalService._jawabans.next(this.jawabans);
  }

  editJawaban(index) {
    const jawaban = pick(this.jawabans[index],['key','content']);
    this.dialog.open(FormJawabanComponent, {
      id: 'formJawaban',
      data: {
        title: 'Edit Jawaban',
        type: 'edit',
        data: jawaban
      },
      autoFocus: true
    })
  }

  deleteJawaban(index) {
    this.jawabansDeleted.push(this.jawabans[index]);
    this._soalService.jawabansDeleted$.next(this.jawabansDeleted)
    this.jawabans.splice(index, 1);
    this._soalService._jawabans.next(this.jawabans);
  }

}
