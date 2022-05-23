import crypto from 'crypto';
const DADOS_CRIPTOGRAFAR = {
  algoritmo: 'aes256',
  segredo: 'chaves',
};

export function criptografar(senha: any) {
  const cipher = crypto.createCipher('aes256', DADOS_CRIPTOGRAFAR.segredo);
  cipher.update(senha);
  return cipher.final('hex');
}

export function descriptografar(senha: any) {
  const cipher = crypto.createDecipher('aes256', DADOS_CRIPTOGRAFAR.segredo);

  cipher.update(senha, 'hex');
  return String(cipher.final());
}
