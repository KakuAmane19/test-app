export interface PrefectureBaseDataFromAPI {
  message: string;
  result: PrefectureName[];
}

interface PrefectureName {
  prefCode: number;
  prefName: string;
}
