export interface UserModel {
  id: number;
  sub: string;
  name: string;
  email: string;
  profile_pic: string;
  admin: boolean;
  authorized: boolean;
  joined_at: string;
}
