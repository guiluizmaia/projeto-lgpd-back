import crypto from 'crypto';
const algorithm = 'aes-256-ctr';
const pwd = 'chave';

export function criptografar(text: any) {
  const cipher = crypto.createCipher('aes-256-ctr', 'chave');
  const crypted = cipher.update(text, 'utf8', 'hex');
  console.log(crypted);

  return crypted;
}

export function descriptografar(text: any) {
  const decipher = crypto.createDecipher('aes-256-ctr', 'chave');
  const plain = decipher.update(text, 'hex', 'utf8');
  return plain;
}
