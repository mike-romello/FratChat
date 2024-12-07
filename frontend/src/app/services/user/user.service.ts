import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service'; // Ensure the path is correct
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { apiEnum } from '../http/api-enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService, private router: Router) {}

  /**
   * Set user details in session storage
   */
  public setUserSessionDetails(displayName: string, email: string, photoURL: string): void {
    sessionStorage.setItem('accountName', displayName);
    sessionStorage.setItem('accountEmail', email);
    sessionStorage.setItem('accountPhotoURL', photoURL);
  }

  /**
   * Get logged-in user's data from the backend
   * @param email - User email
   * @returns Observable containing user data
   */
  public getLoginUser(email: string): Observable<any> {
    return this.http.get(`${apiEnum.ACCOUNTS}?email=${email}`).pipe(
      catchError((error) => {
        console.error('Error fetching user:', error);
        return throwError(() => error); // Propagate the error
      })
    );
  }

  /**
   * Post new login user data to the backend
   * @param data - User data (displayName, email, photoURL)
   * @returns Observable containing the server response
   */
  public postLoginUser(data: any): Observable<any> {
    return this.http.post(apiEnum.ACCOUNTS, data).pipe(
      catchError((error) => {
        console.error('Error creating user:', error);
        return throwError(() => error); // Propagate the error
      })
    );
  }

  /* 
  * Logout
  */
  public logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/account/login']);
  }
}
