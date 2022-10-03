import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Application } from '../models/application';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationApiService {
  private baseAddress = "https://localhost:8003";

  constructor(private http: HttpClient, private loadingService: LoadingService) { }
  getApplications() : Observable<Array<Application>>
  {
    this.loadingService.startLoading();
    return this.http.get<Array<Application>>(`${this.baseAddress}/api/Application/get-applications`)
      .pipe(tap(() => this.loadingService.stopLoading()));
  }

  getApplication(id: number) : Observable<Application>
  {
    this.loadingService.startLoading();
    return this.http.get<Application>(`${this.baseAddress}/api/Application/get-application?id=${id}`)
      .pipe(tap(() => this.loadingService.stopLoading()));
  }

  saveApplication(application: Partial<Application>) : Observable<Application>
  {
    this.loadingService.startLoading();
    return this.http.post<Application>(`${this.baseAddress}/api/Application/save-application`, application)
      .pipe(tap(() => this.loadingService.stopLoading()));
  }

  approveApplication(applicationId: number)
  {
    this.loadingService.startLoading();
    this.http.post(`${this.baseAddress}/api/Application/approve-application?id=${applicationId}`,"")
      .pipe(tap(() => this.loadingService.stopLoading())).subscribe();
  }

  rejectApplication(applicationId: number)
  {
    this.loadingService.startLoading();
    this.http.post(`${this.baseAddress}/api/Application/reject-application?id=${applicationId}`,"")
      .pipe(tap(() => this.loadingService.stopLoading())).subscribe();
  }
}
