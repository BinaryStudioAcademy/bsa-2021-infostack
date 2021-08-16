import { Request, Response, NextFunction } from 'express';
import { SchemaOf } from 'yup';

export const validationMiddleware =
  (schema: SchemaOf<Record<string, string>>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = req.body;
    try {
      await schema.validate(data);
      next();
    } catch (err) {
      res.status(400).json({ error: err.errors.join(', ') });
    }
  };
