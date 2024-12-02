import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content/content.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import Firebase Authentication
import firebase from 'firebase/compat/app'; // Import Firebase

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public cmsContent: any = {};

  constructor(
    private contentService: ContentService,
    private router: Router,
    private auth: AngularFireAuth
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
          console.log('User signed in:', result.user);
          this.routeToRoomsOverview(); // Redirect after successful sign-in
        } else {
          console.error('No user information returned after sign-in.');
        }
      })
      .catch((error) => {
        console.error('Error during Google Sign-In:', error);
      });
  }

  public routeToRoomsOverview() {
    this.router.navigate(['/rooms']);

  }

}
