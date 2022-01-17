import { Component, OnInit } from '@angular/core';
import { SiteService } from 'app/modules/admin/site/site.service';
import { Site } from 'app/modules/admin/site/site.types';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  sites$: Site[] = [];

  displayedColumns: string[] = ['siteName', 'siteCode','price','option'];

  constructor(private siteService: SiteService) { }

  ngOnInit(): void {
    const _this = this;
    this.siteService.getSites().subscribe(function (sites: Site[]) {
      _this.sites$ = sites;
    })
  }

}
