import { nanoid } from 'nanoid';
import { randomBytes, scrypt } from 'crypto';

export function generateRandomString(size = 20) {
  return nanoid(size);
}

export async function generateSaltedHash(input: string, salt?: string) {
  const saltValue = salt || randomBytes(8).toString('hex');
  const hash = await new Promise<Buffer>((resolve, reject) => {
    scrypt(input, saltValue, 32, (error, derivedKey) => {
      if (error) {
        reject(error);
      }

      resolve(derivedKey);
    });
  });
  return `${saltValue}:${hash.toString('hex')}`;
}
