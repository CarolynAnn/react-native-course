import React, {useEffect, useRef} from 'react';
import ShopNavigation from './ShopNavigator';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';

const NavigationContainer = props => {
    const navRef = useRef(); 
    const isAuth = useSelector(state => !!state.auth.token);

    // when our token is cleared we redirect to Auth screen
    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
        }
    }, [isAuth]);
    return <ShopNavigation ref={navRef}/>;
};

export default NavigationContainer; 