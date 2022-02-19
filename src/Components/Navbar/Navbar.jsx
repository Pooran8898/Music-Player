
import React, { useContext, useState } from "react";
import "./Navbar.css";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { DataContext } from "../../DataContext/DataContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40vw",
    height: "80vh",
    bgcolor: 'white',
    borderRadius: 6,
    p: 4,
};

let initstate = {
    firstname: "",
    lastname: "",
    username: "",
    artistcoverlink: "",
    email: "",
    password: ""
}

export const Navbar = () => {
    const [modal, setmodal] = useState(false);
    const [modaltype, setmodaltype] = useState("");
    const { isArtist, artistid, setartistid, setisArtist } = useContext(DataContext);
    const [formdata, setformdata] = useState(initstate);

    const handleNavbar = (event) => {
        let currentid = event.target.id;
        if (currentid === "" || currentid === undefined) {
            return
        }
        else if ((currentid === "login" && isArtist === false) || (currentid === "artistpage" && isArtist === false) || (currentid === "signup" && isArtist === false)) {
            setmodal(true);
            setmodaltype(currentid);
            setformdata(initstate);
        }
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setformdata({
            ...formdata,
            [name]: value
        })
    }

    const handlesignup = async () => {
        if (formdata.firstname.length === 0 || formdata.lastname.length === 0 || formdata.artistcoverlink.length === 0 || formdata.email.length === 0 || formdata.password.length === 0 || formdata.username.length === 0) {
            return alert("Please Fill All the Details");
        }
        else {
            axios.post("http://localhost:4000/artistpage/signup", formdata).then((response) => {
                setisArtist(true);
                setartistid(response.data);
            }).catch((err) => {
                alert("Please Submit details Correctly");
            })
            setformdata(initstate);
            setmodal(false);
            setmodaltype("");
        }
    }

    const handlelogin = () => {
        if (formdata.email.length === 0 || formdata.password.length === 0) {
            return alert("Fill all the details");
        }
        else {
            axios.post("http://localhost:4000/artistpage/login", { email: formdata.email, password: formdata.password }).then((response) => {
                setisArtist(true);
                setartistid(response.data);
            }).catch((err) => {
                alert("Please Submit details Correctly");
            })
            setformdata(initstate);
            setmodal(false);
            setmodaltype("");
        }
    }

    return (
        <>
            <div className="navbarContainer" onClick={(event) => handleNavbar(event)}>
                <h3>
                    <Link to={"/"}>
                        Home
                    </Link>
                </h3>
                <h3>Browse</h3>
                <h3>Upgrade</h3>
                <h3 id="login">Login</h3>
                <h3 id="signup">Sign Up</h3>
                <h3>
                    <Link to={isArtist ? `/artistpage/${artistid._id}` : "#"} id="artistpage">
                        Artist Page
                    </Link>
                </h3>
                <div className="searchContainer">
                    <BsSearch className="searchLogo" />
                    <input type="text" className="searchInput" placeholder="Search for Artist's Album" />
                </div>
                <Modal open={modal} onClose={() => setmodal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
                >
                    {modaltype === "signup" ?
                        <>
                            <Box sx={style} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", overflow: "scroll", scrollBehavior: "smooth" }} className="modalmain">
                                <h1 style={{ margin: "0px", padding: "0" }}>{modaltype.toUpperCase()}</h1>
                                <TextField variant="outlined" label="Firstname" name="firstname" style={{ backgroundColor: "#f7f6f7", width: "60%", marginTop: "20px" }} value={formdata.firstname} onChange={(event) => handleInput(event)} />
                                <TextField variant="outlined" label="Lastname" name="lastname" style={{ backgroundColor: "#f7f6f7", width: "60%", marginTop: "20px" }} value={formdata.lastname} onChange={(event) => handleInput(event)} />
                                <TextField variant="outlined" label="Username" name="username" style={{ backgroundColor: "#f7f6f7", width: "60%", marginTop: "20px" }} value={formdata.username} onChange={(event) => handleInput(event)} />
                                <TextField variant="outlined" label="Email" name="email" value={formdata.email} style={{ backgroundColor: "#f7f6f7", width: "60%", marginTop: "20px" }} onChange={(event) => handleInput(event)} />
                                <TextField variant="outlined" label="Password" name="password" value={formdata.password} style={{ backgroundColor: "#f7f6f7", width: "60%", marginTop: "20px" }} onChange={(event) => handleInput(event)} />
                                <TextField variant="outlined" label="Coverimage Link" name="artistcoverlink" value={formdata.artistcoverlink} style={{ backgroundColor: "#f7f6f7", width: "60%", marginTop: "20px" }} onChange={(event) => handleInput(event)} />
                                <Button variant="outlined" size="large" onClick={handlesignup} style={{ marginTop: "20px" }}>Signup</Button>
                            </Box>
                        </> :
                        <>
                            <Box sx={style} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", overflow: "scroll", scrollBehavior: "smooth", justifyContent: "center" }} className="modalmain">
                                <h1 style={{ margin: "0", padding: "0" }}>LOGIN</h1>
                                <TextField variant="outlined" label="Email" style={{ backgroundColor: "#f7f6f7", width: "60%", marginTop: "20px" }} name="email" value={formdata.email} onChange={(event) => handleInput(event)} />
                                <TextField variant="outlined" label="Password" style={{ backgroundColor: "#f7f6f7", width: "60%", marginTop: "20px" }} value={formdata.password} name="password" onChange={(event) => handleInput(event)} />
                                <Button variant="outlined" onClick={handlelogin} size="large" style={{ marginTop: "20px" }}>Login</Button>
                            </Box>
                        </>
                    }
                </Modal>
            </div>
        </>
    )
}