import Email from '../models/email.js';

export const createEmail = async (data) => Email.create(data);

