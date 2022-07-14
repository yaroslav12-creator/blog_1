import { body } from 'express-validator';

// User validation
export const loginValidation = [
  body('email', 'Incorrect email of password').isEmail(),
  body('password', 'Incorrect email of password').isLength({ min: 5, max: 16 }),
];

export const registerValidation = [
  body('email', 'Incorrect email').isEmail(),
  body('password', 'Enter password with 5 to 16 symbols').isLength({ min: 5, max: 16 }),
  body('fullName', 'Enter your name (from 3 to 40 symbols)').isLength({ min: 3, max: 40 }),
  body('avatarUrl', 'Incprrect avatar link').optional().isURL(),
];

// Post validation
export const postCreateValidation = [
    body('title', 'Too short (min: 3)').isLength({ min: 3}).isString(),
    body('text', 'Enter some content (min: 5)').isLength({ min: 5, }).isString(),
    body('tags', 'Enter tags').optional().isString(),
    body('imageUrl', 'Incprrect image link').optional().isString(),
  ];

