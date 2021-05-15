import { createCipheriv, createDecipheriv } from 'crypto';

const ENC_KEY = 'bf3c199c2470cb477d907b1e0917c17b'; // set random encryption key
const IV = '5183666c72eec9e4'; // set random initialisation vector

export const encrypt = (val): string => {
  let cipher = createCipheriv('aes-256-cbc', ENC_KEY, IV);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
};

export const decrypt = (encrypted): string => {
  let decipher = createDecipheriv('aes-256-cbc', ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return decrypted + decipher.final('utf8');
};
