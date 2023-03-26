import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpLogComponent } from './otp-log.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';

const routes: Routes = [
    {
        path: '',
        component: OtpLogComponent,
    },
];

@NgModule({
    declarations: [OtpLogComponent],
    imports: [
      CommonModule,
      CrudModule,
      RouterModule.forChild(routes)
    ],
})
export class OtpLogModule {}
