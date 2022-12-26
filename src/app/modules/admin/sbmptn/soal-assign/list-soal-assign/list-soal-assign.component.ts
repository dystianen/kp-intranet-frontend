import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModuleService } from '../../module/module.service';
import { SoalCategoryService } from '../../soal-category/soal-category.service';
import { SoalService } from '../../soal/soal.service';
import { SoalAssignService } from '../soal-assign.service';

@Component({
  selector: 'app-list-soal-assign',
  templateUrl: './list-soal-assign.component.html',
  styleUrls: ['./list-soal-assign.component.scss']
})
export class ListSoalAssignComponent implements OnInit {

  soals: any[] = [];
  soalNotAssigns: any[] = [];
  form: FormGroup;
  modules$: Observable<any[]>;
  modules: any[] = [];
  categories$: Observable<any[]>;
  idSoalAssigned: number[] = [];
  mapels: any[] = [];

  constructor(private formBuilder: FormBuilder, private _soalService: SoalService, private _moduleService: ModuleService, private _categoryService: SoalCategoryService, private _soalAssignService: SoalAssignService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      mapel_id: '',
      module_id: '',
      category_id: 'latihan_soal',
    });

    this._soalAssignService.soalAssigns$.subscribe((res) => {
      this.idSoalAssigned = res.map((item) => item.soal_id)
    });

    this._soalService.soals$.subscribe((soals) => {
      this.soals = soals;
    })

    this.modules$ = this._moduleService.modules$;
    this._moduleService.modules$.subscribe((res) => {
      this.modules = res;
    })
    this.categories$ = this._categoryService.soal_categorys$;
  }

  get soals$() {
    return this.soals.filter((item) => {
      if (this.idSoalAssigned) {
        return !this.idSoalAssigned.includes(item.id) && item.category_id==='latihan_soal';
      }
      return true;
    })
  }

  get soalsAssigns$() {
    return this.soals.filter((item) => {
      if (this.idSoalAssigned) {
        return this.idSoalAssigned.includes(item.id);
      }
      return true;
    })
  }

  submitForm(f: NgForm) {

  }

  asssignSoal(soal_id) {
    let data = null;
    if (this.form.value.mapel_id) {
      data = { mapel_id: this.form.value.mapel_id };
    }
    this._soalAssignService.createSoalAssign(soal_id, data).subscribe((res) => {
    });
  }

  unAsssignSoal(id) {
    this._soalAssignService.deleteSoalAssign(id).subscribe((res) => {
    });
  }


  changeCategory(category_id) {

  }

  changeModule(module_id) {
    const module = this.modules.find((item) => item.id === module_id);
    if (module) {
      this.mapels = module.mapel;
    }
  }


}
