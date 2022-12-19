import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SoalCategoryService } from '../soal-category.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<any>, private _soal_categoryService: SoalCategoryService) { }

  form: FormGroup;

  ngOnInit(): void {

    /**
     * Initial form
     */
    this.form = this.formBuilder.group({
      id: '',
      category: '',
      description: '',
      color: '',
    })

    /**
     * Fetch data by id from API
     */
    if (this.dialogData.type == 'edit') {
      this._soal_categoryService.getSoalCategory(this.dialogData.id).subscribe((res) => {
        this.form.patchValue(res);
      })
    }
  }

  /**Submit Form to API
   * @param f 
   */
  submitForm(f: NgForm) {

    /**
     * Add new Destination
     */
    if (this.dialogData.type == 'add') {
      this._soal_categoryService.createSoalCategory(f.value).subscribe((res) => {
        this.dialogRef.close();
      });
    }

    /**
     * Update data
     */
    if (this.dialogData.type == 'edit') {
      if (f.value.id) {
        delete f.value.id;
      }
      this._soal_categoryService.updateSoalCategory(this.dialogData.id, f.value).subscribe((res) => {
        this.dialogRef.close();
      });
    }
  }
}
