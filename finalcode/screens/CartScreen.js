import React, { useEffect, useState } from "react";
import { Alert, View , Button, FlatList, Text, TouchableOpacity,StyleSheet} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
function CartScreen({naviagtion, route}){
    const [cartList,setCartList] = useState(route.params.cartList);
    const [finalTotal,setFinalTotal] = useState(0);
    const [deducted, setDeducted] = useState(0);

    useEffect(()=>{
        getTotal();
    },[]);

    const increaseListHandler = (key) => {
        cartList.find((item) => item.itemId == key).quanlity++;
        getTotal();
        // console.log('In Cart Screen add success');
        // console.log(cartList);
    };

    const removeListHandler = (key) => {
        setCartList((cartList) =>{
            return cartList.filter((item) => item.itemId != key)
        } )
    };

    const decreaseListHandler = (key) => {
        for(const k in cartList){
            if(key == cartList[k].itemId){
                if(cartList[k].quanlity == 1){
                    removeListHandler(key);
                }
                else{
                    cartList.find((item) => item.itemId == key).quanlity--;
                }
            }
        }

        // console.log('In Cart Screen decrease success');
        // console.log(cartList);
        getTotal();
    };

    const getTotal  = () => {
            var total = 0;
            for(const k in cartList){
                total += cartList[k].quanlity * cartList[k].item.price;
                // console.log(`In cartlist loop ${k}, total: ${total}`);
            }

            if(total >= 100){
                setFinalTotal((total * 0.8));
                setDeducted(total*0.2);
            }
            else if(total >= 80){
                setFinalTotal((total * 0.85));
                setDeducted(total*0.15);
            }
            else{
                setFinalTotal(total);
                setDeducted(0);
            }
        //     console.log(`In cartlist, total: ${total}`);

        // console.log(`In cartlist, final: ${finalTotal}`);
        // console.log(`In cartlist, deduct: ${deducted}`);
    };

    const onPurchaseHandler = () => {
        if(finalTotal == 0){
            Alert.alert(
                "Empty Cart",
                "No item in cart",
                [
                    {
                        text:"Back to Shopping",
                        onPress:() => {
                            console.log("Back to shopping pressed")
                        }
                    }
                ]
            )
        }
        else{
            Alert.alert(
                "Successfully purchased",
                `Item for $${finalTotal.toFixed(2)} after discount $${deducted.toFixed(2)}!`,
                [
                    {
                        text:"OK",
                        onPress:() => {
                            setCartList([]);
                            route.params.updateHandler([]);
                            setDeducted(0);
                            setFinalTotal(0);
                        }
                    }
                ]
            )
        }
    
    }
    return(
        <View style={styles.container}>
            <FlatList
                data = {cartList }
                keyExtractor={(item) => item.item.itemId}
                renderItem = {
                    (item) => {
                        return (
                            <View style={styles.itemConatiner}>
                                <Text style={styles.lable}>{item.item.item.name} * {item.item.quanlity} = ${(item.item.item.price * item.item.quanlity).toFixed(2)}</Text>
                                <View style={styles.buttonConatiner}>
                                    <TouchableOpacity>
                                        <AntDesign 
                                            name="plus" 
                                            size={24} 
                                            color="black"  
                                            onPress={() => {
                                                increaseListHandler(item.item.itemId);
                                            route.params.updateHandler(cartList);
                                        }}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <AntDesign 
                                            name="minus" 
                                            size={24} 
                                            color="black" 
                                            onPress={() => {
                                                decreaseListHandler(item.item.itemId);
                                                route.params.updateHandler(cartList);
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                }
            />

            <Text style={styles.reminderLable}>* Discount $80 or more: 15%; $100 or more: 20% </Text>
            <Text style={styles.lable}>Final Total: ${finalTotal.toFixed(2)}</Text>
            <Text style={styles.lable}>Deducted: ${deducted.toFixed(2)}</Text>
            <Button title = "Purchase" onPress={onPurchaseHandler} />
        </View>
    );
}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },
    itemConatiner:{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:8,
        borderBottomWidth:1,
        borderBottomColor:"#D3D3D3"
    },
    buttonConatiner:{
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    lable:{
        fontSize:16,
        padding:5
    },
    reminderLable:{
        padding:2,
        fontSize:14,
        color:"#AAAAAA"
    },
  });