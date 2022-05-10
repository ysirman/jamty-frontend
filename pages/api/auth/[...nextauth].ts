import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
import axios from 'axios'
import { JWT } from 'next-auth/jwt'
import * as jose from 'jose'

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY ?? '',
      clientSecret: process.env.TWITTER_CONSUMER_SECRET ?? '',
    }),
  ],
  session: {
    maxAge: 15 * (24 * 60 * 60), // 15日（バックエンドのJWTと同じ期限にしておく）
  },
  jwt: {
    // バックエンド側から取得したJWTをそのまま使う為、encode/decodeを上書きする
    async encode(params: {
      token: JWT
      secret: string
      maxAge: number
    }): Promise<string> {
      return params.token.jwt
    },
    async decode(params: {
      token: string
      secret: string
    }): Promise<JWT | null> {
      const payload = await jose.decodeJwt(params.token) // node_modules/next-auth/jwt/index.js で使っている jose.jwtDecrypt はJWEを前提としている為、エラーが発生する。その為、decodeJwtを使用する。
      return { ...payload, jwt: params.token }
    },
  },
  callbacks: {
    async signIn({ user, _account, profile }) {
      const twitterUser = {
        provider: 'twitter',
        uid: profile.id,
        name: profile.name,
        nickname: profile.screen_name,
        description: profile.description,
        location: profile.location,
        image: user.image,
      }
      // バックエンドからJWTを取得する
      await axios
        .post(
          `${process.env.BACKEND_URL}/v1/auth/sign_in`,
          {
            api_key: process.env.BACKEND_API_KEY,
            email: `twitter${profile.id}@example.com`,
            password: `password-for-${profile.id}`,
            ...twitterUser,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then(function (response) {
          user.jwt = response.headers['authorization'].split(' ')[1] // "Bearer xxxxx" => "xxxxx"を抽出
        })
        .catch(function (error) {
          console.log(error)
        })
      return true
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.jwt = user.jwt
      }
      return token
    },
    async session({ session, token, user }) {
      session.jwt = token.jwt
      session.user.image = token.image
      session.user.id = token.id
      session.user.name = token.name
      session.user.nickname = token.nickname
      session.user.description = token.description
      session.user.location = token.location
      return session
    },
  },
})
