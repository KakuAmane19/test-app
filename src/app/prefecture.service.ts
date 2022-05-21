import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { PrefectureBaseData } from './PrefectureBaseData';
import { Option } from './Option';

@Injectable({
  providedIn: 'root',
})
export class PrefectureService {
  apiUrl = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'X-API-KEY': '4h1WnyWHVxUtV5xvjNSqPj2cUjJXZyg5e7PNN7fo',
    }),
  };

  selectees: Option[] = [];

  constructor(private http: HttpClient) {}

  /**
   * APIから県名一覧の確保
   *
   * @return result - 県名（PrefectureName型）の配列
   * @see PrefectureName
   */
  getPrefectureNames(): Observable<PrefectureBaseData> {
    return this.http.get<PrefectureBaseData>(this.apiUrl, this.httpOptions);
  }

  /**
   * 選ばれた県を保存
   *
   * @param selectees チェックが入れられた県
   * @return void
   */
  setSelectees(selectees: Option[]): void {
    this.selectees = selectees;
  }

  /**
   * 選ばれている県の一覧を送る
   *
   * @return result - 県名（PrefectureName型）の配列
   */
  getSelectee(): Option[] {
    return this.selectees;
  }
}
