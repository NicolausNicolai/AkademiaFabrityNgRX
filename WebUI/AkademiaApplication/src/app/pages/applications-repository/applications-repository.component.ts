import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  newApplications: Array<Application> = [];
  submittedApplications: Array<Application> = [];
  aprovedApplications: Array<Application> = [];
  rejectedApplications: Array<Application> = [];

  
  constructor(private api: ApplicationApiService) { }

  reload() {
    this.api.getApplications()
    .subscribe(r => {
      console.log(r);

      this.newApplications = r.filter(a => a.applicationStatus === ApplicationStatus.New);
      this.submittedApplications = r.filter(a => a.applicationStatus === ApplicationStatus.Submitted);
      this.aprovedApplications = r.filter(a => a.applicationStatus === ApplicationStatus.Approved);
      this.rejectedApplications = r.filter(a => a.applicationStatus === ApplicationStatus.Rejected);
    });
}

  ngOnInit(): void {
    this.reload();
  }

}
