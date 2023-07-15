/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';

export interface Movie {
  ref: string;
  users: string[];
}

export const MovieSchema = new Schema<Movie>({
  ref: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const MovieModel = model<Movie>('Movie', MovieSchema);