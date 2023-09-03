const API_KEY = "cfe8403b6c1d910bda494c61576c8349";
const BASE_URL = "https://api.themoviedb.org/3";

//type- tv / movies 3 API endpoint that we need trending,toprelated, popular
export const getTrendingMedias = async (type) => {
    try {
        const res = await fetch(
            `${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
};

export const getTopratedMedias = async (type) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
};

export const getPopularMedias = async (type) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
};

//todo create another API endpoint to get all the TV shows or the movie by genre - adventure, romance, thriller, crime... tv->page.js

export const getTVorMoviesByGenre = async (type, id) => {
    try {
        const res = await fetch(
            `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${id}`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
};

//API endpoint for watch movies/video
export const getTVorMovieVideosByID = async (type, id) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};

//API endpoint for searchbar for movies
export const getTVorMovieSearchResults = async (type, query) => {
    try {
        const res = await fetch(
            `${BASE_URL}/search/${type}?api_key=${API_KEY}&include_adult=false&language=en-US&query=${query}`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
};

//we need API calls for 1.get movies / tv series 2.similar movies. details-popup -> index.js
// 1.get movies
export const getTVorMovieDetailsByID = async (type, id) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};

//2.similar movies
export const getSimilarTVorMovies = async (type, id) => {
    try {
        const res = await fetch(
            `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.results;
    } catch (e) {
        console.log(e);
    }
};

//api to getAllfavorites in my list
export const getAllfavorites = async (uid, accountID) => {
    try {
        const res = await fetch(
            `/api/favorites/get-all-favorites?id=${uid}&accountID=${accountID}`,
            {
                method: "GET",
            }
        );

        const data = await res.json();

        return data && data.data;
    } catch (e) {
        console.log(e);
    }
};
