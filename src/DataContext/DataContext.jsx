
import React, { createContext, useEffect, useState } from "react";
import { useNavigate, createSearchParams, useLocation, useSearchParams } from "react-router-dom";


export const DataContext = createContext();



export const DataContextProvider = ({ children }) => {
    const [isArtist, setisArtist] = useState(false);
    const [artistid, setartistid] = useState("");
    const [sortby, setsortby] = useState("");
    const [genres, setgenres] = useState([]);
    const [updateparam, setupdateparams] = useState({});
    const [searchParams] = useSearchParams();
    const [albumspage, setalbumspage] = useState(1);
    const [songspage, setsongspage] = useState(1);
    const history = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setupdateparams({ sort: sortby, genre: genres.join(","), albumspage, songspage });
    }, [sortby, genres, albumspage, songspage])

    useEffect(() => {
        if (updateparam.sort !== undefined && updateparam.sort.length > 0 && updateparam.genre !== undefined && updateparam.genre.length > 0) {
            history({
                pathname: location.pathname,
                search: `?${createSearchParams({ ...updateparam, albumspage, songspage })}`
            });
        }
        else if (updateparam.sort !== undefined && updateparam.sort.length > 0) {
            history({
                pathname: location.pathname,
                search: `?${createSearchParams({ sort: updateparam.sort, albumspage, songspage })}`
            });
        }
        else if (updateparam.genre !== undefined && updateparam.genre.length > 0) {
            history({
                pathname: location.pathname,
                search: `?${createSearchParams({ genre: updateparam.genre, albumspage, songspage })}`
            });
        }
        else {
            history({
                pathname: location.pathname,
                search: `?${createSearchParams({ albumspage, songspage })}`
            });
        }
    }, [updateparam, albumspage, songspage, history])

    useEffect(() => {
        let tempsort = searchParams.get("sort");
        let tempgenre = searchParams.get("genre");
        let tempalbumspage = searchParams.get("albumspage");
        let tempsongspage = searchParams.get("songspage");
        if (tempsort !== null) {
            setsortby(tempsort);
        }
        if (tempgenre !== null && tempgenre !== undefined) {
            tempgenre = tempgenre.split(":");
            setgenres(tempgenre);
        }
        if (tempsongspage !== null) {
            setsongspage(Number(tempsongspage));
        }
        if (tempalbumspage !== null) {
            setalbumspage(Number(tempalbumspage));
        }
    }, [])

    return <DataContext.Provider value={{ isArtist, setisArtist, sortby, setsortby, genres, setgenres, albumspage, setalbumspage, songspage, setsongspage, artistid, setartistid }}>
        {children}
    </DataContext.Provider>
}