import { User as TUser } from ".";

declare module "next-auth" {
  interface Session {
    jwt: string;
    user: TUser;
  }
  interface User {
    token: string;
    user: TUser;
    data: any;
  }
}
