import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import { ListScheduleComponent } from './list-schedule/list-schedule.component';
import { ScheduleResolver } from './schedule.resolver';
import { CrudModule } from '../../../../shared/crud/crud.module';
import { ComponentsModule } from '../../../../components/components.module';
import { QuillModule } from 'ngx-quill';
import { FormScheduleComponent } from './form-schedule/form-schedule.component';
import { SoalCategoryResolver } from '../../sbmptn/soal-category/soal-category.resolver';
import { ModuleResolver } from '../../sbmptn/module/module.resolver';
import { MapelResolver } from '../../sbmptn/mapel/mapel.resolver';
import { MatDatepickerModule } from "@angular/material/datepicker";

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
                    category: SoalCategoryResolver,
                    modules: ModuleResolver,
                    subjects: MapelResolver
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
    ]
})
export class ScheduleModule {
}
