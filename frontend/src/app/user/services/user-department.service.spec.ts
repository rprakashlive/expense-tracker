import { TestBed } from '@angular/core/testing';

import { UserDepartmentService } from './user-department.service';

describe('UserDepartmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDepartmentService = TestBed.get(UserDepartmentService);
    expect(service).toBeTruthy();
  });
});
