import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Alert,Modal,KeyboardAvoidingView,ScrollView } from 'react-native';
import db from '../config';
import firebase from  'firebase';

export default class Welcomescreen extends React.Component{

    constructor(){
        super()
        this.state={
            emailId:'',
            password:'',
            firstName:'',
            lastName : '',
            contact:'',
            address:'',
            confirmPassword:'',
            isModalVisible:'false'

        }
    }
    userSignUp=(emailId,password,confirmPassword)=>
    { 
        if(password!== confirmPassword){
            return alert("password doesnt match")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        .then(()=>{
            db.collection('users').add({
                first_name:this.state.firstName,
                last_name:this.state.lastName,
                contact:this.state.contact,
                first_name:this.state.firstName,
                email_id:this.state.emailId,
                address:this.state.address,
            })
            return alert(
                'user Added Succesfully',
                '',
                [
                    {
                        text:'OK',onPress:()=>{
                            this.setState({"isModalVisible":false})
                        }
                    }
                ]
            )

        })
        .catch((error)=>{
            var errorCode=error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
        })

     }
    }
    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
        this.props.navigation.navigate('DonateBooks')
        })
        .catch((error)=>{
            var errorCode=error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
        })


    }
    showModal=()=>{
        return( 
            <Modal
            animationType = "fade"
              transparent = {true}
            visible={
                this.state.isModalVisible
            }>
                <View style = {styles.modalContainer}>
                    <ScrollView style = {{width:'100%'}}>
                        <KeyboardAvoidingView style = {styles.keyboardAvoidingView}>
                            <Text style = {styles.modalTitle}>Registeration</Text>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"first name"}
                            maxLength = {8}
                            onChangeText ={(text)=>{
                                this.setState({
                                    firstName:text
                                })
                            }}/> 
                             <TextInput
                            style={styles.formTextInput}
                            placeholder={"last name"}
                            maxLength = {8}
                            onChangeText ={(text)=>{
                                this.setState({
                                    lastName:text
                                })
                            }}/> 
                             <TextInput
                            style={styles.formTextInput}
                            placeholder={"contact"}
                            maxLength = {10}
                            keyboardType={'numeric'}
                            onChangeText ={(text)=>{
                                this.setState({
                                    contact:text
                                })
                            }}/> 
                             <TextInput
                            style={styles.formTextInput}
                            placeholder={"address"}
                            multiline={true}
                            onChangeText ={(text)=>{
                                this.setState({
                                    address:text
                                })
                            }}/> 
                             <TextInput
                            style={styles.formTextInput}
                            placeholder={"email"}
                             keyboardType = {'email-address'}
                            onChangeText ={(text)=>{
                                this.setState({
                                    emailId:text
                                })
                            }}/> 
                             <TextInput
                            style={styles.formTextInput}
                            placeholder={"password"}
                            maxLength = {8}
                            secureTextEntry={true}

                            onChangeText ={(text)=>{
                                this.setState({
                                    password:text
                                })
                            }}/> 
                             <TextInput
                            style={styles.formTextInput}
                            placeholder={"confirmPassword"}
                            maxLength = {8}
                            secureTextEntry= {true}
                            onChangeText ={(text)=>{
                                this.setState({
                                    confirmPassword:text
                                })
                            }}/>
                            <View style = {styles.modalBackButton}>
                                <TouchableOpacity
                                style = {styles.registerButton}
                                onPress={()=>{this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}}>
                                    <Text style = {styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                                </View> 
                                <View style = {styles.modalBackButton}>
                                <TouchableOpacity
                                style = {styles.cancelButton}
                                onPress={()=>{this.setState({"isModalVisible":false})}}>
                                    <Text style = {styles.cancelButtonText}>cancel</Text>
                                </TouchableOpacity>
                                </View> 
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
            )
       
    }
    render(){
        return(
            <View style = {styles.container}>
                <View style = {{justifyContent:'center',alignItems:'center'}}>
                    {
                        this.showModal()
                    }
                </View>
                <View style ={styles.profileContainer}>
                    <Text style = {styles.title}>Book Sants</Text>
                    </View> 
                    <View style={styles.buttonContainer}>
                        <TextInput style={styles.loginBox}
                        placeholder = "example@bookSanta.com"
                        placeholderTextColor= "#FFFF"
                        keyboardType='email-adress'
                        onChangeText={(text)=>{
                            this.setState({
                                emailId:text
                            })
                        }}/>
                             <TextInput style={styles.loginBox}
                        placeholder = "password"
                        placeholderTextColor= "#FFFF"
                        secureTextEntry={true}
                        onChangeText={(text)=>{
                            this.setState({
                            password:text
                            })
                        }}/>
                        <TouchableOpacity 
                        style = {[styles.button,{marginBottom:20,marginTop:20}]}
                             onPress={()=>{this.userLogin(this.state.emailId,this.state.password)}}>
                                 <Text style = {styles.buttonText}>Login</Text>
                                 
                             </TouchableOpacity>
                             <TouchableOpacity 
                        style = {[styles.button,{marginBottom:20,marginTop:20}]}
                             onPress={()=>{this.setState({"isModalVisible":true})}}>
                                 <Text style = {styles.buttonText}>Sign Up</Text>
                                 
                             </TouchableOpacity>
                    </View>


             </View> 
        )
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
backgroundColor:'#f8be85'
    },
profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},title:{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color:'#ff3d00'
},
loginBox:{
width:300,
height:40,
borderBottomWidth:1.5,
borderColor:'#ff8a65',
fontSize:20,
margin:10,
paddingLeft:10

},
keyboardAvoidingView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
modalTitle:{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:30,
    color:'#ff5722',
    margin:50
},
modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft:30,
    marginTop:80,
    
},
formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:10,
    marginTop:20,
    padding:10,


},
registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
},
registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
},
cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5
},



button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor:"#000",
    shadowOffset:{
        width:0,
        height:8,
    },
    shadowOpacity:0.30,
    shadowRadius:10.32,
    elevation:60
},
buttonText:{
    color:'#fff',
    fontWeight:'200',
    fontSize:20
},
buttonContainer:{
    flex:1,
    alignItems:'center'
}
})

