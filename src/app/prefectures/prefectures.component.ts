import { Component, OnInit } from '@angular/core';
import { PrefectureService } from '../prefecture.service';

import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Data } from '../Data';
import { PrefectureName } from '../PrefectureName';

@Component({
  selector: 'app-prefectures',
  templateUrl: './prefectures.component.html',
  styleUrls: ['./prefectures.component.css'],
})
export class PrefecturesComponent implements OnInit {
  prefectureNames: PrefectureName[] = [];

  constructor(private prefectureService: PrefectureService) {}

  ngOnInit(): void {
    //県名の一覧を確保
    this.getPrefectureNames();
  }

  getPrefectureNames(): void {
    this.prefectureService.getPrefectureNames().subscribe(
      (data) => {
        this.prefectureNames = data.result;
      },
      (err) => {
        this.prefectureNames = err.result;
      }
    );
  }
}
