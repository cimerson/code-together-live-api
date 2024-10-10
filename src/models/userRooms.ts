import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core'
import { users } from './users'
import { rooms } from './rooms'

export const usersToRooms = pgTable('users_to_rooms',
  {
    userId: uuid('userId').notNull(), //.references(() => users.id),
    roomId: uuid('roomId').notNull() //.references(() => rooms.id),
  },
  
  // {
  //     userId: uuid('userId').notNull().references(() => users.id),
  //     roomId: uuid('roomId').notNull().references(() => rooms.id),
  // },
  // (t) => ({
  //     pk: primaryKey({ columns: [t.userId, t.roomId] }),
  // }),

  // {
  //   userId: uuid('userId'),
  //   roomId: uuid('roomId'),
  // }, (table) => {
  //   return {
  //     pk: primaryKey({ columns: [table.roomId, table.userId] }),
  //     pkWithCustomName: primaryKey({ name: 'custom_name', columns: [table.roomId, table.userId] }),
  //   };
  // }
)

export const usersToRoomsRelations = relations(usersToRooms , ({ one }) => ({
  room: one(rooms, {
    fields: [usersToRooms .roomId],
    references: [rooms.id],
  }),
  user: one(users, {
    fields: [usersToRooms .userId],
    references: [users.id],
  }),
}));

export type UserRoom = InferSelectModel<typeof usersToRooms>
export type NewUserRoom = InferInsertModel<typeof usersToRooms>