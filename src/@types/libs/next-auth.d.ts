export {};

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends Account {
    /** API Session Cookie  */
    apiCookie?: string;
  }

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: Account;
    wallet?: string;
    apiCookie?: string;
  }
}
