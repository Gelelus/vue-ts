export interface User {
    name: string;
    description: string;
    todoType: string;
    date: Date;
    _id: string;
    token: string;
    redirect?:boolean
  } 
  
  export interface UserState {
    user: User | null;
  }
  
  export interface AuthData {
    password: string;
    email: string;
  }