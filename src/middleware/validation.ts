import { body, ValidationChain, validationResult } from "express-validator";
import { invalidInput } from "../../messages/fail_msg";

export const rules = () => {
  return [
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 6 }),
  ];
};

export const validate = (req: any, res: any, next: any) => {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  }
  return res.status(422).json(invalidInput());
};
