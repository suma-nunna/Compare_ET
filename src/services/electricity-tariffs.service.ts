import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface etData {
  id: number;
  name: string;
  price: number;
  supplier: string;
  description: string;
  isAddToCompare?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ElectricityTariffsService {
  private compareTariffList = new BehaviorSubject<etData[]>([]);
  currentCompareList = this.compareTariffList.asObservable();

  unSortedData: etData[] = [];

  constructor(private httpClient: HttpClient) {}

  getElectricityTariffData() {
    let configData = `assets/electricityTariffs.json`;
    return this.httpClient.get(configData);
  }

  updateCompareList(list: etData[]) {
    this.compareTariffList.next(list);
  }
}
