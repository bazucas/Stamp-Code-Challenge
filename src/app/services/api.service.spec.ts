import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {StaticService} from './static.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ApiResponse} from '../models/apiResponse';

describe('ApiService', () => {

  let service: ApiService;
  let httpMock: HttpTestingController;
  let statics: StaticService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService, StaticService]
    });
    service = TestBed.get(ApiService);
    statics = TestBed.get(StaticService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create ApiService', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the data successfully', () => {
    service.getAllObjects('invoice').subscribe((data: any) => {
      expect(data).toBe('something');
    });
    const request = httpMock.expectOne(statics.endpoint + /invoice/);
    expect(request.request.method).toBe('GET');
  });

  it('should get a specific object from the server', () => {
    service.getObjectById('invoice', 1).subscribe((data: any) => {
      expect(data).toBe('something');
    });
    const request = httpMock.expectOne(statics.endpoint + /invoice/ + '1');
    expect(request.request.method).toBe('GET');
  });

  it('should post the correct data', () => {
    const dummyResponse: ApiResponse = {
      invoiceNumber: '123',
      issuedOn: '22/06/2018',
      items: [
        {
          vatRate: 1,
          unitPriceWithVat: 2,
          quantity: 3,
          description: 'desc',
          code: 'code'
        }
      ],
      discount: 10
    };

    service.setNewObject('invoice', null).subscribe((res: ApiResponse) => {
      expect(res).toEqual(dummyResponse);
      expect(res.issuedOn).toBe('22/06/2018');
      expect(res.invoiceNumber).toBe('123');
      expect(res.discount).toBe(10);
      expect(res.items.length).toBe(1);
    });

    const request = httpMock.expectOne(statics.endpoint + /invoice/);
    expect(request.request.method).toBe('POST');
    request.flush(dummyResponse);
  });

  it('should update a specific object from the server', () => {
    service.updateObject('invoice', 1, {}).subscribe((data: any) => {
      expect(data).toBe('something');
    });
    const request = httpMock.expectOne(statics.endpoint + /invoice/ + '1');
    expect(request.request.method).toBe('PUT');
  });

  it('should update a specific property from the server', () => {
    service.updateProperty('invoice', 1, {}).subscribe((data: any) => {
      expect(data).toBe('something');
    });
    const request = httpMock.expectOne(statics.endpoint + /invoice/ + '1');
    expect(request.request.method).toBe('PATCH');
  });

  it('should delete a specific object from the server', () => {
    service.deleteObject('invoice', 1).subscribe((data: any) => {
      expect(data).toBe('something');
    });
    const request = httpMock.expectOne(statics.endpoint + /invoice/ + '1');
    expect(request.request.method).toBe('DELETE');
  });
});
