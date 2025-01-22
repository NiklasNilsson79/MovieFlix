export const listShows = async () => {
    const key = 'c225640b9109317dc84c9f661f0ca0ba';
    const url = `https://api.themoviedb.org/3/discover/tv?page=1&api_key=${key}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const body = await response.json();
            const shows = body.results;
            return shows;
        }
        else {
            throw new Error(response.status.toString());
        }
    }
    catch (error) {
        throw new Error(error);
    }
};
export const searchShows = async (filter) => {
    if (filter) {
        const key = 'c225640b9109317dc84c9f661f0ca0ba';
        const url = `https://api.themoviedb.org/3/search/tv?query=${filter}&api_key=${key}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const body = await response.json();
                const shows = body.results;
                return shows;
            }
            else {
                throw new Error('Det gick galet!');
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    else {
        return listShows();
    }
};
export const findShow = async (id) => {
    const key = 'c225640b9109317dc84c9f661f0ca0ba';
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${key}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const body = await response.json();
            const show = body;
            return show;
        }
        else {
            throw new Error(response.status.toString());
        }
    }
    catch (error) {
        throw new Error(error);
    }
};
