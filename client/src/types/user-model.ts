export interface UserModel {
  id: number;
  sub: string;
  name: string;
  email: string;
  profile_pic: string;
  is_admin: boolean;
  is_authorized: boolean;
  joined_at: string;
}
