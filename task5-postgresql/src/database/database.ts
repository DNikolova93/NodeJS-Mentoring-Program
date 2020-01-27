import { Pool, PoolConfig } from 'pg';

const init = (postgresConfig: PoolConfig) => {
  const client = new Pool(postgresConfig);
  return client.connect();
};

export { init };