import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users'
import { usersToRooms } from './userRooms';

export const rooms = pgTable('rooms',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    language: text('language').notNull(),
    owner: uuid('owner').notNull().references(() => users.id),
    code: text('code').notNull(),
    created_at: timestamp('created_at').defaultNow(),
  }
)

export const groupsRelations = relations(rooms, ({ many }) => ({
  usersToRooms: many(usersToRooms),
}));

export type Room = InferSelectModel<typeof rooms>
export type NewRoom = InferInsertModel<typeof rooms>