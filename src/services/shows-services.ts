import { ResponseType } from '../models/ResponseType';
import { IShow } from '../models/IShow';
import { IShowDetail } from '../models/IShowDetail';
import { fetchData } from '../utilities/httpClient.js';

export const listShows = async (): Promise<ResponseType> => {
  const response = await fetchData('discover/tv');
  return mapData(response);
};

export const searchShows = async (filter: string): Promise<ResponseType> => {
  if (filter) {
    const response = await fetchData(`search/tv?query=${filter}`);
    return mapData(response);
  } else {
    return listShows();
  }
};

export const findShow = async (id: string): Promise<IShowDetail> => {
  return await fetchData(`tv/${id}`);
};

const mapData = (response: any): ResponseType => {
  const result: ResponseType = {
    page: response.page,
    totalPages: response.total_pages,
    results: response.results as IShow[],
  };

  return result;
};
