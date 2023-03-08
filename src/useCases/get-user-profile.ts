import { APIError } from '@/errors/APIError'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseReply {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseReply> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new APIError('User not found', 404)
    }

    return {
      user,
    }
  }
}
