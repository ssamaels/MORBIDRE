// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     Credentials({
//       clientId: process.env.MORBIDRE_ID,
//       clientSecret: process.env.MORBIDRE_SECRET,
//     }),
//     // ...add more providers here
//   ],
// };

// export default NextAuth(authOptions);

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (
//           credentials.username === "BabyDre" &&
//           credentials.password === "KonstantinKatarina"
//         ) {
//           return { id: 1, name: "BabyDre", email: "babydre@example.com" };
//         }
//         return null;
//       },
//     }),
//   ],
// });
// import CredentialsProvider from "next-auth/providers/credentials";

// providers: [
//   CredentialsProvider({
//     // The name to display on the sign in form (e.g. "Sign in with...")
//     name: "Credentials",
//     // `credentials` is used to generate a form on the sign in page.
//     // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//     // e.g. domain, username, password, 2FA token, etc.
//     // You can pass any HTML attribute to the <input> tag through the object.
//     credentials: {
//       username: { label: "Username", type: "text", placeholder: "babydre" },
//       password: { label: "Password", type: "password" },
//     },
//     async authorize(credentials, req) {
//       // Add logic here to look up the user from the credentials supplied
//       const user = { id: "1", name: "MorbiDre", email: "morbidre@design.com" };

//       if (user) {
//         // Any object returned will be saved in `user` property of the JWT
//         return user;
//       } else {
//         // If you return null then an error will be displayed advising the user to check their details.
//         return null;

//         // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//       }
//     },
//   }),
// ];

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
