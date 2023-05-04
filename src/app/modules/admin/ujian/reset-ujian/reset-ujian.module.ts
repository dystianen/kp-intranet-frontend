import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetUjianComponent } from './reset-ujian.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';

const routes: Routes = [
    {
        path: '',
        component: ResetUjianComponent,
    },
];

@NgModule({
    declarations: [ResetUjianComponent],
    imports: [CommonModule,CrudModule,RouterModule.forChild(routes)],
})
export class ResetUjianModule {}
