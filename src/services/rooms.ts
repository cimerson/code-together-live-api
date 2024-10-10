import { db } from '../db/db'
import { NewRoom, rooms } from '../models/rooms'
import { eq } from 'drizzle-orm'


export const getUserRooms = async (userId: string) =>
    await db.select().from(rooms).where(eq(rooms.owner, userId))

export const getRoomById = async (roomId: string ) =>
    await db.select().from(rooms).where(eq(rooms.id, roomId))

export const insertRoom = async (NewRoom: NewRoom) =>
    await db
        .insert(rooms)
        .values(NewRoom)
        .returning({ id: rooms.id, name: rooms.name,  language: rooms.language, owner: rooms.owner, code: rooms.code })