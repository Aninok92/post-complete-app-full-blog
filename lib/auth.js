import { hash, compare } from 'bcryptjs'

export async function hashPassword(password) {
    const hashPassedword = await hash(password, 12)
    return hashPassedword
}

export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword)
}