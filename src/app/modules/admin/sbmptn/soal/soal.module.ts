import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoalComponent } from './soal.component';
import { ListSoalComponent } from './list-soal/list-soal.component';
import { FormSoalComponent } from './form-soal/form-soal.component';
import { RouterModule, Routes } from '@angular/router';
import { CrudModule } from 'app/shared/crud/crud.module';
import { ComponentsModule } from 'app/components/components.module';
import { SoalResolver } from './soal.resolver';
import { QuillModule } from 'ngx-quill';
import { FormJawabanComponent } from './form-jawaban/form-jawaban.component';
import { ListJawabanComponent } from './list-jawaban/list-jawaban.component';
import {MatListModule} from '@angular/material/list';
import { SoalCategoryResolver } from '../soal-category/soal-category.resolver';
import { ModuleResolver } from '../module/module.resolver';
import { MapelResolver } from '../mapel/mapel.resolver';
import { SoalPreviewComponent } from './soal-preview/soal-preview.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { TryoutModuleResolver } from '../tryout-module/tryout-module.resolver';
import { TryoutTypeResolver } from '../tryout-type/tryout-type.resolver';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MyEditorModule } from 'app/shared/my-editor/my-editor.module';
import { CheckSoalComponent } from './check-soal/check-soal.component';

const routes: Routes = [
  {
    path: '',
    component: SoalComponent,
    children: [
      {
        path: ':category_id',
        component: ListSoalComponent,
        resolve: {
          soals: SoalResolver,
          category: SoalCategoryResolver,
          modules: ModuleResolver,
          mapels: MapelResolver,
          tryoutType: TryoutTypeResolver
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    SoalComponent,
    ListSoalComponent,
    FormSoalComponent,
    FormJawabanComponent,
    ListJawabanComponent,
    SoalPreviewComponent,
    FormUploadComponent,
    CheckSoalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrudModule,
    ComponentsModule,
    QuillModule.forRoot(),
    MatListModule,
    CKEditorModule,
    MyEditorModule
  ]
})
export class SoalModule { }
