
import { db } from '../db/db'
import { NewUser, User, users } from '../models/users'
import { eq } from 'drizzle-orm'

export const getUsers = async () =>
    await db.select({ id: users.id, username: users.username }).from(users)

export const getUserByUsername = async (username: string) =>
    await db.select().from(users).where(eq(users.username, username))

export const getUserBySessionId = async (sessionId: string) =>
    await db.select().from(users).where(eq(users.id, sessionId))

export const createUser = async (newUser: NewUser) =>
    await db
        .insert(users)
        .values(newUser)
        .returning({ id: users.id, username: users.username })
        
export const updateUserById = async (id: string, updatedUser: User) =>
    await db
        .update(users)
        .set(updatedUser)
        .where(eq(users.id, id))
        .returning({ id: users.id, username: users.username })