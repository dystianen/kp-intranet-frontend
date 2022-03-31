import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormProductGalleryComponent } from './form-product-gallery/form-product-gallery.component';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {

  @Input() productId: number

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Show modal form product gallery
   */
  addModal() {
    const dialogRef = this.dialog.open(FormProductGalleryComponent, {
      autoFocus: false,
      data: {

      },
    })
  }

}
