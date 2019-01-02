interface IConfigEnvironments {
  development: object
  test: object
  production: object
  [index: string]: object
}

export const getEnv = (env: string | undefined) => env || process.env.NODE_ENV || 'development'
export const getConfig = (config: IConfigEnvironments, env?: string): object => config[getEnv(env)]
