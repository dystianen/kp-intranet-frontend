import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-product-gallery',
  templateUrl: './form-product-gallery.component.html',
  styleUrls: ['./form-product-gallery.component.scss']
})
export class FormProductGalleryComponent implements OnInit {

  formApp : FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const formControl ={
      galleryName:'',
      galleryPath:''
    }
    this.formApp = this.formBuilder.group(formControl);
  }

  changeImageUpload(e: any) {
    console.log(e);
  }

}
