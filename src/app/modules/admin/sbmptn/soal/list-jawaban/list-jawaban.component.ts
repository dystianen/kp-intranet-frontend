import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-jawaban',
  templateUrl: './list-jawaban.component.html',
  styleUrls: ['./list-jawaban.component.scss']
})
export class ListJawabanComponent implements OnInit {

  constructor() { }

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  ngOnInit(): void {
  }

}
