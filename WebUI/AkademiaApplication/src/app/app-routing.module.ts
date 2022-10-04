import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { ApplicationListComponent } from './components/application-list/application-list.component';
import { ApplicationsRepositoryComponent } from './pages/applications-repository/applications-repository.component';
import { ResolverService } from './services/resolver.service';

// { path: ':name/:navprop/:id', component: DictionaryitemsListComponent }

const routes: Routes = [
  { path: 'app-form', component: ApplicationFormComponent, resolve: { application : ResolverService } },
  { path: 'app-form/:id', component: ApplicationFormComponent, resolve: { application : ResolverService } },
  { path: 'app-list', component: ApplicationListComponent, resolve: { application : ResolverService } },
  { path: 'app-repo', component: ApplicationsRepositoryComponent, resolve: { application : ResolverService } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
