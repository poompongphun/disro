import NextAuth from 'next-auth'
import { options } from '@/utils/options'

const handler = NextAuth(options)

export default handler
