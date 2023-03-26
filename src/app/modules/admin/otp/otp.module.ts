import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpComponent } from './otp.component';
import { RouterModule, Routes } from '@angular/router';
import { OtpResolver } from './otp.resolver';
import { CrudModule } from 'app/shared/crud/crud.module';
import {MatCheckboxModule} from '@angular/material/checkbox'; 

const routes: Routes = [
    {
        path: '',
        component: OtpComponent,
        resolve: {
            otp: OtpResolver,
        },
    },
];

@NgModule({
    declarations: [OtpComponent],
    imports: [CommonModule,CrudModule,RouterModule.forChild(routes) ,MatCheckboxModule],
})
export class OtpModule {}
