import { fetchData } from '../utilities/httpClient.js';
export const listShows = async () => {
    const response = await fetchData('discover/tv');
    return mapData(response);
};
export const searchShows = async (filter) => {
    if (filter) {
        const response = await fetchData(`search/tv?query=${filter}`);
        return mapData(response);
    }
    else {
        return listShows();
    }
};
export const findShow = async (id) => {
    return await fetchData(`tv/${id}`);
};
const mapData = (response) => {
    const result = {
        page: response.page,
        totalPages: response.total_pages,
        results: response.results,
    };
    return result;
};
