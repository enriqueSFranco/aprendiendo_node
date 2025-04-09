import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://127.0.0.1:3000',
  'http://localhost:1234',
  'http://127.0.0.1:5500',
  'https://movies.com',
]

const corsOptions = {
  origin: function (origin, callback) {
    if (ACCEPTED_ORIGINS.includes(origin))
      callback(null, true)

    else if (!origin)
      callback(null, new Error('Origin not provided'))

    else callback(new Error('Not allowed by CORS'))
  },
  optionsSuccessStatus: 200
}

export function corsMiddleware () {
  return cors(corsOptions)
}