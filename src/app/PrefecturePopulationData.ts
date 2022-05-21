export interface PrefecturePopulation {
  prefCode: number;
  prefName: string;
  data: Data[];
}

interface Data {
  label: string;
  data: Population[];
}

interface Population {
  year: number;
  value: number;
}
