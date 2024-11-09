import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public cmsContent: any = {};

  constructor(
    private contentService: ContentService,
    private router: Router
  ) {
    this.contentService.fetchMasterData().subscribe(() => {
      this.cmsContent = this.contentService.getCmsContent('pages/loginPage');
    });
  }

  public ngOnInit(): void {
  }

  public signInWithGoogle() {
    // TODO
    console.log("Signing into Google");
    this.routeToRoomsOverview();

  }

  public routeToRoomsOverview() {
    this.router.navigate(['/rooms']);

  }

}
