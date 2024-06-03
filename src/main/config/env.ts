export const env = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'test-secret',
  jwtTime: process.env.JWT_TOKEN_TIME || '1m',
};
