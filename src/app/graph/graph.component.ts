import { Component, OnInit } from '@angular/core';

import { PopulationCompositionService } from '../population-composition.service';

import { PrefecturePopulation } from '../PrefecturePopulationData';
import { Option } from '../Option';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent implements OnInit {
  selectees: Option[] = [];
  constructor(
    private populationCompositionService: PopulationCompositionService
  ) {}

  ngOnInit(): void {
    this.getPrefecturePopulation();
  }

  /**
   * 対応する県の総人口を取ってくる
   */
  getPrefecturePopulation() {
    this.populationCompositionService.getPrefecturePopulation().subscribe(
      (data) => {
        const prefecturePopulation: PrefecturePopulation =
          data.result as PrefecturePopulation;
        console.log(prefecturePopulation.data[0]);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
