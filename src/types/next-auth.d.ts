import NextAuth, { User, type DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user: IUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: IUser;
  }
}
