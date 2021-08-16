import { Request, Response, NextFunction } from 'express';
import { SchemaOf } from 'yup';

// eslint-disable-next-line @typescript-eslint/ban-types
export const validationMiddleware =
  (schema: SchemaOf<object>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = req.body;
    try {
      await schema.validate(data);
      next();
    } catch (err) {
      res.status(400).json({ error: err.errors.join(', ') });
    }
  };
