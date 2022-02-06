export interface PageResults<T> {
  items: T[];
  count: number;
}

export interface RequestParams {
  filter?: string;
  orderBy?: string;
  skip?: number;
  top?: number;
}
