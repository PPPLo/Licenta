import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase} from '@angular/fire/database';

import { CollectionsService } from './collections.service';

describe('CollectionsService', () => {
  let service: CollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
