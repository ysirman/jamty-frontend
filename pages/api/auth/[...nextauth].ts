import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY ?? '',
      clientSecret: process.env.TWITTER_CONSUMER_SECRET ?? '',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // twitterだとaccessTokenではなく、oauth_tokenを取得している
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})
