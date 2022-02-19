import React, { useContext } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DataContext } from "../../DataContext/DataContext";

export const SortModal = () => {
    const { sortby, setsortby } = useContext(DataContext)

    const handleSortChange = (event) => {
        setsortby(event.target.value);
    }
    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <InputLabel id="demo-simple-select-label" style={{ marginTop: "10px", fontSize: "1.4rem", fontWeight: "bold" }}>Sortby&nbsp;</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortby}
                    onChange={handleSortChange}
                    style={{ width: "10vw" }}
                >
                    <MenuItem value={"asc"}>Year - Low to High</MenuItem>
                    <MenuItem value={"desc"}>Year - High to Low</MenuItem>
                </Select>
            </div>
        </>
    )
}