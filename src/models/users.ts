import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { rooms } from './rooms';
import { usersToRooms } from './userRooms';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    created_at: timestamp('created_at').defaultNow(),
})

// export const usersRelations = relations(users, ({ many }) => ({
//     posts: many(rooms),
// }))

export const usersRelations = relations(users, ({ many }) => ({
    usersToRooms: many(usersToRooms),
}))

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>