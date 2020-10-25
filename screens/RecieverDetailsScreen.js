import React from 'react';
import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
 import MyHeader  from '../components/MyHeader'
import {ListItem,Card,Header,Icon}from 'react-native-elements'
import { setStatusBarHidden } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';

export default class RecieverDetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            recieverId:this.props.navigation.getParam('details')["user_id"],
            requestId:this.props.navigation.getParam('details')["request_id"],
            bookName:this.props.navigation.getParam('details')["book_name"],
            reason_for_request:this.props.navigation.getParam('details')["reason_to_request"],
              recieverName:'',
              recieverContact:'',
              recieverAddress:'',
              recieverRequestDocId:''
        }
    }

    getRecieverDetails(){
        
        db.collection('users').where('email_id','==',this.state.recieverId).get()
        .then(snapshot=>{
           snapshot.forEach(doc=>{
               this.setState({
                 recieverName:doc.data().first_name,
                 recieverAddress:doc.data().address,
                 recieverContact:doc.data().contact,
                 

               })
           }) 
        })
        db.collection('requested_books').where('request_id','==',this.state.requestId).get()
        .then(snapshot=>{
           snapshot.forEach(doc=>{
               this.setState({
                 recieverRequestDocId:doc.id
                 

               })
           }) 
        })
    }
    updateBookStatus=()=>{
    db.collection('all_Donations').add({
        book_name:this.state.bookName,
        request_id:this.state.requestId,
        requested_by:this.state.recieverName,
        donor_id:this.state.userId,
        request_status:"Donor Interested"
    })
}
componentDidMount(){
    this.getRecieverDetails()
}
render(){
    return(
    <View style = {styles.container}>
        <View style = {{flex:0.1}}>
        <Header
        leftComponent = {<Icon name = 'arrow-left' type = 'feather' color = '#696969' onPress = {()=>this.props.navigation.goBack()}/>}
        centerComponent={{text:"donate books",style:{color:'#90a5a9',fontSize:20,fontWeight:"bold"}}}
        backgroundColor="#eaf8fe"
        />
        </View>
        <View style = {{flex:0.3}}>
            <Card
            title = {"book information"}
            titleStyle = {{fontSize:20}}>
                <Card>
                    <Text style = {{fontWeight:'bold'}}>
                        Name:{this.state.bookName}
                        </Text></Card>
            
            <Card>
                    <Text style = {{fontWeight:'bold'}}>
                       reason:{this.state.reason_for_request}
                        </Text></Card>
            </Card>

        </View>
        <View style = {{flex:0.3}}>
            <Card
            title = {"reciever information"}
            titleStyle = {{fontSize:20}}>
                <Card>
                    <Text style = {{fontWeight:'bold'}}>
                        Name:{this.state.recieverName}
                        </Text></Card>
            
            <Card>
                    <Text style = {{fontWeight:'bold'}}>
                       address:{this.state.recieverAddress}
                        </Text></Card>
                        <Card>
                    <Text style = {{fontWeight:'bold'}}>
                       contact:{this.state.recieverContact}
                        </Text></Card>
            </Card>
            
        </View>
        <View style = {styles.buttonContainer}>
              { this.state.recieverId!==this.state.userId
              ?(
                  <TouchableOpacity style  = {styles.button}
                  onPress = {()=>{
                      this.updateBookStatus()
                     this.props.navigation.navigate('MyDonations')
                  }}> 
                  <Text>I want to donate</Text>
                  </TouchableOpacity>
              
                  ):null
                  


                      }
        </View>
    </View>
        )
}
}
const styles =StyleSheet.create({
    buttonContainer:{
        flex:0.3,
        alignItems:'center',
        justifyContent:'center',
        
    
    
    },button:{
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
    container:{
        flex:1
    }
})