import { Component } from '@angular/core';
import {
  ElectricityTariffsService,
  etData,
} from '../../services/electricity-tariffs.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  electricityTariff: etData[] = [];
  // unSortedData: etData[] = [];
  isAscendingDescending: string = '';
  isCurrentColumn: string = '';
  compareTariffList: etData[] = [];
  isClear: boolean = false;

  serachForm: FormGroup;

  ngOnInit(): void {
    console.log(this._etService.unSortedData);
    if (this._etService.unSortedData.length == 0) {
      this._etService.getElectricityTariffData().subscribe((result: any) => {
        // const results = this._etService.unSortedData.length > 0 ? [...result?.tariff].filter(({ id: id1 }) => !this._etService.unSortedData.some(({ id: id2 }) => id2 === id1)) : 'suma';
        // console.log(results);
        let tariff = [...result?.tariff].map((data: any) => ({
          ...data,
          isAddToCompare: false,
        }));
        this._etService.unSortedData = [...tariff];
        this.electricityTariff = [...tariff];
        console.log(this.electricityTariff);
      });
    } else {
      this.electricityTariff = [...this._etService.unSortedData];
      this.compareTariffList = this.electricityTariff.filter(
        (data) => data.isAddToCompare
      );
    }

    this.serachForm.get('searchText')?.valueChanges.subscribe((val) => {
      console.log(val);
      let txet = val.trim();
      this.isClear = val != '' ? true : false;
    });
  }

  constructor(
    private _http: HttpClient,
    private _etService: ElectricityTariffsService
  ) {
    this.serachForm = new FormGroup({
      searchText: new FormControl('', [Validators.pattern('[a-zA-Z0-9 .]*')]),
    });
  }

  onSubmit() {
    let searchInput = this.serachForm.value.searchText.trim();
    this.electricityTariff = [...this._etService.unSortedData]
    searchInput == ''
      ? (this.electricityTariff = [...this._etService.unSortedData])
      : (this.electricityTariff = this.filterData(
          this.electricityTariff,
          searchInput
        ));
  }

  filterData(arr: etData[], searchInput: string) {
    return arr.filter((obj: any) =>
      Object.values(obj)
        .flat()
        .some((v) =>
          `${v}`.toLowerCase().includes(`${searchInput}`.toLowerCase())
        )
    );
  }

  clearText(): void {
    this.serachForm.get('searchText')?.setValue('');
    this.onSubmit();
  }

  sortTable(columnName: string) {
    this.isCurrentColumn = columnName;
    if (this.isAscendingDescending == '') {
      this.isAscendingDescending = 'Asc';
      this.electricityTariff.sort(
        (a: any, b: any) => a[columnName] - b[columnName]
      );
    } else if (this.isAscendingDescending == 'Asc') {
      this.isAscendingDescending = 'Decs';
      this.electricityTariff.sort(
        (a: any, b: any) => b[columnName] - a[columnName]
      );
    } else {
      this.isAscendingDescending = '';
      this.electricityTariff = [...this._etService.unSortedData];
    }
  }

  addToCompareList(tariffData: etData, index: number) {
    tariffData.isAddToCompare = !tariffData.isAddToCompare;
    let ind = this.compareTariffList.findIndex(
      (ele) => ele.id == tariffData.id
    );
    if (ind == -1) {
      this.compareTariffList.push(tariffData);
    } else {
      this.compareTariffList.splice(ind, 1);
    }

    this._etService.updateCompareList(this.compareTariffList);
  }
}
