import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AttributeService } from '../attribute.service';
import { Attribute } from '../attribute.types';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  attributes$: Observable<Attribute[]>

  constructor(private _service: AttributeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.attributes$ = this._service.attributes$;
  }

   /**
 * open edit dialog form
 * @param id 
 */
    editDialog(id: number) {
      const _this = this;
      const getSupplier = this._service.getAttribute(id);
      getSupplier.subscribe(function (data) {
        const dialogRef = _this.dialog.open(FormComponent, {
          data: {
            formTitle: 'Edit Attribute',
            formType: 'edit'
          },
          autoFocus: false
        });
        dialogRef.afterClosed().subscribe(result => {
        })
      });
    }

}
