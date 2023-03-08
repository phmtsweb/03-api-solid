import { APIError } from '@/errors/APIError'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { AuthenticateUseCase } from '@/useCases/authenticate'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let usersRepository: UsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'johndoe@mail.com'
    const password = '123456'
    const password_hash = await hash(password, 6)

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash,
    })

    const { user } = await authenticateUseCase.execute({ email, password })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'johndoe@mail.com'
    const password = '123456'

    expect(() =>
      authenticateUseCase.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(APIError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'johndoe@mail.com'
    const password = '123456'
    const password_hash = await hash(password, 6)

    await usersRepository.create({
      name: 'John Doe',
      email,
      password_hash,
    })

    expect(() =>
      authenticateUseCase.execute({
        email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(APIError)
  })
})
