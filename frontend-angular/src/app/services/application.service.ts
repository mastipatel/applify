import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../../Application';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = "https://applify.onrender.com";

  constructor(private http: HttpClient) { }

  createApplication(application: Application): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/job-application/create`, application, httpOptions);
  }

  editApplication(application: Application): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/job-application/edit`, application, httpOptions);
  }

  deleteApplication(application_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/job-application/${application_id}`, httpOptions);
  }

  getByUserID(user_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/job-application?user_id=${user_id}`, httpOptions);
  }
}
