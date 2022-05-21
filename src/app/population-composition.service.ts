import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { PopulationCompositionData } from './PopulationCompositionData';
import { PrefecturePopulation } from './PrefecturePopulationData';

@Injectable({
  providedIn: 'root',
})
export class PopulationCompositionService {
  apiUrl =
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';
  query = '?' + 'prefCode=46';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'X-API-KEY': '4h1WnyWHVxUtV5xvjNSqPj2cUjJXZyg5e7PNN7fo',
    }),
  };

  constructor(private http: HttpClient) {}

  /**
   * APIから該当する県の人口を取得
   *
   * @return result - 県名（PrefectureName型）の配列
   * @see PrefectureName
   */
  getPrefecturePopulation(): Observable<PopulationCompositionData> {
    return this.http.get<PopulationCompositionData>(
      this.apiUrl + this.query,
      this.httpOptions
    );
  }
}
