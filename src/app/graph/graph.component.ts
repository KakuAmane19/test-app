import { Component, OnInit, AfterViewChecked, DoCheck } from '@angular/core';

import { PrefectureService } from '../prefecture.service';
import { PopulationCompositionService } from '../population-composition.service';

import { PrefecturePopulationData } from '../PrefecturePopulationData';
import { Option } from '../Option';

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
    this.detectChange();
  }

  /**
   * チェックボックスの変化を検知した後、把握する処理
   */
   detectChange():void {
    this.selectees = new Set(this.prefectureService.getSelectee());
    
    //増えてたらAPIから人口取得
    const plusDifference = new Set([...this.selectees].filter(element => (!this.preSelectees.has(element))));
    if(plusDifference.size == 1)this.getPrefecturePopulation(Array.from(plusDifference)[0]);
    
    //減っていたらデータ群から削除
    const minusDifference = new Set([...this.preSelectees].filter(element => (!this.selectees.has(element))));
    if(minusDifference.size == 1)this.deletePrefecturePopulation(Array.from(minusDifference)[0]);

    this.preSelectees = this.selectees;

    this.makeGraph();
   }

  /**
   * 対応する県の総人口を取ってくる
   *
   * @param  新しく選択された県(Option)
   */
  getPrefecturePopulation(prefecture:Option):void {
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
   * @param  選択解除された県(Option)
   */
   deletePrefecturePopulation(prefecture:Option):void {
     const result = this.prefecturePopulationData.filter((element)=>{
       return element.prefCode != prefecture.prefCode
     });
     this.prefecturePopulationData = result;
  }

  /**
   * データを整えるグラフに表示
   */
   makeGraph():void {
    let viewData: any[] = [];
    this.data = viewData;
    if(this.prefecturePopulationData.length > 0){
      //Year属性を使って表示用のデータ配列を作りながら長さを決定する
      this.prefecturePopulationData[0].populationData.forEach((prefecturePopulation)=>
        viewData.push({Year:prefecturePopulation.year.toString()})
      );
      this.prefecturePopulationData.forEach((prefecture)=>{
        viewData.forEach((object,index)=>{
          object[prefecture.prefName] = prefecture.populationData[index].value;
        });
      });
      
    }else{
      viewData = [];
    }
    this.data = viewData;
   }
}
