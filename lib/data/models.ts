// TODO: not used anywhere, perhaps it is not needed at all
// export interface UserInfo {
//   id: string;
//   username: string;
//   tips: TipInfo[]; // TODO: optimize this - currently it fetches all tips at once
// }

export interface DonationInfo {
  id: string;
  createdAt: number;
  amount: number;
  // currency: string; TODO: Do we need this
  message?: string;
  donor?: string;
}
