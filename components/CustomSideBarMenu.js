import React from 'react';
import {Header, Icon,Badge} from 'react-native-elements';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase';
import Welcomescreen from '../screens/welcomeScreen';

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style = {{flex:1}}>
                <View style = {styles.drawerItemsContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity style = {styles.logoutButton}
                    onPress={()=>{
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    container:{
        flex:1
    },
    drawerItemsContainer:{
        flex:0.8

    },
    logoutContainer:{
        flex:0.2 ,
        justifyContent:'flex-end',
        paddingBottom:30
    },
    logoutButton:{
        fontSize:30,
        fontWeight:'bold'
    }
})