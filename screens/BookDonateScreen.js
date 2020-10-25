import React from 'react';
import { StyleSheet, Text, View,TextInput,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
 import MyHeader  from '../components/MyHeader'
import {ListItem}from 'react-native-elements'
import { setStatusBarHidden } from 'expo-status-bar';
import { FlatList } from 'react-native-gesture-handler';

export default class BookDonateScreen extends React.Component{
    constructor(){
        super()
        this.state={
            userId: firebase.auth().currentUser.email,
            requestedBooksList: []
        }
        this.requestRef =null 
    }
    getRequestedBooksList = ()=>{
        this.requestRef = db.collection("requested_books")
        .onSnapshot((snapshot)=>{
            var requestedBooksList =snapshot.docs.map (document=>document.data());
            this.setState({
                requestedBooksList:requestedBooksList
            })
        })

    }
    componentDidMount(){
        this.getRequestedBooksList()
    }
    componentWillUnmount(){
        this.requestRef();
    }
    keyExtractor=(item,index)=>index.toString()
 renderItem=({item,i})=>{
     return(
         <ListItem 
         key = {i}
         title = {item.book_name}
         subtitle = {item.reason_to_request}
         titleStyle = {{color:'black',fontWeight:'bold'}}
         rightElement={
             <TouchableOpacity style = {styles.button}
             onPress = {()=>{
                 this.props.navigation.navigate("RecieverDetails",{details:item})
             }}
             >

                 <Text style = {{color:'#ffff'}}>
                     view
                 </Text>
             </TouchableOpacity>
         } bottomDivider
            />
         )


 }
 render(){
     return(
         <View style = {{flex:1}}>
             <MyHeader title = "donate books" navigation = {this.props.navigation}/>
             <View style = {{flex:1}} >
                 {
                     this.state.requestedBooksList.length===0
                     ?(
                         <View style={styles.subContainer}>
                             <Text style={{fontSize:20}}>List Of All Requested Books</Text>
                             </View>
                     ):(
                         <FlatList 
                         keyExtractor={this.keyExtractor}
                         data={this.state.requestedBooksList}
                         renderItem={this.renderItem}/>

                     )
                 }
             </View>
         </View>
     )
 }
}
const styles =StyleSheet.create({
    subContainer:{
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
