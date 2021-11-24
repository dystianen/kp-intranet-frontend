import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Suppliers } from '../suppliers.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isLoading: boolean = false;

  suppliers$: Observable<Suppliers[]>

  constructor() { }

  ngOnInit(): void {
  }

}
