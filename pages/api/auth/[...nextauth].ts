import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
import axios from 'axios'

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? '',
      version: '2.0', // opt-in to Twitter OAuth 2.0
    }),
  ],
  session: {
    maxAge: 15 * (24 * 60 * 60), // 15日（バックエンドのJWTと同じ期限にしておく）
  },
  callbacks: {
    async signIn({ user, _account, profile }) {
      const twitterUser = {
        provider: 'twitter',
        uid: profile.data.id,
        name: profile.data.username,
        nickname: profile.data.name,
        image: user.image,
      }
      // バックエンドからJWTを取得する
      await axios
        .post(
          `${process.env.BACKEND_URL}/v1/auth/sign_in`,
          {
            api_key: process.env.BACKEND_API_KEY,
            email: `twitter${profile.data.id}@example.com`,
            password: `password-for-${profile.data.id}`,
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
      if (user.jwt) {
        return true
      }
      return false
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.jwt = user.jwt
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.jwt
      return session
    },
  },
  events: {
    async signOut(message) {
      // フロントエンドでログアウトしたらバックエンドからもログアウトする
      await axios.delete(
        `${process.env.BACKEND_URL}/v1/auth/sign_out?api_key=${process.env.BACKEND_API_KEY}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${message.token.jwt}`,
          },
        }
      )
    },
  },
})
