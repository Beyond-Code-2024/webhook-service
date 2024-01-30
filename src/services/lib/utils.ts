import { nanoid } from 'nanoid';

export function generateRandomString(size = 20) {
    return nanoid(size);
}
