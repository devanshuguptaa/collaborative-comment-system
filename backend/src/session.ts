import session from 'express-session'

export default session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Only use true if running HTTPS locally
    sameSite: 'lax', // 'lax' works for localhost cross-port
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
}) 