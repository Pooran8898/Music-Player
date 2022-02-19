import React, { useState } from "react";
import "./Paginationdiv.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import temporarydata from "./tempdata";
import { shortenName } from "../../utils/shortnames";
import { SelectModal } from "../SelectModal/SelectModal";
import { SortModal } from "../SortModal/SortModal";
// import { DataContext } from "../../DataContext/DataContext";

export const Paginationdiv = ({ type, pageno, setpageno }) => {
    const [maxpage, setmaxpage] = useState(10);
    const [dataarr, setdataarr] = useState(temporarydata);
    //const {isArtist} = useContext(DataContext)
    return (
        <div className="paginationContainer">
            <div className="resultsContainer">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 style={{ fontSize: "2.5rem" }}>{type}</h1>
                    {type === "Albums" && <SortModal />}
                    {type === "Albums" && <SelectModal />}
                </div>
                <div className="resultsDiv">
                    {dataarr.length > 0 && dataarr.map((el) => {
                        return <div className="eachAlbumContainer">
                            <img src={el.albumcover} alt="Album cover" />
                            <h4>{shortenName(el.albumname)}</h4>
                        </div>
                    })}
                </div>
            </div>
            <div className="paginationDiv">
                <h4>Page</h4>
                <AiFillCaretLeft onClick={() => pageno > 1 ? setpageno(pageno - 1) : alert("No pages behind")} />
                <h3>{pageno}</h3>
                <AiFillCaretRight onClick={() => pageno < maxpage ? setpageno(pageno + 1) : alert("No pages Ahead")} />
            </div>
        </div>
    )
}