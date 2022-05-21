import { Component, OnInit } from '@angular/core';
import { PrefectureService } from '../prefecture.service';

import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Data } from '../Data';
import { PrefectureName } from '../PrefectureName';
import { Option } from '../Option';

@Component({
  selector: 'app-prefectures',
  templateUrl: './prefectures.component.html',
  styleUrls: ['./prefectures.component.css'],
})
export class PrefecturesComponent implements OnInit {
  prefectures: Option[] = [];
  selectee: Option[] = [];

  constructor(private prefectureService: PrefectureService) {}

  ngOnInit(): void {
    //県名の一覧を確保
    this.getPrefectureNames();
  }

  /**
   * 県名の一覧を確保
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
        console.log(this.prefectures);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /**
   * チェックされた県idを取得して、APIに該当する県の人口データを取りに行く
   * @return nothing
   */
  checkBox(): void {
    this.prefectures.forEach((prefecture) => {
      if ('selected' in prefecture && prefecture.selected) {
        this.selectee.push(prefecture);
      }
    });

    console.log(this.selectee);
    this.selectee = [];
  }
}
