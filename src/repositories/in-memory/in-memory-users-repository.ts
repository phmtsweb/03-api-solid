import { UsersRepository } from '../users-repository'
import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = []
  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) || null
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id) || null
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}
