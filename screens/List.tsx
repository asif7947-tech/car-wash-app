import React, { useEffect, useReducer, useState } from 'react';
import {View,Text,ImageBackground, StyleSheet, Dimensions, StatusBar, useColorScheme, Image, ScrollView, TouchableOpacity, FlatList, LogBox} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from "@react-navigation/native";
import { atob, btoa } from 'react-native-quick-base64'; 
import SQLite from "react-native-sqlite-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import UseBle, { CarNo, listView } from '../useBle';
export default function List ({ }){
    const { requestPermissions,helloSend, scanforDevices,statusSend, allDevices, connectToDevice, currentDevice, message, sendData, heartRate, disConnectionHappened ,txtSend} = UseBle();
//  let low = await AsyncStorage.getItem('lowT');
//AsyncStorage.setItem('Mac', mac);
LogBox.ignoreAllLogs()
var abc;
var bcd;
const [similarity1,setSimilarity1] = useReducer((state: any, actionData: any) => ([...state, ...actionData]), []);
let data: string | never[] = [] ;
const navigation=useNavigation();
useEffect(()=>{
const abc = listView?.split("Car Detected --")
console.log("---------------")
    for(var i=2;i<abc?.length;i++){
       
        console.log(abc[i])
      
        data.push(abc[i])
    }
    setSimilarity1(data)
},[])
const reset = async()=>{
    setTimeout(()=>{
        navigation.reset({
            index: 0,
            routes: [{ name: "List" as never}],
          })
    },1500)
}
return(
  <ScrollView style={{backgroundColor:"#cccccc",flex:1}}>
    <View style={{backgroundColor:"#cccccc",}}>
    <StatusBar backgroundColor={"#CCCCCC"} barStyle="dark-content" />
        <TouchableOpacity style={{marginTop:40}} onPress={()=>navigation.reset({
  index: 0,
  routes: [{ name: "Home" as never}],
})}>
  <Image style={{height:35,width:35,marginLeft:20,borderRadius:50
}} source={require("../img/back2.png")}></Image>
</TouchableOpacity>
    <TouchableOpacity onPress={()=>{helloSend("list,123");reset();    }}>
    <View style={{alignItems:"center",borderWidth:2,width:scale(145),
    alignSelf:"center",marginTop:-25,height:40,justifyContent:"center",backgroundColor:"gray"}}>
        <Text style={{color:"white",fontSize:16,fontWeight:"600"}}>Show List</Text>
        </View>
</TouchableOpacity>
<View >
    <Text style={{marginLeft:10,alignSelf:"center",fontSize:21,marginTop:20,
    fontWeight:'600',borderBottomWidth:2,width:350,}}>List & Summary of Detected Card:</Text>
<View style={{marginTop:10,borderBottomColor:"black",borderBottomWidth:2,width:337,alignSelf:"center"}}></View>
{/* <Text style={{marginLeft:45,fontSize:18,marginTop:10}}>
    
 {listView?.split("nullCar Detected --CAR_STATUS,CAR_NUMBER,    ")}
</Text> */}
{/* 
<Text>{similarity1}</Text>
<Text>----------</Text> */}
<FlatList
style={{marginLeft:65,marginTop:10,}}
             data={similarity1}
             renderItem={({ item }) => {
                 return ( 
<Text style={{fontSize:18,}}>{item}</Text>
                 )}}/>
    </View>

</View>
</ScrollView>
)
}