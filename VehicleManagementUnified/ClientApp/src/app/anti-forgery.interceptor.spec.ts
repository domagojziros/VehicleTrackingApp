import { TestBed } from '@angular/core/testing';

import { AntiForgeryInterceptor } from './anti-forgery.interceptor';

describe('AntiForgeryInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AntiForgeryInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AntiForgeryInterceptor = TestBed.inject(AntiForgeryInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
