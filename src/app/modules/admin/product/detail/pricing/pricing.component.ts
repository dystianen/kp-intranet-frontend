import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'app/core/user/user.service';
import { SiteService } from 'app/modules/admin/site/site.service';
import { Site } from 'app/modules/admin/site/site.types';
import { ProductService } from '../../product.service';
import { Product } from '../../product.types';
import { Pricing } from './pricing';
import { PricingService } from './pricing.service';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  @Input() sku: string;

  sites$: Site[] = [];

  pricing: any = [];

  displayedColumns: string[] = ['siteName', 'siteCode', 'price', 'option'];

  product: any = {}

  constructor(private pricingService: PricingService, private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    const _this = this;

    this.userService.sites$.subscribe(function (sites: any) {
      _this.sites$ = sites;
    })


    this.productService.product$.subscribe(function (product: Product) {
      _this.product = product;
      _this.pricingService.getPricings(product.id).subscribe(function (pricing: Pricing[]) {
        const price = [];
        pricing.forEach(function (item) {
          price[item.siteId] = item.sellPrice;
        });
        _this.pricing = price;
      })
    })


  }


  addPricing(siteId: number, price: number) {
    const _this = this;
    this.pricingService.addPrice(this.product.id, siteId, price).subscribe(function (res) {
      _this.pricingService.getPricings(_this.product.id).subscribe(function (pricing: Pricing[]) {
      })
    })
  }

}
