import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {

  constructor(private router: Router) { }

  public ngOnInit(): void {
  }

  public navigateToOverview(): void {
    this.router.navigate(['my-rooms']);

  }




}
