// import NextAuth, { NextAuthOptions, User } from "next-auth";
// --------------------------------------------------------
// 위 import 구문대로 작성하면
// 모듈 '"next-auth"'에는 내보낸 멤버 'NextAuthOptions'가 없습니다.ts 라는
// 에러린트가 자꾸 떠서 깃허브 참고해봤는데도 여전히 안 됨 ...
// https://github.com/nextauthjs/next-auth/issues/7377
// --------------------------------------------------------
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthOptions, User, Session } from "next-auth";
import { createAdminClient } from "./lib/supabase/admin";
import { TABLES } from "./lib/constants/tables";
import { JWT } from "next-auth/jwt";

const supabaseAdmin = createAdminClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials.password) return null;

        const { data: user, error } = await supabaseAdmin
          .from(TABLES.USERS)
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user) return null;

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValidPassword) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role,
        } as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: { strategy: "jwt", maxAge: 60 * 60 },
  pages: { signIn: "/login" },
  debug: process.env.NODE_ENV === "development",
  jwt: {
    maxAge: 60 * 60,
  },
};
// export const getAuthSession = () => {
//   return getServerSession(authOptions as any);
// };
