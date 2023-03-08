import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { APIError } from '@/errors/APIError'
import { makeRegisterUseCase } from '@/useCases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const userBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = userBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({ name, email, password })
  } catch (err: any) {
    if (err instanceof APIError) {
      return reply.status(err.statusCode).send({ error: err.message })
    }
  }

  return reply.status(201).send()
}
