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
    return this.http.get<Array<Application>>("https://localhost:58268/api/Application/get-applications");
  }

  getApplication(id: number)
  {
    return this.http.get<Array<Application>>(`https://localhost:58268/api/Application/get-applications?id=${id}`);
  }

  saveApplication(application: Partial<Application>)
  {
    return this.http.post<Application>("https://localhost:58268/api/Application/add-new-application", application);
  }
}
