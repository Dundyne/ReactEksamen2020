import { emailService, userService } from '../services/index.js';
import { sendMail } from '../utils/sendEmail.js';
import catchAsyncErrors from '../middleware/catchAsync.js';

export const sendMails = catchAsyncErrors(async(req, res, next) => {
  
    const user = await userService.getUserById(req.user.id);
        req.body.email = user.email
      const email = await emailService.createEmail(req.body);
      
    try{
        await sendMail(email);
      }
    catch(error) {
      console.log(error);
    }
    res.status(250).json();
  });