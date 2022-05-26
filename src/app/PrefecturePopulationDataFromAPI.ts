import { Population } from "./Population";
export interface PrefecturePopulationDataFromAPI {
  message: string;
  result: Result;
}

interface Result {
  boundaryYear: number;
  data: Data[];
}

interface Data {
  label: string;
  data: Population[];
}
