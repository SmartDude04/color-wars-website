import NextAuth, { CredentialsSignin, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
import { signInSchema } from "@/zod";

declare module "next-auth" {
    interface User {
        username: string
        role: string
    }

    interface Session {
        user: User
    }
}

export class InvalidCredentials extends CredentialsSignin {
    code = "Invalid username/password. Please try again."
}

export class NotVerified extends CredentialsSignin {
    code = "Account not verified. Try again later."
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {}
            },

            authorize: async (credentials: Partial<Record<"username" | "password", unknown>>): Promise<User | null> => {
                const { username, password } = await signInSchema.parseAsync(credentials);

                // Attempt to get the user from the database
                const user = await prisma.user.findUnique({
                    where: {
                        username: username
                    }
                });

                if (!user) {
                    // No user found; reject
                    throw new InvalidCredentials();
                }

                // If the user exists, check that the password matches
                const match = await bcrypt.compare(password as string, user.password);

                if (!match) {
                    // Password doesn't match; reject
                    throw new InvalidCredentials();
                }

                if (!user.verified) {
                    // User exists but is not verified; reject
                    throw new NotVerified();
                }

                // Password matches, so return the user data
                return {
                    id: user.id,
                    username: user.username,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.username = user.username;
                token.role = user.role;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.username = token.username as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    }
});