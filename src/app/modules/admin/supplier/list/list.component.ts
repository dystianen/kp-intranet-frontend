import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierService } from '../supplier.service';
import { Suppliers } from '../suppliers.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isLoading: boolean = false;

  suppliers$: Observable<Suppliers[]>

  constructor(private _supplierService: SupplierService) { }

  ngOnInit(): void {
    this.suppliers$ = this._supplierService.suppliers$;
  }

}
