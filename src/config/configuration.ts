export default (): any => ({
  PORT: parseInt(process.env.PORT, 10) || 3010,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  ENABLE_CORS: true,
  RATE_LIMIT: {
    max: 100,
    minutes: 10,
  },
  EMAIL_CONFIGURATION: {
    EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    EMAIL_PORT: process.env.EMAIL_PORT || 587,
    SECURE_PORT: process.env.SECURE_PORT || 465,
    SECURE: process.env.SECURE || false,
    EMAIL_ID: process.env.EMAIL_ID || 'dineshiie@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'asalmangatha2011',
    EMAIL_FROM: process.env.EMAIL_FROM || 'dineshiie@gmail.com',
    CONFIRMATION_EMAIL_SUBJECT:
      process.env.CONFIRMATION_EMAIL_SUBJECT ||
      'Digital Enterprise Initiative™ confirmation',
    LEAD_EMAIL_SUBJECT: process.env.LEAD_EMAIL_SUBJECT || 'KLW - Deals',
  },
});
