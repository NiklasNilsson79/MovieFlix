import { IMovie } from './IMovie';
import { IShow } from './IShow';

export type ResponseType = {
  page: number;
  results: IMovie[] | IShow[];
  totalPages: number;
};
