import { customAlphabet } from 'nanoid'
const generator = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZ', 12)

export const generateReference = () => generator()
