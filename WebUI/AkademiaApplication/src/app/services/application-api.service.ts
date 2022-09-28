import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Application } from '../models/application';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationApiService {

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getApplications() : Observable<Array<Application>>
  {
    this.loadingService.startLoading();
    return this.http.get<Array<Application>>("https://localhost:56112/api/Application/get-applications")
      .pipe(tap(() => this.loadingService.stopLoading()));
  }

  getApplication(id: number) : Observable<Application>
  {
    this.loadingService.startLoading();
    return this.http.get<Application>(`https://localhost:56112/api/Application/get-application?id=${id}`)
      .pipe(tap(() => this.loadingService.stopLoading()));
  }

  saveApplication(application: Partial<Application>) : Observable<Application>
  {
    this.loadingService.startLoading();
    return this.http.post<Application>("https://localhost:56112/api/Application/save-application", application)
      .pipe(tap(() => this.loadingService.stopLoading()));
  }

  approveApplication(applicationId: number)
  {
    this.loadingService.startLoading();
    this.http.post(`https://localhost:56112/api/Application/approve-application?id=${applicationId}`,"")
      .pipe(tap(() => this.loadingService.stopLoading())).subscribe();
  }

  rejectApplication(applicationId: number)
  {
    this.loadingService.startLoading();
    this.http.post(`https://localhost:56112/api/Application/reject-application?id=${applicationId}`,"")
      .pipe(tap(() => this.loadingService.stopLoading())).subscribe();
  }
}
