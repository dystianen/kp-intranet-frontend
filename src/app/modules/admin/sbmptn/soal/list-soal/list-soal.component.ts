import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SoalCategoryService } from '../../soal-category/soal-category.service';
import { FormSoalComponent } from '../form-soal/form-soal.component';
import { FormUploadComponent } from '../form-upload/form-upload.component';
import { SoalService } from '../soal.service';

@Component({
    selector: 'app-list-soal',
    templateUrl: './list-soal.component.html',
    styleUrls: ['./list-soal.component.scss'],
})
export class ListSoalComponent implements OnInit {
    @ViewChild(MatSort) sort: MatSort;

    modules: any[] = [];
    mapel: any = {};
    dataSource: MatTableDataSource<any>;
    dataSoals$: any[] = [];
    displayedColumns: string[] = [
        'no',
        'id',
        'level',
        'category',
        'type',
        'module',
        'mapel',
        'subtopic',
        'title',
        'options',
    ];
    categories: any[] = [];

    readMode: boolean = false;

    categoryIds: any[]=[];

    constructor(
        private dialog: MatDialog,
        private _soalService: SoalService,
        private _categoryService: SoalCategoryService
    ) {}

    ngOnInit(): void {
        this._categoryService.soal_categorys$.subscribe((item) => {
            this.categories = item;
            this.categoryIds = item.map((item)=>item.id);
        });

        this._soalService.soals$.subscribe((data: any) => {
            this.dataSoals$ = data;
            // this.modules = data;
            // this.mapel = data.mapel;
            this.dataSource = new MatTableDataSource(this.soals);
            this.dataSource.sort = this.sort;
        });
    }

    checkCategory(id) {
      return this.categoryIds.includes(id) ?? false;
  }

    /**
     * Show add modal
     */
    add() {
        this._soalService._jawabans.next([]);
        this.dialog.open(FormSoalComponent, {
            id: 'formSoal',
            data: {
                title: 'Buat Soal',
                type: 'addSoal',
                mapel: this.mapel,
            },
            autoFocus: true,
        });
    }

    /**
     * Show edit modal
     * @param id
     */
    edit(id) {
        this.dialog.open(FormSoalComponent, {
            id: 'formEditSoal',
            data: {
                title: 'Edit Soal',
                type: 'editSoal',
                id: id,
                mapel: this.mapel,
            },
            autoFocus: true,
        });
    }

    get soals() {
      if(this.categoryIds.length>=1){
        return this.dataSoals$.filter((item)=>this.categoryIds.includes(item.category_id)).map((item)=>{
            if(item.instruction){
                item.instruction.replaceAll('<p></p>','');
            }
            return item;
        });
      }
        return this.dataSoals$;
    }

    handleChangeCategory(e) {
      if (e.checked == true) {
          this.categoryIds.push(e.value);
      } else {
          const index = this.categoryIds.indexOf(e.value);
          this.categoryIds.splice(index, 1);
      }
      
      this.dataSource = new MatTableDataSource(this.soals);
      this.dataSource.sort = this.sort;
  }

    /**
     * Show upload modal
     */
    onModalUpload() {
        this._soalService._jawabans.next([]);
        this.dialog.open(FormUploadComponent, {
            id: 'formUpload',
            data: {
                title: 'Buat Soal dengan Template',
                type: 'upload',
                mapel: this.mapel,
            },
            autoFocus: true,
        });
    }
}
