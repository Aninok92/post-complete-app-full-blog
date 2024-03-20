import { hash } from 'bcryptjs'

export async function hashPassword(password) {
    const hashPassedword = await hash(password, 12)
    return hashPassedword
}