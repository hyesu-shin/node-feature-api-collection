export interface Users {
  id: number;
  userId: string;
  password: string;
  salt: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface LoginUser {
  identifier: string,
  password: string,
  deviceId: string,
}

export interface AuthUser {
  id: number,
  password?: string,
  deviceId?: string,
}