import React from 'react';
import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
 import MyHeader  from '../components/MyHeader'
import {ListItem,item}from 'react-native-elements'
import { setStatusBarHidden } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';

export default class MyDonationScreen extends React.Component{
    static navigationOptions = {header:null};
    constructor(){
        super()
        this.state = {
            donorId:firebase.auth().currentUser.email,
            donorName:"",

            allDonations:[]
        }
        this.requestRef = null 
    }
    getDonorDetails = (donorId)=>{
          db.collection("users").where("email_id",'==',donorId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc)=>{
              this.setState({
                  "donorName":doc.data().first_name+" "+doc.data().last_name
              })
          })
    
        })
    }
    getAllDonations = ()=>{
        this.requestRef = db.collection("all_donations").where("donor_id",'==',this.state.donorId)
        .onSnapshot((snapshot)=>{
            var allDonations= []
            snapshot.docs.map((doc)=>{
                var donation = doc.data()
                donation["doc_id"]=doc.id
                allDonations.push(donation)
            })
            this.setState({
                allDonations:allDonations
            })
        })
    }
    sendBook = (bookDetails)=>{
        if(bookDetails.request_status==="Book Sent"){
            var requestStatus = "donor interested"
             db.collection("all_donations").doc(bookDetails.doc_id).update({
                 "request_status":"donor intersted"
             })
             this.sendNotification(bookDetails,requestStatus)
        }
        else{
            var requestStatus = "book sent"
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "request_status":"book sent"
            })
            this.sendNotification(bookDetails,requestStatus)
        }
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>{
        
            <ListItem
            key = {i}
            title = {item.book_name}
            subtitle = {"requestedBy: "+item.requested_by+" status: "+item.request_status}
            leftElement = {<Icon name = "book" type = "font-awesome" color = "#696969"/> }
            titleStyle = {{color:'black',fontWeight:'bold'}}
            rightElement={
                <TouchableOpacity style = {styles.button}>
                    <Text style = {{color:'#ffff'}}>
                    send book
                    </Text>
                </TouchableOpacity>
            } bottomDivider
               />
            
   
   
    }

    componentDidMount(){
        this.getAllDonations()
    }

    componentWillUnmount(){
        this.requestRef
    }


    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader title = "my donations" navigation = {this.props.navigation}/>
                <View style = {{flex:1}} >
                    {
                        this.state.allDonations.length===0
                        ?(
                            <View style={styles.subContainer}>
                                <Text style={{fontSize:20}}>List Of All donations</Text>
                                </View>
                        ):(
                            <FlatList 
                            keyExtractor={this.keyExtractor}
                            data={this.state.allDonations}
                            renderItem={this.renderItem}/>
   
                        )
                    }
                </View>
            </View>
        )
    }
   }
   const styles =StyleSheet.create({
       subtitle:{
           flex:1,
           alignItems:'center',
           justifyContent:'center',
           fontSize:20
       
       
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
   })
   