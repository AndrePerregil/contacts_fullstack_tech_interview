export interface IUser {
  id: string;
  username: string;
  password: string;
}

export interface IUserRequest {
  username: string;
  password: string;
}

export interface IUserNoPassword {
  id: string;
  username: string;
}

export interface IUserPatch {
  id: string;
  username?: string;
  password?: string;
}

export interface IUserRequestPatch {
  username?: string;
  password?: string;
}
