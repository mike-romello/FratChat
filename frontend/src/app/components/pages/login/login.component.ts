import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content/content.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import Firebase Authentication
import firebase from 'firebase/compat/app'; // Import Firebase
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public cmsContent: any = {};
  public userDisplayName: string = '';
  public userEmail: string = '';
  public userPhotoURL: string = '';
  public userGoogleId: string = '';

  constructor(
    private contentService: ContentService,
    private router: Router,
    private auth: AngularFireAuth,
    private user: UserService
   ) {
    this.contentService.fetchMasterData().subscribe(() => {
      this.cmsContent = this.contentService.getCmsContent('pages/loginPage');
    });
  }

  public ngOnInit(): void {
  }

  public signInWithGoogle() {
    console.log("Signing into Google");

    // Add Google Sign-In Logic
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        if (result.user) {
          this.setUserInfo(result.user)
          this.routeToRoomsOverview();
        } else {
          console.error('No user information returned after sign-in.');
        }
      })
      .catch((error) => {
        console.error('Error during Google Sign-In:', error);
      });
  }

  public setUserInfo(user: any): void {
    this.userDisplayName = (user && user.multiFactor && user.multiFactor.user && user.multiFactor.user.displayName) 
      ? user.multiFactor.user.displayName : "NOT FOUND";
    this.userEmail = (user && user.multiFactor && user.multiFactor.user && user.multiFactor.user.email) 
      ? user.multiFactor.user.email : "NOT FOUND";
    this.userPhotoURL = (user && user.multiFactor && user.multiFactor.user && user.multiFactor.user.photoURL) 
      ? user.multiFactor.user.photoURL : "NOT FOUND";
    this.user.setUserSessionDetails(this.userDisplayName, this.userEmail, this.userPhotoURL);
  }
  public routeToRoomsOverview() {
    this.router.navigate(['/my-rooms']);
  }

}
