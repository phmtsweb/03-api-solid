import fastify from 'fastify'
import { errorHandler } from './errors'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler(errorHandler)
