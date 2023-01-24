import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormSettingComponent } from '../form-setting/form-setting.component';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-list-setting',
  templateUrl: './list-setting.component.html',
  styleUrls: ['./list-setting.component.scss']
})
export class ListSettingComponent implements OnInit {

  settings: any[] = [];
  dataSource: MatTableDataSource<any>
  displayedColumns: string[] = ["key","value","value2","value3","value4","value5","description", "options"];

  constructor(private dialog: MatDialog, private _settingService: SettingService) { }

  ngOnInit(): void {

    this._settingService.setting$.subscribe((data) => {
      this.settings = data;
      this.dataSource = new MatTableDataSource(data);
    })

  }

  /**
   * Show add modal
   */
  add() {
    this.dialog.open(FormSettingComponent, {
      data: {
        title: 'Add Setting',
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
    this.dialog.open(FormSettingComponent, {
      data: {
        title: 'Edit Setting',
        type: 'edit',
        id: id
      },
      autoFocus: true
    })
  }
}
