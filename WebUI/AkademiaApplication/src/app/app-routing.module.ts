import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';

// { path: ':name/:navprop/:id', component: DictionaryitemsListComponent }

const routes: Routes = [
  { path: 'app-form', component: ApplicationFormComponent },
  { path: 'app-form/:id', component: ApplicationFormComponent },
  { path: 'app-list', component: ApplicationListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
