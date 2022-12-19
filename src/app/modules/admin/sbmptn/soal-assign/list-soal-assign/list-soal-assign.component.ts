import { Component, OnInit } from '@angular/core';
import { SoalService } from '../../soal/soal.service';

@Component({
  selector: 'app-list-soal-assign',
  templateUrl: './list-soal-assign.component.html',
  styleUrls: ['./list-soal-assign.component.scss']
})
export class ListSoalAssignComponent implements OnInit {

  soals: any[] = [];

  constructor(private _soalService: SoalService) { }

  ngOnInit(): void {
    this._soalService.soals$.subscribe((soals) => {
      this.soals = soals;
    })
  }

}
