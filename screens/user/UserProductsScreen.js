import React from 'react';
import { View, FlatList, Button, Alert, Text } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';
import { deprecationHandler } from 'moment';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch(); 

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {productId: id});
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', "Delete Item?", [{text: "No", style: "default"}, {text: "Yes", style: "destructive", onPress: () => 
        dispatch(productsActions.deleteProduct(id))}]);
      };

    if (userProducts.length === 0){
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>No products found.</Text></View>
    }
    return (
        <FlatList
        data={userProducts} 
        keyExtractor={item => item.id} 
        renderItem={itemData => 
            <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onSelect={() => {editProductHandler(itemData.item.id);}}>
                <Button color={Colors.primary} title="Edit" onPress={() => {editProductHandler(itemData.item.id);}}/>
                <Button color={Colors.primary} title="Delete" onPress={() => {deleteHandler(itemData.item.id)}}/>
            </ProductItem>}/>
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: "My Products",
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title="Menu" iconName={"ios-menu"} onPress={() => {
            navData.navigation.toggleDrawer();
        }}/></HeaderButtons>,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title="Add" iconName={"ios-create"} onPress={() => {
            navData.navigation.navigate('EditProduct');
        }}/></HeaderButtons>
    }
};

export default UserProductsScreen;