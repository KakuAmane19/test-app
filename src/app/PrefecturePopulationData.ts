export interface Option {
  prefCode: number;
  prefName: string;
  populationData: Data[];
}

interface Data {
  year: number;
  population: number;
}
