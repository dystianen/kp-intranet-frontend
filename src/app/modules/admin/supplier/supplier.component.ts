import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierService } from './supplier.service';
import { Suppliers } from './suppliers.types';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

 

  ngOnInit(): void {
    
  }

}
