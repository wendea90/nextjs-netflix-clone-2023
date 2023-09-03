'use client'

//this is home page
import CircleLoader from "@/src/components/circle-loader";
import CommonLayout from "@/src/components/common-layout";
import ManageAccounts from "@/src/components/manage-accounts";
import UnauthPage from "@/src/components/unauth-page";
import { GlobalContext } from "@/src/context";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import {
    getAllfavorites,
    // getAllfavorites,
    getPopularMedias,
    getTopratedMedias,
    getTrendingMedias,
} from "@/src/utils";

export default function Browse() {

    //check loggedIn account 
    const {
        loggedInAccount,
        mediaData,
        setMediaData,
        setPageLoader,
        pageLoader,
    } = useContext(GlobalContext);

    //if you are not logged in you go back to unauthoage(noting page) so every one not logg in access sign in page
    //create session & check if the session is null that means the user is not authenticated
    //todo do it in all pages so when you go to tv page http://localhost:3000/tv and others pages and you get sign in

    const { data: session } = useSession()

    console.log(session, 'session');

    //we will take use effect b/c we get data(tv series & movies) we are getting this data from a API b/c whenever i will be adding a particular TMDB movies inti our favorite so check wether the data is already added here/not so pass this current user id & based on that we are getting to updated data
    useEffect(() => {
        async function getAllMedias() {
            //get all 3 API endpoints from utils
            const trendingTvShows = await getTrendingMedias("tv");
            const popularTvShows = await getPopularMedias("tv");
            const topratedTvShows = await getTopratedMedias("tv");

            const trendingMovieShows = await getTrendingMedias("movie");
            const popularMovieShows = await getPopularMedias("movie");
            const topratedMovieShows = await getTopratedMedias("movie");

            //get allfav
            const allFavorites = await getAllfavorites(
                session?.user?.uid,
                loggedInAccount?._id
            );

            //how we are going to render - pass ever catagorys - catagorize all movies by 3(T,P,T) and define tv or movies
            setMediaData([
                ...[
                    {
                        title: "Trending TV Shows",
                        medias: trendingTvShows,
                    },
                    {
                        title: "Popular TV Shows",
                        medias: popularTvShows,
                    },
                    {
                        title: "Top rated TV Shows",
                        medias: topratedTvShows,
                    },
                ].map((item) => ({
                    ...item,
                    medias: item.medias.map((mediaItem) => ({
                        ...mediaItem,
                        type: "tv",
                        //add to fav
                        addedToFavorites:
                            allFavorites && allFavorites.length
                                ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) >
                                -1
                                : false,
                    })),
                })),
                ...[
                    {
                        title: "Trending Movies",
                        medias: trendingMovieShows,
                    },
                    {
                        title: "Popular Movies",
                        medias: popularMovieShows,
                    },
                    {
                        title: "Top rated Movies",
                        medias: topratedMovieShows,
                    },
                ].map((item) => ({
                    ...item,
                    medias: item.medias.map((mediaItem) => ({
                        ...mediaItem,
                        type: "movie",
                        //add to fav
                        addedToFavorites:
                            allFavorites && allFavorites.length
                                ? allFavorites.map((fav) => fav.movieID).indexOf(mediaItem.id) >
                                -1
                                : false,
                    })),
                })),
            ]);

            setPageLoader(false);
        }

        //we need to do we have to trigger this method
        getAllMedias();
    }, []);


    if (session === null) return <UnauthPage />;

    //check if this is logged in account is = to null
    if (loggedInAccount === null) return <ManageAccounts />;

    //check if this page loader is true we are going yo return..
    if (pageLoader) return <CircleLoader />;

    console.log(mediaData);

    return <main className="flex min-h-screen flex-col">
        <CommonLayout mediaData={mediaData} />
    </main>
}