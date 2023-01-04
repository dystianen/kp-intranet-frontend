import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { ScheduleResolver } from './schedule.resolver';
import { QuillModule } from 'ngx-quill';
import { FormScheduleComponent } from './form-schedule/form-schedule.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { SoalCategoryResolver } from '../../soal-category/soal-category.resolver';
import { ModuleResolver } from '../../module/module.resolver';
import { MapelResolver } from '../../mapel/mapel.resolver';
import { CrudModule } from 'app/shared/crud/crud.module';
import { ComponentsModule } from 'app/components/components.module';
import { PackageResolver } from '../package/package.resolver';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

const routes: Routes = [
    {
        path: '',
        component: ScheduleComponent,
        children: [
            {
                path: '',
                component: ListScheduleComponent,
                resolve: {
                    schedules: ScheduleResolver,
                    packages: PackageResolver
                }
            }
        ]
    }
];

@NgModule({
    declarations: [
        ScheduleComponent,
        ListScheduleComponent,
        FormScheduleComponent
    ],
    imports: [
        CommonModule,
        CrudModule,
        ComponentsModule,
        QuillModule.forRoot(),
        RouterModule.forChild(routes),
        MatDatepickerModule,
        NgxMatNativeDateModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule
    ]
})
export class ScheduleModule {
}
