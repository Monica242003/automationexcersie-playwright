import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const envConfig = {
  defaultPassword: process.env.DEFAULT_PASSWORD || 'Pass1234!',
  wrongPassword: process.env.WRONG_PASSWORD || 'WrongPass!',
  cardNumber: process.env.CARD_NUMBER || '1234567890123456',
  cardCvc: process.env.CARD_CVC || '311',
  cardExpMonth: process.env.CARD_EXP_MONTH || '12',
  cardExpYear: process.env.CARD_EXP_YEAR || '2030',
  emailPrefix: process.env.DYNAMIC_EMAIL_PREFIX || 'autotest',
  emailDomain: process.env.DYNAMIC_EMAIL_DOMAIN || 'example.com'
};
