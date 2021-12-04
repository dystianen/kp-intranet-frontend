import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoryService } from '../category.service';
import { Category } from '../category.types';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  categories$: Observable<Category[]>

  constructor(private _service: CategoryService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.categories$ = this._service.categories$;
  }

  /**
 * open edit dialog form
 * @param id 
 */
  editDialog(id: number) {
    const _this = this;
    const getSupplier = this._service.getCategory(id);
    getSupplier.subscribe(function (data) {
      const dialogRef = _this.dialog.open(FormComponent, {
        data: {
          formTitle: 'Edit Category',
          formType: 'edit'
        },
        autoFocus: false
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    });
  }

}
