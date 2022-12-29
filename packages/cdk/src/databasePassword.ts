import { createHash } from 'crypto'

// Database passwords are generated using a secret common to cdk stack and web stack and an unsafe value
// that is scoped to the username of the database
//⚠️ A change to this algorithm will break connections between web app containers and database in production ⚠️
export const generateDatabasePassword = (secret: string, value: string) =>
  createHash('sha256').update(`${secret}${value}`).digest('hex')
