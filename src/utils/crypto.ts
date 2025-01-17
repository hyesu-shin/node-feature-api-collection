import crypto from 'crypto';

export const encryptPW = (password: string, salt: string) => {
  const hashAlgorithm = crypto.createHash('sha512');
  const hashing: any = hashAlgorithm.update(`${password}${salt}`);
  return hashing.digest('unhex');
}