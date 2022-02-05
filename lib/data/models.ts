// TODO: not used anywhere, perhaps it is not needed at all
// export interface UserInfo {
//   id: string;
//   username: string;
//   tips: TipInfo[]; // TODO: optimize this - currently it fetches all tips at once
// }

export interface TipInfo {
  id: string;
  createdAt: number;
  amount: string;
  message?: string;
}
