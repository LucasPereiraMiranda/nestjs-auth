import * as dotenv from 'dotenv';
dotenv.config();

interface ConfigProps {
  api: {
    port: number;
    prefix: string;
    baseUrl: string;
  };
  db: {
    type: string;
    connection: string;
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
    synchronize: boolean;
  };
  jwt: {
    secret: string;
  };
}

const env: any = process.env;

export const envConfig: ConfigProps = {
  api: {
    baseUrl: env.API_BASE_URL || 'http://localhost',
    port: parseInt(env.SERVER_PORT, 10) || 3000,
    prefix: env.API_PREFIX || 'api/v1',
  },
  db: {
    type: env.CONNECTION,
    connection: env.DB_CONNECTION,
    host: env.DB_HOST,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    port: parseInt(env.DB_PORT, 10) || 3306,
    synchronize: !!env.TYPEORM_SYNCHRONIZE,
  },
  jwt: {
    secret: env.SECRET_JWT,
  },
};
