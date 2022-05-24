import { PrismaClientError } from '../types/PrismaClientError';

export function isPrismaError(e: PrismaClientError) {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' || typeof e.meta === 'object')
  );
}
