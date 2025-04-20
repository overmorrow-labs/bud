import { Schema } from 'mongoose';
import { z } from 'zod';

// Mongoose Schema
export const userMongooseSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

// Zod Schema
export const userZodSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  age: z.number().min(0).max(150),
  createdAt: z.date().optional(),
  isActive: z.boolean().optional()
});
