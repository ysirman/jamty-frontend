import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
import axios from 'axios'

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
      session.accessToken = token.jwt
      return session
    },
  },
})
