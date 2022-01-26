import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UserService } from 'app/core/user/user.service';
import { SiteService } from 'app/modules/admin/site/site.service';
import { Site } from 'app/modules/admin/site/site.types';
import { ToastService } from 'app/shared/toast/toast.service';
import { ProductCategory } from 'app/store/product/category/product-category.model';
import { ProductCategoryState } from 'app/store/product/category/product-category.state';
import { Observable } from 'rxjs';
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

  categories$: Observable<ProductCategory[]>

  constructor(private pricingService: PricingService, private productService: ProductService, private userService: UserService, private toastService: ToastService, private store: Store) { }

  ngOnInit(): void {
    const _this = this;

    this.categories$ = this.store.select(ProductCategoryState.getCategoryList);

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
        _this.toastService.message = "Pricing has updated";
        _this.toastService.open();
      })
    })
  }

}
