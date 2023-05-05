import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetUjianComponent } from './reset-ujian.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

const routes: Routes = [
    {
        path: '',
        component: ResetUjianComponent,
    },
];

@NgModule({
    declarations: [ResetUjianComponent],
    imports: [
        CommonModule,
        CrudModule,
        RouterModule.forChild(routes),
        MatDatepickerModule,
        NgxMatNativeDateModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
    ],
})
export class ResetUjianModule {}
