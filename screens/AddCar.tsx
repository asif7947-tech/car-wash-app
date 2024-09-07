import React, { useEffect, useReducer, useRef, useState } from 'react';
import {View,Text, ImageBackground, StyleSheet, Dimensions, StatusBar, useColorScheme, Image, ScrollView, TouchableOpacity, FlatList, Alert, RefreshControl, TextInput} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from "@react-navigation/native";
import SQLite from "react-native-sqlite-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import UseBle, { CarNo,refresh } from '../useBle';
import { useUpdateEffect } from 'usehooks-ts'


export default function AddCar (){
const { requestPermissions,helloSend, scanforDevices,statusSend, allDevices, connectToDevice, currentDevice, message, sendData, heartRate, disConnectionHappened ,txtSend} = UseBle();
const navigation=useNavigation();
const [carData,setCarData] =useState("")
const SendCarData = async() =>{
    console.log(carData?.toLowerCase(),"data ***********")
    helloSend("CarNo:"+"-"+carData+",")
   // navigation.navigate("Home" as never)
}
return(
    <View style={{backgroundColor:"#CCCCCC",flex:1,}}>
<StatusBar backgroundColor={"#CCCCCC"} barStyle="dark-content" />
<TouchableOpacity style={{marginTop:scale(30)}} onPress={()=>navigation.navigate( "Home" as never)}>
<Image style={{height:35,width:35,marginLeft:20,borderRadius:50
}} source={require("../img/back2.png")}></Image>
</TouchableOpacity>
<TextInput style={{borderWidth:1,width:scale(320),alignSelf:"center",borderRadius:10,textAlign:"center",height:scale(40),
color:'black',borderColor:"black",marginTop:scale(160)}} placeholder="Enter Car NO." onChangeText={(e)=>{setCarData(e)}}/>
{/* <TextInput style={{borderWidth:1,width:scale(320),alignSelf:"center",borderRadius:10,textAlign:"center",
color:'black',borderColor:"black",marginTop:scale(20)}} /> */}
<TouchableOpacity style={{marginTop:40}} onPress={SendCarData} >
       
       <View style={styles.box}>  
       <Text style={styles.percentTxt}>Send</Text>
      
       </View>
        
        </TouchableOpacity>
    </View>

)
}
const styles = StyleSheet.create({
    backImg:{
        flex:1,
height:Dimensions.get("window").height,
width:Dimensions.get("window").width,
alignItems:"center",justifyContent:"center",alignContent:"center"
    },
    graph:{
        height:55,width:190,opacity:1,
       alignSelf:"center"
    },
    graph1:{
        height:55,width:Dimensions.get("window").width/1.08,opacity:1,
       alignSelf:"center"
    },
    percentTxt:{
        alignSelf:"center",
        fontSize:30,
        color:"black",
        fontWeight:"800",
       borderColor:"yellow",
            },
    box:{
height:55,width:(190),
backgroundColor:"gray",alignSelf:"center",opacity:0.8,
borderRadius:6,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"black"
    },
    box1:{
        height:55,width:Dimensions.get("window").width/1.08,
       alignSelf:"center",opacity:0.8,
        borderRadius:6,alignItems:"center",justifyContent:"center",borderWidth:2,borderColor:"black"
            },
})