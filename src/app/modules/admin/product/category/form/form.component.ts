import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CategoryService } from '../category.service';
import { Category } from '../category.types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  protected Id;
  public formAttribute: any;

  formApp = new FormGroup({
    category: new FormControl(''),
    description: new FormControl(''),
    thumbnail: new FormControl('')
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>, private _service: CategoryService) { }

  ngOnInit(): void {
    const _this = this;
    this.formAttribute = this.data;

    if (this.data.formType == 'edit') {
      if (this._service.categories$) {
        this._service.category$.subscribe(function (data: Category) {
          _this.Id = data.id;
          _this.formApp.patchValue(data);

          const thumbnailPreview = document.getElementById("thumbnailPreview") as HTMLImageElement;
          if (data.thumbnailPublic !== null) {
            try {

              thumbnailPreview.src = data.thumbnailPublic
            } catch (error) {

            }
          } else {
            thumbnailPreview.src = "https://via.placeholder.com/250x150"

          }

        })
      }
    }

  }

  onChangeThumbnail(e) {
    const thumbnailPreview = document.getElementById("thumbnailPreview") as HTMLImageElement;
    const file = e.target.files[0];
    if (file) {
      thumbnailPreview.src = URL.createObjectURL(file);
    }
  }

  /**
  * submit form
  * @param f 
  * @returns 
  */
  submitForm(f: NgForm) {
    const _this = this;
    if (!f.valid) {
      return;
    }
    const form = f.value;
    const formData = new FormData(<HTMLFormElement>document.getElementById('formApp'));

    if (this.data.formType == 'add') {
      this._service.createCategory(formData).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Sites has created',
            icon: 'success'
          })
          _this._service.getCategories().subscribe();
        }
      });
    }
    if (this.data.formType == 'edit') {
      let id = _this.Id;
      this._service.updateCategory(id, formData).subscribe(function (data) {
        if (data) {
          _this.dialogRef.close()
          Swal.fire({
            title: 'Sucess',
            text: 'Sites has updated',
            icon: 'success'
          })
          _this._service.getCategories().subscribe();
        }
      });
    }
  }

}
