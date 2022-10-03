import { Component, OnInit } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { Application } from 'src/app/models/application'
import { ApplicationStatus } from 'src/app/models/applicationStatus';
@Component({
  selector: 'app-applications-repository',
  templateUrl: './applications-repository.component.html',
  styleUrls: ['./applications-repository.component.css']
})
export class ApplicationsRepositoryComponent implements OnInit {

  // newApplications$!: Observable<Array<Application>>
  // sobmittedApplications$!: Observable<Array<Application>>
  // acceptedApplications$!: Observable<Array<Application>>
  // rejectedApplications$!: Observable<Array<Application>>

  public newApplications$!: Observable<Array<Application>>;
  public submittedApplications$!: Observable<Array<Application>>;
  public aprovedApplications$!: Observable<Array<Application>>;
  public rejectedApplications$!: Observable<Array<Application>>;

  
  constructor(private api: ApplicationApiService) { 
  }

  ngOnInit(): void {
    this.reload();
  }

  reload()
  {
    const applications$ = this.api.getApplications()
      .pipe(
        shareReplay()
      );

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
    this.reload();
  }
}
