import { Component, OnInit, AfterViewChecked,DoCheck } from '@angular/core';

import { PrefectureService } from '../prefecture.service';
import { PopulationCompositionService } from '../population-composition.service';

import { PrefecturePopulationDataFromAPI } from '../PrefecturePopulationDataFromAPI';
import { Option } from '../Option';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit, AfterViewChecked, DoCheck {
  selectees: Option[] = [];
  constructor(
    private prefectureService: PrechoolService,
    private populationCompositionService: PopulationCompositionService
  ) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.prefectureService.getSelectees()
    console.log('DoCheck');
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log('AfterViewChecked');
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
