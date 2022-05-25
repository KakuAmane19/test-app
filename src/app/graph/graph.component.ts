import { Component, OnInit, AfterViewChecked, DoCheck } from '@angular/core';

import { PrefectureService } from '../prefecture.service';
import { PopulationCompositionService } from '../population-composition.service';

import { PrefecturePopulationDataFromAPI } from '../PrefecturePopulationDataFromAPI';
import { Option } from '../Option';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit, AfterViewChecked {
  selectees: Set<Option> = new Set([]);
  preSelectees: Set<Option> = new Set([]);
  constructor(
    private prefectureService: PrefectureService,
    private populationCompositionService: PopulationCompositionService
  ) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.selectees = new Set(this.prefectureService.getSelectee());

    //増えてたらAPIから人口取得

    console.log(this.selectees);
  }

  /**
   * 対応する県の総人口を取ってくる
   *
   * @param  県名コード(prefCode)
   */
  getPrefecturePopulation(/*hikisuu */) {
    this.populationCompositionService.getPrefecturePopulation('46').subscribe(
      (data) => {
        const prefecturePopulation = data.result;
        console.log(prefecturePopulation.data[0]);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
