import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { PrefecturePopulationDataFromAPI } from './PrefecturePopulationDataFromAPI';

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
   * @param  県名コード(prefCode)
   * @return result - 任意の県の人口構成
   */
  getPrefecturePopulation(
    prefCode: string
  ): Observable<PrefecturePopulationDataFromAPI> {
    this.query = '?' + 'prefCode=' + prefCode;
    return this.http.get<PrefecturePopulationDataFromAPI>(
      this.apiUrl + this.query,
      this.httpOptions
    );
  }
}
