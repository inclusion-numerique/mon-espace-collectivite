import { customAlphabet } from 'nanoid'
const generator = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZ', 8)

export const generateReference = () => generator()
