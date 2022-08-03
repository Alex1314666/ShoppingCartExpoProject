import React, { useEffect, useState } from "react";
import {  FlatList, SafeAreaView,TouchableOpacity,StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { data } from "../data/itemslist";
import ItemInFlatList from "../component/itemInFlatList";


function HomeScreen({ navigation }){
    const [lazyLoadList, setLazyLoadList] = useState([]);
    const [cartList,setCartList] = useState([]);
    const [offset,setOffset] = useState(0);
    const limit = 10;
    
    useEffect(()=>{
        fetchResult();
    },[]);
    
    const addLazyLoadListHandler = (item) => {
        setLazyLoadList((lazyLoadList) => [...lazyLoadList,item]);
    };

    const fetchResult = () => {
        if(limit < data.length){
            if(limit + offset < data.length){
                for(var i = offset; i < offset + limit ; i++){
                    addLazyLoadListHandler(data[i]);
                }
                setOffset(offset + limit);
            }
            else{
                for(var i = offset; i < data.length ; i++){
                    addLazyLoadListHandler(data[i]);
                }
                setOffset(data.length);
            }
        }
        else{
            setLazyLoadList(data);
            setOffset(data.length);
        }
    };

    const addCartListHandler = (item) => {
        var found = false;
        if(cartList.length > 0){
            for(const k in cartList){
                if(item.itemId == cartList[k].itemId){
                    cartList[k].quanlity++;
                    found = true;
                }
            }
        }

        if(!found || cartList.length == 0 ){
            setCartList((cartList) => [...cartList,{itemId:item.itemId, item:item, quanlity:1}]);
            
        }
        console.log("Add succesfful");
        console.log(cartList);
        
    };

    const updateCartList = (cartList) =>{
        setCartList(cartList);
    }

    return(
        <SafeAreaView style = {styles.container}>
            <View style = {styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('CartScreen',{cartList:cartList , updateHandler:updateCartList})}>
                <AntDesign name="shoppingcart" size={32} color="black" />
            </TouchableOpacity>
            </View>
            
            <FlatList 
                data = {lazyLoadList}
                keyExtractor={(item) => item.itemId}
                onEndReached={fetchResult}
                onEndReachedThreshold={1}
                renderItem = {
                    ({item}) => {
                        return <ItemInFlatList 
                                    item = {item}
                                    onClickHandler = {() => navigation.navigate('ItemDetailScreen',{item:item})}
                                    onAddHandler = {
                                        () => {
                                            addCartListHandler(item);
                                        } 
                                    }
                                />
                    }
                }
            />
        </SafeAreaView>

    )
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      },
    iconContainer:{
      flexDirection:'row-reverse',
      right:10,
    }
  });
  