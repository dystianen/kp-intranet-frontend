import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './settings.component';
import {RouterModule, Routes} from '@angular/router';
import {CrudModule} from '../../../../shared/crud/crud.module';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent
    }
];

@NgModule({
    declarations: [
        SettingsComponent,
    ],
    imports: [
        CommonModule,
        CrudModule,
        RouterModule.forChild(routes)
    ]
})
export class SettingsModule {
}
