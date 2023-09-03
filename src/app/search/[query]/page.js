"use client";

import CircleLoader from "@/src/components/circle-loader";
import ManageAccounts from "@/src/components/manage-accounts";
import UnauthPage from "@/src/components/unauth-page";
import { GlobalContext } from "@/src/context";
import { getAllfavorites, getTVorMovieSearchResults } from "@/src/utils";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/src/components/navbar";
import MediaItem from "@/src/components/media-item";

export default function Search() {
    //check loggedIn account 
    const {
        loggedInAccount,
        searchResults,
        pageLoader,
        setPageLoader,
        setSearchResults,
    } = useContext(GlobalContext);

    const { data: session } = useSession();
    //params means get the id of movie / type of movie-tv/movie
    const params = useParams();

    useEffect(() => {
        async function getSearchResults() {
            //serching for TV by calling API endpoint
            const tvShows = await getTVorMovieSearchResults("tv", params.query);
            //serching for movies by calling API endpoint
            const movies = await getTVorMovieSearchResults("movie", params.query);

            const allFavorites = await getAllfavorites(
                session?.user?.uid,
                loggedInAccount?._id
            );

            //todo serach results by tv & movie
            setSearchResults([
                ...tvShows
                    .filter(
                        (item) => item.backdrop_path !== null && item.poster_path !== null
                    )
                    .map((tvShowItem) => ({
                        ...tvShowItem,
                        type: "tv",
                        addedToFavorites:
                            allFavorites && allFavorites.length
                                ? allFavorites
                                    .map((fav) => fav.movieID)
                                    .indexOf(tvShowItem.id) > -1
                                : false,
                    })),
                ...movies
                    .filter(
                        (item) => item.backdrop_path !== null && item.poster_path !== null
                    )
                    .map((movieItem) => ({
                        ...movieItem,
                        type: "movie",
                        addedToFavorites:
                            allFavorites && allFavorites.length
                                ? allFavorites.map((fav) => fav.movieID).indexOf(movieItem.id) >
                                -1
                                : false,
                    })),
            ]);
            setPageLoader(false);
            console.log(tvShows, movies);
        }

        getSearchResults();
    }, [loggedInAccount]);

    if (session === null) return <UnauthPage />;
    //check if this is logged in account is = to null
    if (loggedInAccount === null) return <ManageAccounts />;
    //if this pageloader is true return circleloader
    if (pageLoader) return <CircleLoader />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <Navbar />
            <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
                <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
                    Showing Results for {decodeURI(params.query)}
                </h2>
                <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
                    {/* render searchResults */}
                    {searchResults && searchResults.length
                        ? searchResults.map((searchItem) => (
                            <MediaItem
                                key={searchItem.id}
                                media={searchItem}
                                searchView={true}
                            />
                        ))
                        : null}
                </div>
            </div>
        </motion.div>
    );
}
