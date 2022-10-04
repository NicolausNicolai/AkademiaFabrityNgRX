import { Component, OnInit } from '@angular/core';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { Application } from 'src/app/models/application'
import { ApplicationStatus } from 'src/app/models/applicationStatus';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { loadApplications, loadApplicationsFailure } from 'src/app/store/application.actions';
import { selectApplications, selectApplicationsLoaded } from 'src/app/store/application.selectors';
@Component({
  selector: 'app-applications-repository',
  templateUrl: './applications-repository.component.html',
  styleUrls: ['./applications-repository.component.css']
})
export class ApplicationsRepositoryComponent implements OnInit {

  public newApplications$!: Observable<Array<Application>>;
  public submittedApplications$!: Observable<Array<Application>>;
  public aprovedApplications$!: Observable<Array<Application>>;
  public rejectedApplications$!: Observable<Array<Application>>;

  
  constructor(private api: ApplicationApiService,
    private store: Store<AppState>) { 
  }

  ngOnInit(): void {
    this.reload(false);
  }

  reload(force :boolean)
  {
    this.store.select(selectApplicationsLoaded).subscribe(ial => {
      if (!ial || force)
        this.store.dispatch(loadApplications());
    });

    const applications$ = this.store.select(selectApplications);
    
      this.newApplications$ = applications$
      .pipe(
        map(apps => apps.filter(app => app.applicationStatus == ApplicationStatus.New))
      );

      this.submittedApplications$ = applications$
      .pipe(
        map(apps => apps.filter(app => app.applicationStatus == ApplicationStatus.Submitted))
      );

      this.aprovedApplications$ = applications$
      .pipe(
        map(apps => apps.filter(app => app.applicationStatus == ApplicationStatus.Approved))
      );

      this.rejectedApplications$ = applications$
      .pipe(
        map(apps => apps.filter(app => app.applicationStatus == ApplicationStatus.Rejected))
      );
  }

  dataChanged()
  {
    this.reload(true);
  }
}
