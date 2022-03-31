import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormProductGalleryComponent } from './form-product-gallery/form-product-gallery.component';
import { ProductGalleryService } from './product-gallery.service';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {

  @Input() productId: number;

  galleries$ : Observable<[]>

  displayedColumns: string[] = ['image','name', 'option'];

  constructor(public dialog: MatDialog, private productGalleryService: ProductGalleryService) { }

  ngOnInit(): void {
    const _this = this;
    this.productGalleryService.getGalleries(this.productId).subscribe((data) => {
      
    });
    _this.galleries$ = this.productGalleryService.galleries$;
  }

  /**
   * Show modal form product gallery
   */
  addModal() {
    const dialogRef = this.dialog.open(FormProductGalleryComponent, {
      autoFocus: false,
      data: {
        productId: this.productId,
        formTitle: 'Add Gallery',
        formType: 'add'
      },
    })
  }

  editModal(data:any) {
    const dialogRef = this.dialog.open(FormProductGalleryComponent, {
      autoFocus: false,
      data: {
        data:data,
        productId: this.productId,
        formTitle: 'Add Gallery',
        formType: 'edit'
      },
    })
  }

}
