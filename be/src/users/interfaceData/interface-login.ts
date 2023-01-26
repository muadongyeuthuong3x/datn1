export interface UserData {
    email: string;
    token: string;
    role : string
  }
  
export interface UserRO {
    user: UserData;
  } 