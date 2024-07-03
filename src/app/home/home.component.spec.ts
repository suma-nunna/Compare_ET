import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import {
  ElectricityTariffsService,
  etData,
} from '../../services/electricity-tariffs.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockElectricityTariffsService: jasmine.SpyObj<ElectricityTariffsService>;

  const mockData: etData[] = [
    {
      id: 1,
      name: 'Tariff A',
      price: 3.5,
      supplier: 'Company A',
      description: 'Description of Tariff A',
      isAddToCompare: false,
    },
    {
      id: 2,
      name: 'Tariff B',
      price: 4.0,
      supplier: 'Company B',
      description: 'Description of Tariff B',
      isAddToCompare: false,
    },
    {
      id: 3,
      name: 'Tariff C',
      price: 3.8,
      supplier: 'Company C',
      description: 'Description of Tariff C',
      isAddToCompare: false,
    },
  ];

  beforeEach(async () => {
    mockElectricityTariffsService = jasmine.createSpyObj(
      'ElectricityTariffsService',
      ['getElectricityTariffData', 'updateCompareList'],
      { unSortedData: mockData }
    );

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, HomeComponent],
      providers: [
        {
          provide: ElectricityTariffsService,
          useValue: mockElectricityTariffsService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the search form', () => {
    expect(component.serachForm.controls['searchText'].value).toBe('');
  });

  it('should fetch data on init', fakeAsync(() => {
    const testData = { tariff: mockData };
    mockElectricityTariffsService.getElectricityTariffData.and.returnValue(
      of(testData)
    );
    component.ngOnInit();
    tick();

    fixture.detectChanges();

    expect(component.electricityTariff).toEqual(mockData);
  }));

  // test case for search query and checking lenght of search result
  it('should update electricityTariff on form submit', () => {
    component.serachForm.controls['searchText'].setValue('4');
    component.onSubmit();

    expect(component.electricityTariff.length).toBe(1);
  });

  it('should clear search text', () => {
    component.serachForm.controls['searchText'].setValue('4');
    component.clearText();

    expect(component.serachForm.controls['searchText'].value).toBe('');
    expect(component.electricityTariff.length).toBe(3);
  });

  it('should sort the table by column', () => {
    // check ascending order
    component.sortTable('price');
    expect(component.isCurrentColumn).toBe('price');
    expect(component.isAscendingDescending).toBe('Asc');
    expect(component.electricityTariff[2].price).toBe(4.0);
    // check descending order
    component.sortTable('price');
    expect(component.isAscendingDescending).toBe('Decs');
    expect(component.electricityTariff[0].price).toBe(4.0);
  });

  it('should add and remove items from compare list', () => {
    component.addToCompareList(mockData[0], 0);
    expect(component.compareTariffList.length).toBe(1);
    expect(component.compareTariffList[0].id).toBe(1);
  });
});
