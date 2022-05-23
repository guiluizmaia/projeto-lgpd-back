module.exports = {
  type: 'mongodb',
  host: process.env.MONGO_HOST,
  port: Number(process.env.MONGO_PORT),
  database: process.env.MONGO_DATABASE,
  useUnifiedTopology: true,
  entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
};
