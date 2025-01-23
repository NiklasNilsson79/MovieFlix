import { ResponseType } from '../models/ResponseType';
import { IMovie } from '../models/IMovie';
import { IMovieDetail } from '../models/IMovieDetail';
import { fetchData } from '../utilities/httpClient.js';

export const listMovies = async (page: number = 1): Promise<ResponseType> => {
  const response = await fetchData('discover/movie', page);

  return mapData(response);
};

export const searchMovies = async (
  filter: string,
  page: number = 1
): Promise<ResponseType> => {
  if (filter) {
    const response = await fetchData('search/movie', page, filter);

    return mapData(response);
  } else {
    return listMovies();
  }
};

export const findMovie = async (id: string): Promise<IMovieDetail> => {
  // const response = await fetchData(`movie/${id}`);
  // return response;
  return await fetchData(`movie/${id}`);
};

const mapData = (response: any): ResponseType => {
  const result: ResponseType = {
    page: response.page,
    totalPages: response.total_pages,
    results: response.results as IMovie[],
  };

  return result;
};
