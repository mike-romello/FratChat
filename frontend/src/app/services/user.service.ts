import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public setUserSessionDetails(displayName: string, email: string, photoURL: string): void {
    sessionStorage.setItem("accountName", displayName);
    sessionStorage.setItem("accountEmail", email);
    sessionStorage.setItem("accountPhotoURL", photoURL);
  }


  public getUserNameSession(): string {
    const accountName = sessionStorage.getItem("accountName");
    return accountName !== null ? accountName : "User";
  }
  
}
