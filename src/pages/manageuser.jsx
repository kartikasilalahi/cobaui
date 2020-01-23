import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { Table, Input, Button } from 'reactstrap';
import {APIURL, APIIMAGE} from './../helper/apiUrl'
import Modal from '../component/modal'

function ManageAdmin(){
    const [dataUsers, setDataUsers] = useState([])
    const [datausersEdit, setDataUsersEdit] = useState([])
    const [datausersDelete, setDataUsersDelete] = useState([])

    const [modalAdd, setModalAdd]= useState(false)
    const toggleModalAdd = () => { setModalAdd(!modalAdd) }

    const [modalEdit, setModaledit]= useState(false)
    const toggleModalEdit = () => { setModaledit(!modalEdit) }   // togel yang ini utk modal editnya

    const [modalDelete, setmodalDelete]= useState(false)
    const togglemodalDelete = () => { setmodalDelete(!modalDelete) }

    const toggleDataEdit = (i) => {                             // toggle yang ini untuk dapetin data yang ingin di edit
        setDataUsersEdit(dataUsers[i])
        setModaledit(!modalEdit) 
    }

    const toggleDataDelete = (i) => {                            // toggle yang ini untuk dapetin data yang ingin di delete
        setDataUsersDelete(dataUsers[i])
        setmodalDelete(!modalDelete)
    }

    const [addData] = useState ({
        nama:useRef(),
        email:useRef()
    })

    const [addImage, setaddImage] = useState({
        addImageFileName:"Select Image..",
        addImageFile:undefined
    });

    const [editImage, seteditImage] = useState({
        editImageFileName:"Select Image..",
        editImageFile:undefined
    });


  // function add image
    const onAddImageFileChange=(event)=>{
        console.log(event.target.files[0])
        var file=event.target.files[0]
        if(file){
            setaddImage({...addImage,addImageFileName:file.name,addImageFile:event.target.files[0]})
        }else{
            setaddImage({...addImage,addImageFileName:'Select Image...',addImageFile:undefined})
        }
    }

    // function edit image 
    const onEditImageFileChange=(event)=>{
        console.log(event.target.files[0])
        var file=event.target.files[0]
        if(file){
            seteditImage({...editImage,editImageFileName:file.name,editImageFile:event.target.files[0]})
        }else{
            seteditImage({...editImage,editImageFileName:'Select Image...',editImageFile:undefined})
        }
    }

    // USE EFFECT SAMA HAL NYA SPERI COMPONENTDIDIMOUNT
    useEffect(()=>{
        Axios.get(`${APIURL}coba/users`)
        .then(res=>{
        setDataUsers(res.data.datauser)
        })
        .catch(err=>{
        console.log(err);
        })
    }, [])


  // FUNCTION ADD USER
    const addUser=()=>{
        var formdata = new FormData()

        const {nama, email}=addData
        const data={
            nama:nama.current.value,
            email:email.current.value,
            password:'123'
        }

        var Headers={       // Headers adalah config axios, untuk memberi tahu ada file yang ingin di upload melalui 'Content-Type':'multipart/form-data'
            headers:
            {
                'Content-Type':'multipart/form-data'
            }
        }

        formdata.append('image', addImage.addImageFile)
        formdata.append('data', JSON.stringify(data))

        Axios.post(`${APIURL}coba/adduser`, formdata, Headers)
        .then(res=>{
            setDataUsers(res.data.datauser)
            setModalAdd(!modalAdd)
        }).catch(err=>{
            console.log(err);
        })
    }

  // FUNCTION EDIT USER
    const editUser=()=>{
        var formdata = new FormData()

        const data={
            nama:datausersEdit.nama,
            email:datausersEdit.email
        }

        var Headers={
            headers:
            {
                'Content-Type':'multipart/form-data'
            }
        }

        formdata.append('image', editImage.editImageFile)
        formdata.append('data', JSON.stringify(data))
        
        Axios.put(`${APIURL}coba/edituser/${datausersEdit.id}`, formdata, Headers)
        .then(res=>{
            setDataUsers(res.data.datauser)
            setModaledit(!modalEdit)
        }).catch(err=>{
            console.log(err);
        })
    }

    const deleteUser=()=>{    
        Axios.delete(`${APIURL}coba/deleteuser/${datausersDelete.id}`)
        .then(res=>{
            setDataUsers(res.data.datauser)
            setmodalDelete(!modalDelete)
        }).catch(err=>{
            console.log(err);
        })
    }

    // MENAMPILKAN DAFTAR USER
    const renderUser=()=>{
        return dataUsers.map((val,i)=>{
        return (
            <tr key={i}>
            <th>{i+1}</th>
            <td>{val.nama}</td>
            <td>{val.email}</td>
            <td><img src={`${APIIMAGE+val.image}`} height="50px" alt={val.nama} /></td>
            <td>
                <Button onClick={()=>toggleDataEdit(i)} className="mr-3"> edit </Button>
                <Button onClick={()=>toggleDataDelete(i)}> delete </Button>
            </td>
            </tr>
        )
        })
    }

    if (dataUsers.length===0) {
        return <div> Loading... </div>
    }
    return (
        <div className="App" >
        {/* modal add */}
        <Modal buttonName="ADD" title='Add User' toggle={toggleModalAdd} modal={modalAdd} actionFunc={addUser} >
            <Input className="mb-3" type="text" placeholder="input nama" innerRef={addData.nama} />
            <Input type="text" placeholder="input email" innerRef={addData.email}/>
            <Input type="file" label={addImage.addImageFileName} id='addImagePost' onChange={onAddImageFileChange} className="mt-3" />
        </Modal>

        {/* modal edit */}
        <Modal buttonName="SAVE" title='Edit User' toggle={toggleModalEdit} modal={modalEdit} actionFunc={editUser}  >
            <Input className="mb-3" type="text" placeholder="input nama" 
                value={datausersEdit.nama} 
                onChange={e=>setDataUsersEdit({...datausersEdit, nama:e.target.value})} />
            <Input type="text" placeholder="input email" 
                value={datausersEdit.email} 
                onChange={e=>setDataUsersEdit({...datausersEdit, email:e.target.value})}/>
            <Input type="file" label={editImage.editImageFileName} id='addImagePost' onChange={onEditImageFileChange} className="mt-3" />
            
        </Modal>

        {/* modal delete */}
        <Modal buttonName="delete" title='Delete User' toggle={togglemodalDelete} modal={modalDelete} actionFunc={deleteUser}  >
            Yakin Hapus?
        </Modal>


        <Button onClick={toggleModalAdd} className="my-3">Add Data</Button>
        <Table className="w-75 mx-auto"  striped>
            <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Gambar</th>
                <th>Action</th>

            </tr>
            </thead>
            <tbody>
            {renderUser()}
            </tbody>
        </Table>
        </div>
    );
}

export default ManageAdmin