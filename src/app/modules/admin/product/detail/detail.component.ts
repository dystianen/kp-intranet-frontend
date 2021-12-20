import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  constructor(private _productService: ProductService) { 
    this._productService.setShowBackButton(true);
  }

  ngOnInit(): void {
    
  }

}
