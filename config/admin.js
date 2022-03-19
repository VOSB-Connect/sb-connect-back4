module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f1647cae7b89bc501814f5d5ad4c81dc'),
  },
  watchIgnoreFiles: [
    '**/config/sync/**',
  ]
});
