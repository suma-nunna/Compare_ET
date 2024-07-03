import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ElectricityTariffsService,
  etData,
} from './electricity-tariffs.service';

describe('ElectricityTariffsService', () => {
  let service: ElectricityTariffsService;
  let httpMock: HttpTestingController;

  const mockData: etData[] = [
    {
      id: 1,
      name: 'Tariff A',
      price: 3.5,
      supplier: 'Company A',
      description: 'Description of Tariff A',
    },
    {
      id: 2,
      name: 'Tariff B',
      price: 4.0,
      supplier: 'Company B',
      description: 'Description of Tariff B',
    },
    {
      id: 3,
      name: 'Tariff C',
      price: 3.8,
      supplier: 'Company C',
      description: 'Description of Tariff C',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ElectricityTariffsService],
    });
    service = TestBed.inject(ElectricityTariffsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch electricity tariff data', () => {
    service.getElectricityTariffData().subscribe((data: any) => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/electricityTariffs.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should have an empty compare list', () => {
    service.currentCompareList.subscribe((list) => {
      expect(list.length).toBe(0);
    });
  });
});
