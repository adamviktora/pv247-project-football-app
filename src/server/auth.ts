import {
  NextAuthOptions,
  getServerSession,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

type Admin = {
  id: string;
  email: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jdoe@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const user: Admin = await prisma.admin.findFirstOrThrow({
          where: { email: credentials?.username },
        });

        const is_ok = user && user.password === credentials?.password;
        if (is_ok) {
          return user;
        }
        return null;
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
