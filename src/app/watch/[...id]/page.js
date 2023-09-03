"use client";

import CircleLoader from "@/src/components/circle-loader";
import { GlobalContext } from "@/src/context";
import { getTVorMovieVideosByID } from "@/src/utils";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

export default function Watch() {
    //state
    const [mediaDetails, setMediaDetails] = useState(null);
    const [key, setKey] = useState(null);

    const params = useParams();

    //get loaders from GC/UC
    const { pageLoader, setPageLoader } = useContext(GlobalContext);

    useEffect(() => {
        async function getMediaDetails() {
            const extractMediaDetails = await getTVorMovieVideosByID(
                params.id[0],
                params.id[1]
            );

            //if this true check if any trailer exist or not if trailer exist show trailer if clip exist show clip otherwise show random video
            if (extractMediaDetails) {
                const findIndexOfTrailer = extractMediaDetails.results?.findIndex(
                    (item) => item.type === "Trailer"
                );

                //if clip exist show clip
                const findIndexOfClip = extractMediaDetails.results?.findIndex(
                    (item) => item.type === "Clip"
                );

                setMediaDetails(extractMediaDetails);
                setKey(
                    findIndexOfTrailer !== -1
                        ? extractMediaDetails.results[findIndexOfTrailer]?.key
                        : findIndexOfClip !== -1
                            ? extractMediaDetails.results[findIndexOfClip]?.key
                            //otherwise show random video
                            : "XuDwndGaCFo"
                );

                setPageLoader(false);
            }

            console.log(extractMediaDetails);
        }

        getMediaDetails();
        //params means id&type from local host
    }, [params]);

    if (pageLoader && mediaDetails === null) return <CircleLoader />;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${key}`}
                width={"100%"}
                height={"100%"}
                style={{ position: "absolute", top: "0", left: "0" }}
                playing
                controls
            />
        </motion.div>
    );
}
