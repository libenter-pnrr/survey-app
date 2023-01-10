export default interface IResponse<T> {
  result: boolean;
  data?: T | T[];
  message?: string;
}
