/* eslint-disable prettier/prettier */
import { Model, Schema, model } from 'mongoose';

export interface Movie {
  ref: string;
  users: string[];
}

export const MovieSchema = new Schema<Movie>({
  ref: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export interface MovieModel extends Model<Movie> {
  findUserById(id: string): Promise<Movie | null>;
  findMovieByRef(ref: string): Promise<Movie | null>;
}

MovieSchema.statics.findMovieById = function (id: string) {
  return this.findById(id).exec();
};

MovieSchema.statics.findMovieByRef = function (ref: string) {
  return this.findOne({ ref }).exec();
};

export const MovieModel = model<Movie, MovieModel>('Movie', MovieSchema);