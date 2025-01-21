export interface IShow {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  runtime: number;
  vote_average: number;
  overview: string;
  genre_ids: [{ name: string }];
  backdrop_path: string;
}
