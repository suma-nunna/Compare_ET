import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CompareComponent } from './compare.component';
import {
  ElectricityTariffsService,
  etData,
} from '../../services/electricity-tariffs.service';
import {
  JsonPipe,
  KeyValuePipe,
  TitleCasePipe,
  CurrencyPipe,
} from '@angular/common';

describe('CompareComponent', () => {
  let component: CompareComponent;
  let fixture: ComponentFixture<CompareComponent>;
  let mockElectricityTariffsService: jasmine.SpyObj<ElectricityTariffsService>;

  const mockData: etData[] = [
    {
      id: 1,
      name: 'Tariff A',
      price: 3.5,
      supplier: 'Company A',
      description: 'Description of Tariff A',
      isAddToCompare: true,
    },
    {
      id: 2,
      name: 'Tariff B',
      price: 4.0,
      supplier: 'Company B',
      description: 'Description of Tariff B',
      isAddToCompare: true,
    },
    {
      id: 3,
      name: 'Tariff C',
      price: 3.8,
      supplier: 'Company C',
      description: 'Description of Tariff C',
      isAddToCompare: true,
    },
  ];

  beforeEach(async () => {
    mockElectricityTariffsService = jasmine.createSpyObj(
      'ElectricityTariffsService',
      ['updateCompareList'],
      { currentCompareList: of(mockData), unSortedData: mockData }
    );

    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ElectricityTariffsService,
          useValue: mockElectricityTariffsService,
        },
      ],
      imports: [
        JsonPipe,
        KeyValuePipe,
        TitleCasePipe,
        CurrencyPipe,
        CompareComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize compare tariff data', () => {
    expect(component.compareTariffData.length).toBeLessThan(4);
  });

  it('should remove tariff', () => {
    const removeData: etData = mockData[1];
    component.removeTraiff(removeData, 1);

    expect(component.compareTariffData.length).toBe(2);
    expect(component.compareTariffData).not.toContain(removeData);
  });
});
