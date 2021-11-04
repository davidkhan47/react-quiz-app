import React, { Component } from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/input'
import axios from 'axios'


import is from 'is_js'

export default class Auth extends Component {

    state = {
        isFormValid : false,
        formControls: {
            email :{
                value : '',
                type:'email',
                label:'Email',
                errorMaessage:'Введите корректный email :)',
                valid : false,
                touched:false,
                validation:{
                    required : true,
                    email : true
                }
            },
            password : {
                value : '',
                type:'password',
                label:'Пароль',
                errorMaessage:'Введите корректный пароль :)',
                valid : false,
                touched:false,
                validation:{
                    required : true,
                    minLength: 6 
                }
            }
        }
    }

    loginHandlerd = async  () => {
        const authData = {
            email : this.state.formControls.email.value,
            password : this.state.formControls.password.value,
            returnSecureToken : true  
        }
        try{
            const response = await  axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7AEx9WDavKuHI5GJ6wVkuf_othQrVlyI ', authData)
            console.log(response.data);
        }catch(e) {
            console.log(e)
        }
    }
    registrHendler = async ()=>{
        const authData = {
            email : this.state.formControls.email.value,
            password : this.state.formControls.password.value,
            returnSecureToken : true  
        }
        try{
            const response = await  axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7AEx9WDavKuHI5GJ6wVkuf_othQrVlyI ', authData)
            console.log(response.data);
        }catch(e) {
            console.log(e)
        }
    }
    submitHandler = event=>{
        event.preventDefault()
    }
    validateControl(value , validation){
        if(!validation){
            return true
        }
        let isValid = true 
        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }
        if(validation.email){
            isValid = is.email(value) && isValid
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid  

    }
    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
    
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
    
        formControls[controlName] = control
    
        let isFormValid = true
    
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
    
        this.setState({
          formControls, isFormValid
        })
      }

    renderInputs(){
        return  Object.keys(this.state.formControls).map((controlName, index)=>{
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key = {controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMaessage={control.errorMaessage}
                    onChange={event => this.onChangeHandler(event,controlName)}
                />

            )
        })
    }
    render(){
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                        <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                            {this.renderInputs()}
                            {/* <Input label='Email'/>
                            <Input 
                                    label='Пороль'
                                    errorMessage ='no validate!'        
                            /> */}
                            <Button type="success"
                                    onClick={this.loginHandlerd} 
                                    disabled={!this.state.isFormValid}
                                    >
                                    
                                        Войти  
                            </Button>
                            <Button type="primary"
                                    onClick={this.registrHendler} 
                                    disabled={!this.state.isFormValid}

                                    >
                                        Зарегестрироваться  
                            </Button>
                        </form>
                    </div>

            </div>
        )
    }
}