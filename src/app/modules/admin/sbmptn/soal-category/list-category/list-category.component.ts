import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { SoalCategoryService } from '../soal-category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {

  soal_categorys: any[] = [];
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["id", "category","description","options"];

  constructor(private dialog: MatDialog, private _soal_categoryService: SoalCategoryService) { }

  ngOnInit(): void {

    this._soal_categoryService.soal_categorys$.subscribe((data) => {
      this.soal_categorys = data;
      this.dataSource = new MatTableDataSource(data);
    })

  }

  /**
   * Show add modal
   */
  add() {
    this.dialog.open(FormCategoryComponent, {
      data: {
        title: 'Add SoalCategory',
        type: 'add'
      },
      autoFocus: true
    })
  }

  /**
   * Show edit modal
   * @param id 
   */
  edit(id) {
    this.dialog.open(FormCategoryComponent, {
      data: {
        title: 'Edit SoalCategory',
        type: 'edit',
        id: id
      },
      autoFocus: true
    })
  }

}
