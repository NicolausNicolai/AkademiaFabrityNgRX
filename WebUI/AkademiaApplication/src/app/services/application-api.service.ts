import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationApiService {

  constructor(private http: HttpClient) { }

  getApplications()
  {
    return this.http.get<Array<Application>>("https://localhost:58268/api/Application/get-applications")
  }
}
