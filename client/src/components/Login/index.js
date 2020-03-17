import React from 'react';
import toastr from 'toastr';
import Input from '../Input'
import { connect } from 'react-redux'
import Form from '../Form'
import Modal from 'react-modal';
import { socket } from '../../services/socketService';
import { setUserName } from '../../actions/userActions'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class LoginModal extends React.Component {
    state = {
        username: '',
        nameError: '',
        submitted: false
    }

    onInput(e) { 
        this.setState({ username: e.target.value });
    }

    async validateForm(){
        const { username } = this.state
        if(username === ''){ 
            this.setState({
                nameError: 'Username is required'
            });
            return false
        }
        socket.emit("adduser", username, function(available){
            if (!available){
                return false
            }
        });
        socket.emit('joinroom', {room: 'lobby'}, callback => {
            console.log(callback)
        })
        return true

    }


    async submitForm(e){
        e.preventDefault();
        const { submitted } = this.state
        const validForm = await this.validateForm()
        const { nameError } = this.state
        const { setUserName } = this.props
        if(!validForm){
            const errMsg = nameError
            toastr.error(errMsg, 'Failed!');
        } else {
            toastr.success('Welcome ' + this.state.username, 'Success!');
            this.setState({
                submitted: true,
            });
        }
        setUserName(this.state.username)
    }

    render() {
        const { submitted } = this.state;
        const { username } = this.state;
        const { nameError } = this.state ;
        return (
            <>
            <Modal
                isOpen={!submitted}
                style={customStyles}
                contentLabel="Username: "
                ariaHideApp={false}
            >
                <Form onSubmit={e => this.submitForm(e)}>
                <Input
                    type='text'
                    value={ username }
                    name="name"
                    htmlId='name'
                    label='Username: '
                    errorMessage={ nameError }
                    onInput={ e => this.onInput(e)} />  
                
                <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                    style={{float: 'right', marginTop: '10'}}/> 
            </Form>
            </Modal>
            </>
        );
    }
}

export default connect(null, { setUserName })(LoginModal)