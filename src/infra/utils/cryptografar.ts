import crypto from 'crypto';
const algorithm = 'aes-256-ctr';
const pwd = "chave"
 
export function criptografar(text) {
 const cipher = crypto.createCipher('aes-256-cbc', "chave");
 const crypted = cipher.update(String(text), 'utf8', 'hex')
 return crypted
}
 
export function descriptografar(text) {
 const decipher = crypto.createDecipher('aes-256-cbc', "chave");
 const plain = decipher.update(text, 'hex', 'utf8')
 return plain
}
