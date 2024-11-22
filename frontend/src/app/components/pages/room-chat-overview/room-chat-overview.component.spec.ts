import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomChatOverviewComponent } from './room-chat-overview.component';

describe('RoomChatOverviewComponent', () => {
  let component: RoomChatOverviewComponent;
  let fixture: ComponentFixture<RoomChatOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomChatOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomChatOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
