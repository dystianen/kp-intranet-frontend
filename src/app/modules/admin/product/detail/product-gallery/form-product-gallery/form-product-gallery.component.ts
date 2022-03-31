import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ProductGalleryService } from '../product-gallery.service';

@Component({
  selector: 'app-form-product-gallery',
  templateUrl: './form-product-gallery.component.html',
  styleUrls: ['./form-product-gallery.component.scss']
})
export class FormProductGalleryComponent implements OnInit {


  protected Id: number;
  formApp: FormGroup;
  uploadFile: File;
  imgPreview: string = ""

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>, private formBuilder: FormBuilder, private productGalleryService: ProductGalleryService) { }

  ngOnInit(): void {
    const formControl = {
      description: '',
      path: ''
    }
    this.formApp = this.formBuilder.group(formControl);

    if (this.data.formType == 'edit') {
      this.formApp.patchValue(this.data.data);
      if (this.data.data.path) {
        this.imgPreview = this.data.data.path;
      }
    }

  }

  changeImageUpload(uploadFile: File) {
    this.uploadFile = uploadFile;
  }

  submitForm(f: NgForm) {
    const _this = this;
    if (!f.valid) {
      return;
    }

    const form = f.value;
    const formData = new FormData();

    formData.append('description', form.description);

    if (this.uploadFile) {
      formData.append('path', this.uploadFile);
    }

    if (this.data.formType == 'add') {
      formData.append('productId', this.data.productId);
      this.productGalleryService.createGallery(formData).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Gallery has created',
            icon: 'success'
          })
          _this.productGalleryService.getGalleries(_this.data.productId).subscribe();
        }
      });
    }
    if (this.data.formType == 'edit') {
      this.productGalleryService.updateGallery(formData, this.data.data.id).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Product has updated',
            icon: 'success'
          })
          _this.productGalleryService.getGalleries(_this.data.productId).subscribe();
        }
      });
    }

  }

}
