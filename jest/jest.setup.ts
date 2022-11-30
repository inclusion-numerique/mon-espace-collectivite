import 'jest'
import { matchers as joiMatchers } from 'jest-joi'
import 'jest-extended'
import 'jest-extended/all'
import '@testing-library/jest-dom/extend-expect'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

expect.extend(joiMatchers)
