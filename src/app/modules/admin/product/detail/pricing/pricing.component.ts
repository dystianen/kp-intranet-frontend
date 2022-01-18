import { Component, Input, OnInit } from '@angular/core';
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

  displayedColumns: string[] = ['siteName', 'siteCode', 'price', 'option'];

  constructor(private siteService: SiteService, private pricingService: PricingService, private productService: ProductService) { }

  ngOnInit(): void {
    const _this = this;
    this.siteService.getSites().subscribe(function (sites: Site[]) {
      _this.sites$ = sites;
    })

    this.productService.product$.subscribe(function (product: Product) {
      _this.pricingService.getPricings(product.id).subscribe(function (pricing: Pricing[]) {
        console.log('pricing', pricing);
      })
    })


  }

}
