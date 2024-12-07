import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const accountEmail = sessionStorage.getItem('accountEmail');
    if (!accountEmail) {
      // User is not authenticated, redirect to login
      this.router.navigate(['/account/login']);
      return false;
    }
    // User is authenticated
    return true;
  }
}
