import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {onUserRegister} from '../redux/actions'

class Register extends Component {
    state = {  }

    onBtnRegisterClick = () => {
        var nama = this.refs.nama.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        console.log('ini nama', this.refs.nama.value)
        console.log('ini nama', nama)

        this.props.onUserRegister({ 
            nama, 
            email, 
            password });
    }

    renderError = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>;
        }
    }

    renderButton = () => {
        if(this.props.loading) {
            return <i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/>
        }
        return <input type="button" name="submit" id="submit" className="submit" defaultValue="Register" onClick={this.onBtnRegisterClick} />
    }

    render() { 
        if(this.props.nama === '')
        return (  
            <div className="bodyRegister">
                    <div className="main">
                        <div className="container">
                            <form className="appointment-form" id="appointment-form">
                                <h2>Halo</h2>
                                <div className="form-group-1">
                                    <input className="mb-3 " ref="nama" type="text" name="nama" id="nama" placeholder="Nama" required /><br/>
                                    <input className="mb-3 " ref="email" type="email" name="email" id="email" placeholder="Email" required /><br/>
                                    
                                    <input className="mb-3 " ref="password" type="text" name="password" id="password" placeholder="Password" required /><br/>
                                </div>
                                <div>
                                    {this.renderError()}
                                </div>
                                <div className="form-submit">
                                    {this.renderButton()}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        );
        {console.log('berhasillllllllllll')}
        return <Redirect to='/' />

    }
}
const mapStateToProps = (state) => {
    return { 
        nama: state.auth.nama,
        loading: state.auth.loading,
        error: state.auth.error 
    };
}

export default connect(mapStateToProps,{onUserRegister})(Register);