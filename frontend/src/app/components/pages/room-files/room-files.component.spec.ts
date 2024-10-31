import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomFilesComponent } from './room-files.component';

describe('RoomFilesComponent', () => {
  let component: RoomFilesComponent;
  let fixture: ComponentFixture<RoomFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
