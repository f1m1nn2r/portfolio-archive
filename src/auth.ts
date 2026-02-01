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
import { createAdminClient } from "./utils/supabase/admin";
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
        console.log("1. 입력받은 정보:", credentials);

        if (!credentials?.email || !credentials.password) return null;

        const { data: user, error } = await supabaseAdmin
          .from(TABLES.USERS)
          .select("*")
          .eq("email", credentials.email)
          .single();

        console.log("2. DB에서 찾은 유저:", user);

        if (error || !user) return null;

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        console.log("3. 비밀번호 일치 여부:", isValidPassword);
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
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  debug: process.env.NODE_ENV === "development",
};
// export const getAuthSession = () => {
//   return getServerSession(authOptions as any);
// };
