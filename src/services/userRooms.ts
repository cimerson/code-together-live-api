import { db } from '../db/db';
import { rooms } from '../models/rooms';
import { NewUserRoom, usersToRooms } from '../models/userRooms';
import { users } from '../models/users';
import { booksToAuthors, NewBoToAU } from '../models/usTogr';
import { eq } from 'drizzle-orm'

export const createUserRoom = async (newUser: NewUserRoom) =>
  await db
    .insert(usersToRooms)
    .values(newUser)
    .returning({ userId: usersToRooms.userId, roomId: usersToRooms.roomId })


export const insertRoom = async (newUser: NewBoToAU) =>
  await db
    .insert(booksToAuthors)
    .values(newUser)
    .onConflictDoUpdate({
      target: [booksToAuthors.authorId, booksToAuthors.bookId],
      set: newUser
    })
    .returning({ userId: booksToAuthors.authorId, roomId: booksToAuthors.bookId })

export const getAllUsers = async (roomId: string) =>
  db.select()
    .from(booksToAuthors)
    .leftJoin(users, eq(booksToAuthors.authorId, users.id))
    .leftJoin(rooms, eq(booksToAuthors.bookId, rooms.id))
    .where(eq(rooms.id, roomId))

export const getUsersforRoom = async (roomId: string) =>
 db.select().from(booksToAuthors).where(eq(booksToAuthors.bookId, roomId)).leftJoin(users, eq(booksToAuthors.authorId, users.id))