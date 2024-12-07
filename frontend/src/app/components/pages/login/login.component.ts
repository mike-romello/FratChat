import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content/content.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public cmsContent: any = {};
  public user: User = {
    displayName: '',
    email: '',
    photoURL: ''
  };

  constructor(
    private contentService: ContentService,
    private router: Router,
    private auth: AngularFireAuth,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadCmsContent();
  }

  /**
   * Load CMS content for the login page.
   */
  private loadCmsContent(): void {
    this.contentService.fetchMasterData().subscribe(() => {
      this.cmsContent = this.contentService.getCmsContent('pages/loginPage') || {};
    });
  }

  /**
   * Trigger Google Sign-In.
   */
  public signInWithGoogle(): void {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        if (result.user) {
          this.extractUserInfo(result.user);
          this.userService.postLoginUser(this.user).subscribe({
            next: (response) => {
              console.log('User successfully created:', response);
              this.userService.setUserSessionDetails(
                this.user.displayName,
                this.user.email,
                this.user.photoURL
              );
            },
            error: (error) => {
              console.error('Error during user creation:', error);
            },
            complete: () => {
              console.log('Post login user operation completed.');
              this.routeToRoomsOverview();
            }
          });
        } else {
          console.error('No user information returned after sign-in.');
        }
      })
      .catch((error) => {
        console.error('Error during Google Sign-In:', error);
      });
  }

  /**
   * Extract user information after successful Google Sign-In.
   * @param firebaseUser - Firebase user object.
   */
  private extractUserInfo(firebaseUser: firebase.User): void {
    this.user = {
      displayName: firebaseUser.displayName || 'NOT FOUND',
      email: firebaseUser.email || 'NOT FOUND',
      photoURL: firebaseUser.photoURL || 'NOT FOUND'
    };
    console.log('Extracted User Info:', this.user);
  }

  /**
   * Navigate to the rooms overview page.
   */
  private routeToRoomsOverview(): void {
    this.router.navigate(['/my-rooms']);
  }
}
