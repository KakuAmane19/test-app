import { Component, OnInit } from '@angular/core';
import { PrefectureService } from '../prefecture.service';

import { Option } from '../Option';

@Component({
  selector: 'app-prefectures',
  templateUrl: './prefectures.component.html',
  styleUrls: ['./prefectures.component.css'],
})
export class PrefecturesComponent implements OnInit {
  prefectures: Option[] = [];

  constructor(private prefectureService: PrefectureService) {}

  ngOnInit(): void {
    //県名の一覧を確保
    this.getPrefectureNames();
  }

  /**
   * 県名の一覧を確保
   * @param nothing
   * @return nothing
   */
  getPrefectureNames(): void {
    this.prefectureService.getPrefectureNames().subscribe(
      (data) => {
        const prefectureNames = data.result;
        prefectureNames.forEach((element) =>
          this.prefectures.push({
            prefCode: element.prefCode,
            prefName: element.prefName,
            selected: false,
          })
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /**
   * チェックボックスの監視
   * チェックされている県の一覧を取得する
   * @param nothing
   * @return nothing
   */
  checkBox(): void {
    const result = this.prefectures.filter((prefecture) => prefecture.selected);
    this.prefectureService.setSelectees(result);
  }
}
