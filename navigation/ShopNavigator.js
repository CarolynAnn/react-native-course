import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors from '../constants/Colors';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
},
{
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name="ios-cart" size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: {
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        }
    }
}); 

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},
{
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name="ios-list" size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: {
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        }
    }
});

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
},
{
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name="ios-create" size={23} color={drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: {
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        }
    }
});

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch(); 
        return (
            <View style={{flex: 1}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    <DrawerItems {...props} />
                    <Button title="Logout" color={Colors.primary} onPress={() => {
                        dispatch(authActions.logout());
                        //props.navigation.navigate('Auth');
                    }}/>
                </SafeAreaView>
            </View>
        );
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: {
        headerTintColor: Colors.primary,
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        }
    }
});
const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);