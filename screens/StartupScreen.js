import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
    const dispatch = useDispatch(); 
    useEffect(() => {
        const tryLogin = async () => {
            // attempt to automatically login using user data stored on device
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                // we can't find any data so not logged in
                props.navigation.navigate('Auth');
                return; 
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expiryDate } = transformedData; 
            const expirationDate = new Date(expiryDate);
            if (expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth');
                return;
            }

            //calculate expiration time
            const expirationTime = expirationDate.getTime(); - new Date().getTime();

            // log user in and redirect to shop page
            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expirationTime));
        };

        tryLogin(); 
    }, [dispatch]);

    return <View style={styles.screen}><ActivityIndicator size='large' color={Colors.primary} /></View>
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;