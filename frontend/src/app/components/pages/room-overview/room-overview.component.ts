import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-room',
  templateUrl: './room-overview.component.html',
  styleUrls: ['./room-overview.component.css']
})
export class RoomOverviewComponent implements OnInit {
  public roomId: String = '';
  public cmsContent: any = {};

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.contentService.fetchMasterData().subscribe(() => {
      this.cmsContent = this.contentService.getCmsContent('pages/roomsOverview');
    });
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.roomId);
  }

  public enterChat(): void {
    this.router.navigate(['/rooms', this.roomId, 'chat']);
  }

  public enterFiles(): void {
    this.router.navigate(['/rooms', this.roomId, 'files']);
  }



}
