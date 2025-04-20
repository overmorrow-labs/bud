import { Schema } from 'mongoose';
import { z } from 'zod';

// Mongoose Schema
export const productMongooseSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Zod Schema
export const productZodSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  description: z.string().min(10),
  category: z.string(),
  inStock: z.boolean().optional(),
  createdAt: z.date().optional()
});
