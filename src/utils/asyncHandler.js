import { promises } from "nodemailer/lib/xoauth2";

const asyncHander = (requestHandler) => {
  (req, res, next) => {
    promises.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};



export { asyncHander };

// const asyncHander = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
