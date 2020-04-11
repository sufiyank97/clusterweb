import React, { useState } from 'react'
import './home.css'
import { useForm } from 'react-hook-form'
import { BrowserRouter, Link, Route, Switch, NavLink } from 'react-router-dom'
import axios from 'axios'
import CP1 from './Pages/CP1/cp1'
import Admin from './Pages/CP1/admin'
import { Modal, Button } from 'react-bootstrap'
const Home = () => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const { handleSubmit, register } = useForm()
    const [userData, getData] = useState({})
    const onSubmit = (data1, e) => {
        const runFun = async () => {
            const res = await axios.get('http://localhost:4000/user')
            console.log(res.data)
            const user = res.data
            if (data1.userName === user.username && data1.pwd === user.password) {
                getData(data1)
                localStorage.setItem('token', 'login')
                handleClose()
            } else {
                window.alert('incorrct User')
            }
        }
        runFun()
    }
    const handleLogout = () => {
        const logOut = () => {
            localStorage.removeItem('token')
            getData({})
        }
        logOut()
    }
    return (
        <BrowserRouter>
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light py-4" style={{ boxShadow: '0 0.1rem 0.4rem rgba(0, 0, 0, 0.15)' }}>
                    <a className="navbar-brand" href="#">LOGO</a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ">

                            <NavLink to="/cp1" activeClassName="active" className="navlink">CP1</NavLink>
                            <NavLink to="/cp2" activeClassName="active" className="navlink">CP2</NavLink>
                            <NavLink to="/cp3" activeClassName="active" className="navlink">CP3</NavLink>
                            <NavLink to="/admin" activeClassName="active" className="navlink">Admin</NavLink>

                        </div>
                        {
                            (localStorage.getItem('token') ? (
                                <ul className="navbar-nav ml-auto nav-flex-icons">
                                    <li className="nav-item">
                                        <button className="btn btn-danger" onClick={handleLogout}>Log out</button>
                                    </li>
                                </ul>
                            ) : (
                                    <ul className="navbar-nav ml-auto nav-flex-icons">
                                        <li className="nav-item">
                                            <button className="btn btn-primary" onClick={handleShow}>Login</button>
                                        </li>
                                    </ul>
                                ))
                        }

                    </div >
                </nav >
                {
                    (localStorage.getItem('token') ? (
                        <span></span>
                    ) : (
                            <div className="container">
                                <div className="row justify-content-center align-items-center">
                                    <table style={{ marginTop: '8em' }}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span>Tools</span>
                                                </td>
                                                <td>
                                                    <span class="glyphicon glyphicon-align-left" aria-hidden="true"></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div >
                            </div >

                        ))}
                {localStorage.getItem('token') ? (
                    <Switch>
                        <Route path="/cp1" component={CP1} />
                        <Route path="/admin" component={Admin} />
                    </Switch>
                ) : (
                        <span></span>
                    )}

                <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" centered>
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="row justify-content-center mb-3">
                            <h5 style={{ fontWeight: '700', borderBottom: '2px solid #ebc354' }}>LOGIN</h5>
                        </div>
                        <div className="row justify-content-center align-items-center">
                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-group row">
                                    <label htmlFor="userName" >User Name:</label>
                                    <div className="col-sm-4">
                                        <input type="text" id="userName" name="userName"
                                            ref={register({ required: true })} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="pwd" >Password:</label>
                                    <div className="col-sm-4">
                                        <input type="password" id="pwd" name="pwd" style={{ marginLeft: '0.9em' }}
                                            ref={register({ required: true })} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <Button type="submit" variant="warning" style={{ borderRadius: '25px', width: '40%', margin: 'auto' }}>Submit</Button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment >
        </BrowserRouter >
    )
}

export default Home