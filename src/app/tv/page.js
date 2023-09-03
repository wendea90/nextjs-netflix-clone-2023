'use client'

import CircleLoader from "@/src/components/circle-loader";
import CommonLayout from "@/src/components/common-layout";
import ManageAccounts from "@/src/components/manage-accounts";
import UnauthPage from "@/src/components/unauth-page";
import { GlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { getAllfavorites, getTVorMoviesByGenre } from "@/src/utils";


export default function TV() {

    const { data: session } = useSession();

    //check loggedIn account 
    const {
        loggedInAccount,
        mediaData,
        setMediaData,
        setPageLoader,
        pageLoader,
    } = useContext(GlobalContext);

    //create another endpoint to get all the TV shows or the movie by genre - adventure, romance, thriller, crime...
    //todo so go to utils and create another endpoints useeffect get(catch the endpoint from utils->index.js)

    useEffect(() => {
        async function getAllMedias() {
            const actionAdventure = await getTVorMoviesByGenre("tv", 10759);
            const crime = await getTVorMoviesByGenre("tv", 80);
            const comedy = await getTVorMoviesByGenre("tv", 35);
            const family = await getTVorMoviesByGenre("tv", 10751);
            const mystery = await getTVorMoviesByGenre("tv", 9648);
            const reality = await getTVorMoviesByGenre("tv", 10764);
            const scifiAndFantasy = await getTVorMoviesByGenre("tv", 10765);
            const war = await getTVorMoviesByGenre("tv", 10768);
            const western = await getTVorMoviesByGenre("tv", 37);
            const dramaMovies = await getTVorMoviesByGenre("tv", 18);

            const allFavorites = await getAllfavorites(
                session?.user?.uid,
                loggedInAccount?._id
            );

            setMediaData(
                [
                    {
                        title: "Action and adventure",
                        medias: actionAdventure,
                    },
                    {
                        title: "Crime",
                        medias: crime,
                    },
                    {
                        title: "Comedy",
                        medias: comedy,
                    },
                    {
                        title: "Family",
                        medias: family,
                    },
                    {
                        title: "Mystery",
                        medias: mystery,
                    },
                    {
                        title: "Reality",
                        medias: reality,
                    },
                    {
                        title: "Sci-Fi and Fantasy",
                        medias: scifiAndFantasy,
                    },
                    {
                        title: "Western",
                        medias: western,
                    },
                    {
                        title: "War",
                        medias: war,
                    },
                    {
                        title: "Dramas",
                        medias: dramaMovies,
                    },
                ].map((item) => ({
                    ...item,
                    medias: item.medias.map((mediaItem) => ({
                        ...mediaItem,
                        type: "tv",
                        //from media-item to get data(movie)
                        addedToFavorites:
                            allFavorites && allFavorites.length
                                ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) >
                                -1
                                : false,
                    })),
                }))
            );
            setPageLoader(false);
        }

        getAllMedias();
    }, [loggedInAccount]);

    if (session === null) return <UnauthPage />
    //check if this is logged in account is = to null
    if (loggedInAccount === null) return <ManageAccounts />

    if (pageLoader) return <CircleLoader />;

    return (
        <main className="flex min-h-screen flex-col">
            <CommonLayout mediaData={mediaData} />
        </main>
    );
}