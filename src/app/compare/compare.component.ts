import { Component, OnInit } from '@angular/core';
import { ElectricityTariffsService, etData } from '../../services/electricity-tariffs.service';
import { JsonPipe, KeyValuePipe, TitleCasePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [JsonPipe, KeyValuePipe, TitleCasePipe, CurrencyPipe],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss',
})
export class CompareComponent implements OnInit {
  compareTariffData: any[] = [];
  compareKeys = ['price' , 'supplier', 'description'];

  constructor(private _etService: ElectricityTariffsService) {}

  ngOnInit(): void {
    this._etService.currentCompareList.subscribe(compareData => {
      console.log('Compare component data - ', compareData);
      this.compareTariffData = compareData;
    })
  }

  removeTraiff(obj: etData, index: number) {
    console.log(obj, index);
    let mainArrIndex = this._etService.unSortedData.findIndex(ele => ele.id == obj.id);
    this._etService.unSortedData[mainArrIndex].isAddToCompare = false;
    this.compareTariffData.splice(index, 1);
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }
}
