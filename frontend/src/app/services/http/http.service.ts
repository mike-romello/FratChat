import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { error } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl: string = "https://us-central1-fratchat-f8eda.cloudfunctions.net/api";

  constructor(private http: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${url}`).pipe(
      map((response) => response),
      catchError((error) => {
        throw error;
      })
    )
  }

  public post(url: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${url}`, data).pipe(
      map((response) => response),
      catchError((error) => {
        throw error;
      })
    )
  }

  public put(url: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${url}`, data).pipe(
      map((response) => response),
      catchError((error) => {
        throw error;
      })
    )
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${url}`).pipe(
      map((response) => response),
      catchError((error) => {
        throw error;
      })
    )
  }
}
