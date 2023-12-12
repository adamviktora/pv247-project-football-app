import bcrypt from "bcrypt";
import {
  NextAuthOptions,
  getServerSession,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";

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
        if (!credentials?.password) {
          return null;
        }

        const user: Admin = await prisma.admin.findFirstOrThrow({
          where: { email: credentials?.username },
        });

        if (user) {
          const passwordMatch = await bcrypt.compare(
            credentials?.password,
            user.password,
          );

          if (passwordMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
