import React, { useState, useEffect, useRef } from 'react'
import './admin.css'
import { Nav, Modal } from 'react-bootstrap'
import axios from 'axios'
export const AdminForm = () => {
    const [hostName, getHostName] = useState({ dc1: '', dc2: '' })
    const [show, getShow] = useState(false)
    const [show1, getShow1] = useState(false)
    const [value1, getValue] = useState('')
    const inpp = useRef('')
    const handleShow = (name) => {
        getShow(true)

    }
    const handleShow1 = (name) => {
        getShow1(true)

    }
    const handleClose = () => {
        getShow(false)
        getShow1(false)
        console.log(hostName)
    }

    useEffect(
        () => {
            const getData = async () => {
                const res = await axios.get('http://localhost:4000/dc1/1')
                const res1 = await axios.get('http://localhost:4000/dc2/1')
                try {
                    getHostName({
                        ...hostName,
                        dc1: res.data,
                        dc2: res1.data
                    })
                } catch (err) {
                    window.alert(err)
                }
            }
            getData()
        }, []
    )
    const handleInput = (name) => {

        if (name === "dc1") {
            console.log(inpp.current.value)
            getHostName({
                ...hostName,
                dc1: { id: 1, hostname: inpp.current.value },

            })
        } else {
            console.log(inpp.current.value)
            getHostName({
                ...hostName,
                dc2: { id: 1, name: inpp.current.value }
            })
        }

    }
    const handleSubmit = () => {
        const postData = async () => {
            const host1 = hostName.dc1
            const host2 = hostName.dc2
            const res = await axios.put('http://localhost:4000/dc1', host1)
            const res1 = await axios.put('http://localhost:4000/dc2', host2)
            try {
                console.log(res, res1)
            } catch (err) {
                console.log(err)
            }
        }
        postData()
    }
    return (
        <>
            <h2 style={{ marginLeft: '-16em', marginTop: '1em' }}>DC1</h2>
            {/* <div className="container"> */}
            <div className="row justify-content-center align_items-center">
                <div className="form-group row">
                    <label htmlFor="projectName" >Project Name:</label>
                    <div className="col-sm-2">
                        <input type="text" id="projectName" name="projectName" defaultValue={hostName.dc1.hostname}
                            className="form-control" />
                    </div>
                    <div className="col-sm-6">
                        <button class="bbb btn btn-primary" onClick={() => { handleShow('dc1') }}>Edit</button>
                    </div>
                </div>
            </div>

            <h2 style={{ marginLeft: '-16em', marginTop: '1em' }}>DC2</h2>
            <div className="row justify-content-center align_items-center">
                <div className="form-group row">
                    <label htmlFor="projectName" >Project Name:</label>
                    <div className="col-sm-2">
                        <input type="text" id="projectName" name="projectName" defaultValue={hostName.dc2.hostname}
                            className="form-control" />
                    </div>
                    <div className="col-sm-6">
                        <button class="bbb btn btn-primary" onClick={() => { handleShow1() }}>Edit</button>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <button style={{ marginLeft: '-9em' }} className="btn btn-primary" onClick={() => handleSubmit()}>Submit</button>
            </div>
            <Modal show={show} onHide={() => { getShow(false) }} dialogClassName="modal-90w" centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <label htmlFor="projectName" >Project Name:</label>
                        <div className="col-sm-2">
                            <input type="text" name="pro"
                                className="form-control" ref={inpp} defaultValue={value1} onChange={() => handleInput('dc1')} />
                        </div>
                    </div>
                    <button onClick={() => handleClose()}>close</button>
                </Modal.Body>
            </Modal>
            <Modal show={show1} onHide={() => { getShow(false) }} dialogClassName="modal-90w" centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group row">
                        <label htmlFor="projectName" >Project Name:</label>
                        <div className="col-sm-2">
                            <input type="text" name="pro"
                                className="form-control" ref={inpp} defaultValue={value1} onChange={() => handleInput()} />
                        </div>
                    </div>
                    <button onClick={() => handleClose()}>close</button>
                </Modal.Body>
            </Modal>
        </>
    )
}
const Admin = () => {
    return (
        <div className="container">
            <div class="row d-flex justify-content-center" style={{ marginTop: '8em' }}>
                <div class="col-3">
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">CP1</a>
                        <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">CP2</a>
                        <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">CP3</a>

                    </div>
                </div>
                <div class="col-9">
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><AdminForm /></div>
                        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">sdaskldadkasjnd</div>
                        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Admin

