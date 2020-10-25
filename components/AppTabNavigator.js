import React from 'react';
import {createBottomTabNavigator}from 'react-navigation-tabs';
import BookDonateScreen from '../screens/BookDonateScreen';
import BookRequestScreen from '../screens/BookRequestScreen';

export const AppTabNavigator=createBottomTabNavigator({
    DonateBooks:{
        screen:BookDonateScreen,
        navigationOptions:{
            tabBarLabel:"donate books"
        }
    },
    BookRequest:{
        screen:BookRequestScreen,
        navigationOptions:{
            tabBarLabel:"request books"
        }
    }
})