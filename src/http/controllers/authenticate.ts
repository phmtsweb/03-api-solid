import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { APIError } from '@/errors/APIError'
import { makeAuthenticateUseCase } from '@/useCases/factories/make-authenticate-use-case copy'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    await authenticateUseCase.execute({ email, password })
  } catch (err: any) {
    if (err instanceof APIError) {
      return reply.status(err.statusCode).send({ error: err.message })
    }
  }

  return reply.send()
}
