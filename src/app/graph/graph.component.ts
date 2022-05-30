import { Component, OnInit, AfterViewChecked } from '@angular/core';

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
  boundaryYear : number = 0;
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
   * チェックボックスの変化を検知
   * @param nothing
   * @return nothing
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
   * @return nothing
   
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
        this.setBoundaryYear(prefecturePopulation.boundaryYear);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /**
   * 推定に切り替わる年の更新
   *
   * @param  実測値と推定値の切り替わる年( boundaryYear )
   * @return nothing
   
   */
   setBoundaryYear(boundaryYear:number):void {
     this.boundaryYear = boundaryYear;
  }

  /**
   * 手持ちのデータから対応する県の総人口を取り除く
   *
   * @param  選択解除された県(Option)
   * @return nothing
   */
   deletePrefecturePopulation(prefecture:Option):void {
     setTimeout(()=>{},10)//getPrefecturePopulationとの非同期処理に関する対称性をとるために挿入
     const result = this.prefecturePopulationData.filter((element)=>{
       return element.prefCode != prefecture.prefCode
     });
     this.prefecturePopulationData = result;
  }

  /**
   * データを整えるグラフに表示
   * 
   * @param nothing
   * @return nothing
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
