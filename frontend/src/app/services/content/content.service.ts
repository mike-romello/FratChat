import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ContentService {
    private url = '/assets/master.json'
    private masterDataSubject = new BehaviorSubject<any>(null);
    public masterData$ = this.masterDataSubject.asObservable();
    
    constructor(private http: HttpClient) { }

    fetchMasterData(): Observable<any> {
        return this.http.get<any>(this.url).pipe(
          tap(data => this.masterDataSubject.next(data))
        );
      }
    
      // Get Current Value of Master
      getMasterData(): any {
        return this.masterDataSubject.getValue();
      }
    
      // Get Specific JSON as Object
      getCmsContent(path: string): any {
        const data = this.getMasterData();
        if (!data) return null;
        
        const pathArray = path.split('/');
        let result = data;
    
        for (const key of pathArray) {
          if (result[key] !== undefined) {
            result = result[key];
          } else {
            return null;
          }
        }
        return result;
      }

}