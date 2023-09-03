"use client";

//first create our context
import CircleLoader from '../components/circle-loader';
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    //for check if account exist/not
    const [loggedInAccount, setLoggedInAccount] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [pageLoader, setPageLoader] = useState(true);
    //create our main state for storing all the movies like tv series & movies -> and pass it to global context provider
    const [mediaData, setMediaData] = useState([]);
    //when user search eg-avater show result
    const [searchResults, setSearchResults] = useState([]);
    //when we click moreinfo buttun we need to get current media info so create state for that & pass it to globalcontext
    const [currentMediaInfoIdAndType, setCurrentMediaInfoIdAndType] =
        useState(null);
    //more info button clicked
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const [mediaDetails, setMediaDetails] = useState(null);
    //when you click more info & similar movie to show
    const [similarMedias, setSimilarMedias] = useState([]);
    //fav state
    const [favorites, setFavorites] = useState([]);

    //from circleloader
    const { data: session } = useSession();

    useEffect(() => {
        setLoggedInAccount(JSON.parse(sessionStorage.getItem("loggedInAccount")));
    }, []);

    if (session === undefined) return <CircleLoader />;

    return (
        <GlobalContext.Provider
            value={{
                loggedInAccount,
                setLoggedInAccount,
                accounts,
                setAccounts,
                pageLoader,
                mediaData,
                setMediaData,
                setPageLoader,
                searchResults,
                setSearchResults,
                currentMediaInfoIdAndType,
                setCurrentMediaInfoIdAndType,
                showDetailsPopup,
                setShowDetailsPopup,
                mediaDetails,
                setMediaDetails,
                similarMedias,
                setSimilarMedias,
                favorites,
                setFavorites,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

//pass GlobalState in app -> layout.js as children

//todo import { createContext } from 'react';:
// This line imports the createContext function from the 'react' package.The createContext function is used to create a new context object that can be used to share state across components.
//todo export const GlobalContext = createContext(null);:
// This line creates a new context object called GlobalContext using the createContext function. The initial value of the context is set to null.
//todo export default function GlobalState({ children }) { ... }:
// This line exports a React component called GlobalState as the default export. The component takes a single prop called children, which represents the child components that will be wrapped by this component.
//todo  return < GlobalContext.Provider value = {{ }}> { children }</ >:
// This is the JSX syntax used in React.The GlobalState component returns a JSX expression that wraps the children components with the GlobalContext.Provider component.The Provider component is responsible for providing the context value to its descendants.In this case, it is passing an empty object as the value prop to the provider.