import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const hashPassedword = await hash(password, 12);
  return hashPassedword;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isValid = await compare(password, hashedPassword);

  return isValid;
}
