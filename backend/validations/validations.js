import { body } from "express-validator";

export const docxCreatingValidation = [
  body("numberOfDocument", "Invalid numberOfDocument.").isLength({ min: 3 }),
  body("password", "Password not less than 5 characters").isLength({ min: 5 }),
];
