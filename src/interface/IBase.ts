export interface IPageResult<T> {
  data: T[];
  page?: number;
  pageSize?: number;
  total?: number;
}
