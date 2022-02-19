import React, { useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { DataContext } from "../../DataContext/DataContext";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

export const SelectModal = () => {
    const { genres, setgenres } = useContext(DataContext);
    const handleSelectChange = (event) => {
        const {
            target: { value },
        } = event;
        setgenres(
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }}>
                <InputLabel style={{ marginTop: "10px", fontSize: "1.4rem", fontWeight: "bold" }}>FilterBy &nbsp;</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={genres}
                    onChange={handleSelectChange}
                    input={<OutlinedInput label="FilterBy" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    style={{ width: "20vw", height: "60%" }}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={genres.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </>
    )
}