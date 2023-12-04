export interface ResultBase {
  dbpErrCode: number;
  opstatus: number;
  dbpErrMsg: string;
  httpStatusCode: number;
}
export interface ResultLogin {
  details: ResultBase;
}
