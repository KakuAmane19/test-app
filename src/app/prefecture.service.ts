import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Data } from './Data';
import { PrefectureName } from './PrefectureName';

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
  result: PrefectureName[] = [];

  constructor(private http: HttpClient) {}

  /**
   * APIから県名一覧の確保
   *
   * @return result - 県名（PrefectureName型）の配列
   * @see PrefectureName
   */
  getPrefectureNames(): Observable<Data> {
    return this.http.get<Data>(this.apiUrl, this.httpOptions);
  }
}
