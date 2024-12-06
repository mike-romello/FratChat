import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public setUserNameSession(accountName: string): void {
    sessionStorage.setItem("accountName", accountName);
  }

  public getUserNameSession(): string {
    const accountName = sessionStorage.getItem("accountName");
    return accountName !== null ? accountName : "User";
  }
  
}
