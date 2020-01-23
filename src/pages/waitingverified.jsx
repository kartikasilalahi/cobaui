import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {api_url} from '../supports/index'

class WaitingVerification extends Component {
    state = {  }

    onBtnResendEmailClick=()=>{
        Axios.post(`${API_URL}/user/resendemailver`,{
            nama:this.props.nama,
            email:this.props.email
        }).then((res)=>{
            console.log(res.data)
            alert('email berhasil')
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() { 
        return (  
            <div>
            <h2>Tolong Diperhatikan</h2>
                <p>Silahkan mengecheck email anda untuk verifikasi account anda</p>
                <p>
                    Bila anda tidak mendapatkan email dari Penguasa Club Hokage
                    harap cemas, dan click button dibawah untuk Resend
                </p>
                <input type="button" value="Resend Email" onClick={this.onBtnResendEmailClick} />
            </div>
        );
    }
}
const mapStateToProps = ({auth}) => {
    return {
        email:auth.email,
        nama: auth.nama 
    }
}
export default connect(mapStateToProps) (WaitingVerification);