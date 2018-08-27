export default {
  host: process.env.APP_HOST || '127.0.0.1',
  port: process.env.APP_PORT || 9090,
  base_url: process.env.APP_BASE_URL || 'http://localhost:8080',
  mail: {
    transportMethod: 'SMTP',
    from: 'no-reply@arvale.world',
    host: process.env.APP_MAIL_HOST,
    secureConnection: (process.env.APP_MAIL_SECURE && process.env.APP_MAIL_SECURE == 'true') || false,
    port: parseInt(process.env.APP_MAIL_PORT) || 25,
    auth: {
      user: process.env.APP_MAIL_AUTH_USER,
      pass: process.env.APP_MAIL_AUTH_PASS
    }
  },
  auth: {
    secret: process.env.APP_AUTH_SECRET,
    lifetime: parseInt(process.env.APP_AUTH_LIFETIME) || 86400
  },
  nwn: {
    ip: process.env.APP_NWN_IP,
    port: parseInt(process.env.APP_NWN_PORT) || 5121
  }
}
