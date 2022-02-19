

import React, { useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { Paginationdiv } from "../Components/Paginationdiv/Paginationdiv";
import { DataContext } from "../DataContext/DataContext";

export const Routing = () => {
    const { albumspage, setalbumspage, songspage, setsongspage } = useContext(DataContext);
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<>
                    <Paginationdiv type={"Albums"} pageno={albumspage} setpageno={setalbumspage} />
                    <Paginationdiv type={"Songs"} pageno={songspage} setpageno={setsongspage} />
                </>} />
                <Route path="/albums" />
                <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "30vh" }}>Incorrect Url Intered <Link to={"/"}> Click Here for Homepage</Link></h1>} />
            </Routes>
        </>
    )
}