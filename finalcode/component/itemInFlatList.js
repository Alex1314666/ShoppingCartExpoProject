import React from "react";
import {View,Text,Button, TouchableOpacity, StyleSheet} from "react-native";
import { AntDesign } from "@expo/vector-icons";
function ItemInFlatList(props){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onClickHandler}>
                <View style={styles.container2}>
                    <Text style={styles.label}>{props.item.name}</Text>
                    <Text style={styles.label}>Price:{props.item.price}</Text>
                </View>
                <Text style={styles.label}>{props.item.description}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.onAddHandler}>
                <AntDesign name="pluscircle" size={30} color="#00a2ed" />
            </TouchableOpacity>
        {/* <AntDesign name="pluscircle" size={24} color="black" />
         <Button title="Add" onPress={props.onAddHandler}/> */}
        </View>
    );
}

export default ItemInFlatList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      flexDirection:"row",
      justifyContent:"space-between",
      borderBottomWidth:1,
      borderBottomColor:"#D3D3D3"
    },
    label:{
        fontSize:16,
        paddingRight:80,
        paddingBottom:10,
    },
    container2:{
        flex:1,
        flexDirection:"row",
        justifyContent:"flex-start"
    }

    
  });
  