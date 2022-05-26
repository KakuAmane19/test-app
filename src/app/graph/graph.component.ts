import { Component, OnInit, AfterViewChecked, DoCheck } from '@angular/core';

import { PrefectureService } from '../prefecture.service';
import { PopulationCompositionService } from '../population-composition.service';

import { PrefecturePopulationData } from '../PrefecturePopulationData';
import { Option } from '../Option';
import { elementAt } from 'rxjs';
import { year } from '@igniteui/material-icons-extended';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit, AfterViewChecked {
  selectees: Set<Option> = new Set([]);
  preSelectees: Set<Option> = new Set([]);

  prefecturePopulationData:PrefecturePopulationData[] = [];
  public data: any[] = [];

  constructor(
    private prefectureService: PrefectureService,
    private populationCompositionService: PopulationCompositionService
  ) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.makeGraph();
  }

  /**
   * グラフを作る
   *
   * @param  県名コード(prefCode)
   */
   makeGraph():void {
    this.selectees = new Set(this.prefectureService.getSelectee());
    
    //増えてたらAPIから人口取得
    const plusDifference = new Set([...this.selectees].filter(element => (!this.preSelectees.has(element))));
    if(plusDifference.size == 1)this.getPrefecturePopulation(Array.from(plusDifference)[0]);
    
    //減っていたらデータ群から削除
    const minusDifference = new Set([...this.preSelectees].filter(element => (!this.selectees.has(element))));
    if(minusDifference.size == 1)this.deletePrefecturePopulation(Array.from(minusDifference)[0]);

    this.preSelectees = this.selectees;

    console.log(this.prefecturePopulationData);
    this.drawGraph();
   }

  /**
   * 対応する県の総人口を取ってくる
   *
   * @param  県名コード(prefCode)
   */
  getPrefecturePopulation(prefecture:Option) {
    this.populationCompositionService.getPrefecturePopulation(prefecture.prefCode.toString()).subscribe(
      (data) => {
        const prefecturePopulation = data.result;
        this.prefecturePopulationData.push({
          prefCode:prefecture.prefCode,
          prefName:prefecture.prefName,
          populationData: prefecturePopulation.data[0].data,
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /**
   * 手持ちのデータから対応する県の総人口を取り除く
   *
   * @param  県名コード(prefCode)
   */
   deletePrefecturePopulation(prefecture:Option) {
     const result = this.prefecturePopulationData.filter((element)=>{
       return element.prefCode != prefecture.prefCode
     });
     this.prefecturePopulationData = result;
  }

  /**
   * グラフを描画する
   *
   * @param  県名コード(prefCode)
   */
   drawGraph():void {
    this.data = [
      { Year: "2009", Europe: 31, China: 21, USA: 19 },
      { Year: "2010", Europe: 43, China: 26, USA: 24 },
      { Year: "2011", Europe: 66, China: 29, USA: 28 },
      { Year: "2012", Europe: 69, China: 32, USA: 26 },
      { Year: "2013", Europe: 58, China: 47, USA: 38 },
      { Year: "2014", Europe: 40, China: 46, USA: 31 },
      { Year: "2015", Europe: 78, China: 50, USA: 19 },
      { Year: "2016", Europe: 13, China: 90, USA: 52 },
      { Year: "2017", Europe: 78, China: 132, USA: 50 },
      { Year: "2018", Europe: 40, China: 134, USA: 34 },
      { Year: "2019", Europe: 80, China: 96, USA: 38 },
  ];
   }
}
