import React from 'react';
import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
 import MyHeader  from '../components/MyHeader'
import {ListItem,item}from 'react-native-elements'
import { setStatusBarHidden } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';

export default class NotificationScreen extends React.Component{
    static navigationOptions = {header:null};
    constructor(){
        super()
        this.state = {
            userId:firebase.auth().currentUser.email,
            
            
            allNotifications:[]
        }
        this.notificationRef = null 
    }
    getNotifications = ()=>{
        this.notificationRef = db.collection("all_notifications").where("notification_status",'==',"unread").where("targeted_user_id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
        var allNotifications = []
        snapshot.docs.map((doc)=>{
            var notification = doc.data()
            notification ["doc_id"]=doc.id
            allNotifications.push(notification)
        })
            this.setState({
                allnotifications:allnotifications
            })
        })
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>{
        
            <ListItem
            key = {i}
            title = {item.book_name}
            subtitle = {item.message}
            leftElement = {<Icon name = "book" type = "font-awesome" color = "#696969"/> }
            titleStyle = {{color:'black',fontWeight:'bold'}}
            
             bottomDivider
               />
            
   
   
    }

    componentDidMount(){
        this.getNotifications()
    }

    componentWillUnmount(){
        this.notificationRef
    }


    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader title = "my notifications" navigation = {this.props.navigation}/>
                <View style = {{flex:1}} >
                    {
                        this.state.allNotifications.length===0
                        ?(
                            <View style={styles.subContainer}>
                                <Text style={{fontSize:20}}>No notifications</Text>
                                </View>
                        ):(
                            <FlatList 
                            keyExtractor={this.keyExtractor}
                            data={this.state.allNotifications}
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
   