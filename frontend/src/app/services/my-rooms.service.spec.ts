import { TestBed } from '@angular/core/testing';

import { MyRoomsService } from './my-rooms.service';

describe('MyRoomsService', () => {
  let service: MyRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
