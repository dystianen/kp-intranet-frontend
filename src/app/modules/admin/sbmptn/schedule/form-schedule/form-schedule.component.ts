import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModuleService } from '../../module/module.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-form-schedule',
  templateUrl: './form-schedule.component.html',
  styleUrls: ['./form-schedule.component.scss']
})
export class FormScheduleComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public dialogData: any, private dialogRef: MatDialogRef<any>, private _scheduleService: ScheduleService, private _moduleService: ModuleService) { }

  form: FormGroup;
  modules$: Observable<any[]>
  modules: any[] = [];
  mapels: any[] = [];
  days: any[]=[
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu"
  ];

  ngOnInit(): void {

    this.modules$ = this._moduleService.modules$;

    this._moduleService.modules$.subscribe((data) => {
      this.modules = data;
    })

    /**
     * Initial form
     */
    this.form = this.formBuilder.group({
      mapel_module_id: '',
      mapel_id: '',
      hari: '',
      time_start:'',
      time_end:''
    })

    /**
     * Fetch data by id from API
     */
    if (this.dialogData.type == 'edit') {
      this._scheduleService.getSchedule(this.dialogData.id).subscribe((res) => {
        this.form.patchValue(res);
      })
    }
  }

  onChangeModule(module_id) {
   
    const modules : any = this.modules.find((m) => m.id == module_id);
    if (modules) {
      this.mapels = modules?.mapel;
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
      this._scheduleService.createSchedule(f.value).subscribe((res) => {
        this.dialogRef.close();
      });
    }

    /**
     * Update data
     */
    if (this.dialogData.type == 'edit') {
      this._scheduleService.updateSchedule(this.dialogData.id, f.value).subscribe((res) => {
        this.dialogRef.close();
      });
    }
  }

}
