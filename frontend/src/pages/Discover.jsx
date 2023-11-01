import { genres } from "../assets/constants"
import { Loader } from "../components";
import SongCard from "../components/SongCard"
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
import DiscoverSkeleton from "../components/DiscoverSkeleton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import axios from "axios";

const Discover = () => {

    const despatch = useDispatch();
    const activeSong = useSelector((state) => { return state.persistedReducer.player.activeSong });
    const isPlaying = useSelector((state) => { return state.persistedReducer.player.isPlaying })
    const { data, isFetching, error } = useGetTopChartsQuery();

    const [filtered, setFiltered] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [isSign, setIsSign] = useState(false);
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleConfPassword = (e) => {
        setConfPassword(e.target.value);
    }
    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setTimeout(() => window.scrollTo(0, 0), 1000);
        if (localStorage.getItem('token')) {
            setOpen(false);
        }
    }, [localStorage, isLogged, message, isSign])

    const handleGenre = (e) => {
        console.log(e.target.value);
    }
    const [open, setOpen] = React.useState(true);
    const [openSign, setOpenSign] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleLogin = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login',
                {
                    username: username,
                    password: password
                });
            console.log(response.message);
            localStorage.setItem('token', response.data.token);
            if (localStorage.getItem('token')) {
                setOpen(false);
                setIsLogged(true);
            }
        } catch (err) {
            setMessage(err.response.data.message);
        }
    }
    const handleSignUp = async (username, password, confPassword) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/register',
                {
                    username: username,
                    password: password,
                    confPassword: confPassword
                });
            if (response.status === 200) {
                setOpenSign(false);
                setIsSign(true);
            }
        }
        catch (err) {
            setMessage(err.response.data.message);
        }
    }
    const handleCloseSign = (event, reason) => {
        if (reason === "backdropClick") {
            setOpenSign(true);
        }
        else {
            setOpenSign(false);
        }
    }
    const handleClose = (event, reason) => {
        if (reason === "backdropClick") {
            setOpen(true);
        }
        else {
            setOpen(false);
        }
    };

    if (isFetching) return (<><DiscoverSkeleton /></>)
    if (error) return (<DiscoverSkeleton />)

    return (
        <div className="flex flex-col px-10 pt-6">
            <div className="w-full flex justify-between items-center sm:flex-row 
            flex-col mt-4 mb-10">
                <Link to={`/search`}>
                    <h2 className="font-bold text-3xl text-white ">Discover</h2>
                </Link>

            </div>
            <Dialog open={open} onClose={handleClose} disableEscapeKeyDown={true} sx={{ color: "#333" }}>
                <DialogTitle style={{ textAlign: "center" }}>Login to continue</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To continue using MixTape please login
                    </DialogContentText>
                    <div style={{ marginTop: "20px" }}>
                        <h3 className="text-red-600">{message}</h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "40px", marginBottom: "40px" }}>
                        <TextField
                            onChange={handleUsername}
                            id="username"
                            label="Username"
                            type="text"
                        />
                        <TextField
                            onChange={handlePassword}
                            id="password"
                            label="Password"
                            type="password"
                        />
                    </div>
                    <Button onClick={() => {
                        setOpen(false);
                        setOpenSign(true);
                        setMessage('');
                    }}>Create account if you dont have</Button>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center", paddingBottom: "30px" }}>
                    <Button onClick={() => handleLogin(username, password)} variant="contained">Login</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openSign} onClose={handleCloseSign} disableEscapeKeyDown={true} sx={{ color: "#333" }}>
                <DialogTitle style={{ textAlign: "center" }}>Signup to continue</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create account to continue using MixTape
                    </DialogContentText>
                    <div style={{ marginTop: "20px" }}>
                        <h3 className="text-red-600">{message}</h3>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "40px", marginBottom: "40px" }}>
                        <TextField
                            onChange={handleUsername}
                            id="username"
                            label="Username"
                            type="text"
                        />
                        <TextField
                            onChange={handlePassword}
                            id="password"
                            label="Password"
                            type="password"
                        />
                        <TextField
                            onChange={handleConfPassword}
                            id="password"
                            label="Confirm password"
                            type="password"
                        />
                    </div>
                    <Button onClick={() => {
                        setOpen(true);
                        setOpenSign(false);
                        setMessage('');
                    }}>Login if you already have account</Button>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center", paddingBottom: "30px" }}>
                    <Button onClick={() => handleSignUp(username, password, confPassword)} variant="contained">Signup</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={isLogged} autoHideDuration={6000} onClose={() => setIsLogged(false)}>
                <Alert variant="filled" onClose={() => { setIsLogged(false) }} severity="success" sx={{ width: '100%' }}>
                    You logged in successfully
                </Alert>
            </Snackbar>
            <Snackbar open={isSign} autoHideDuration={6000} onClose={() => setIsSign(false)}>
                <Alert variant="filled" onClose={() => { setIsSign(false) }} severity="success" sx={{ width: '100%' }}>
                    You created account successfully
                </Alert>
            </Snackbar>

            <div className="flex flex-wrap sm:justify-start justify-center gap-10">
                {data?.tracks.map((song, i) => {
                    return (
                        <SongCard song={song} key={song.key}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            i={i}
                            data={data.tracks} />
                    )
                })
                }
            </div>
        </div>
    );
}

export default Discover;
