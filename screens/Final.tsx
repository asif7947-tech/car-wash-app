import React, { useEffect, useState } from 'react';
import {View,Text,ImageBackground, StyleSheet, Dimensions, StatusBar, useColorScheme, Image, ScrollView, TouchableOpacity, Alert, LogBox} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from "@react-navigation/native";
import { atob, btoa } from 'react-native-quick-base64';
import SQLite from "react-native-sqlite-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import UseBle, { CarNo } from '../useBle';
export default function Final ({ route }){
const { requestPermissions, scanforDevices,statusSend, allDevices, connectToDevice, currentDevice, message, sendData, heartRate, disConnectionHappened ,txtSend} = UseBle();
LogBox.ignoreAllLogs();
useEffect(()=>{
if(route.params.color == "green"){
console.log()
setColor("#000000")  
setStatus("Car Washed"+","+route.params.values+",")

}else{
setColor("#cccccc") 
}
if(route.params.color == "red"){
console.log()
setColor1("#000000")  
setStatus("Work Pending"+","+route.params.values+",")

}else{
setColor1("#cccccc") 
}
},[])

const navigation=useNavigation();
const [color,setColor] = useState("#cccccc")
const [color1,setColor1] = useState("#cccccc")
const [status,setStatus] = useState("")
const done = async() =>{
setColor("#000000")
setColor1("#cccccc")
setStatus("Car Washed"+","+route.params.values+",")
}
const pending = async() =>{
setColor("#cccccc")
setColor1("#000000")
setStatus("Work Pending"+","+route.params.values+",")
}
const sendStatus = async() =>{
console.log(status)
statusSend(status);
AsyncStorage.setItem('status', status)
var newStatus = await AsyncStorage.getItem('status');
var newdata = newStatus?.split(",")
console.log(newdata[0],newdata[1],"gggggggggg")
const db = SQLite.openDatabase({
name: 'mydb',
location: 'default'
},
() => {
console.log("Database connected!")
}, 
error => console.log("Database error", error) 
)
const updateUser = () => {
let sql = 'UPDATE users3 SET status = ? WHERE CarNo = ?';
let params = [newdata[0], "Car Detected --"+route.params.values];
navigation.reset({
index: 0,
routes: [{ name: "Home" as never }],
})
db.executeSql(sql, params, (resultSet) => {
console.log("Success", "Record updated successfully");
}, (error) => {
console.log(error);
});
}
updateUser();
}
const DeleteStatus = async() =>{
console.log("in delete function")
var newStatus = await AsyncStorage.getItem('status');
var newdata = newStatus?.split(",")
console.log(newdata[0],newdata[1],"gggggggggg")
const db = SQLite.openDatabase({
name: 'mydb',
location: 'default'
},
() => {
console.log("Database connected!")
}, 
error => console.log("Database error", error) 
)
const deleteUser = () => {
let sql = "DELETE FROM users3 WHERE CarNo = ?";
let params = ["Car Detected --"+route.params.values];
db.executeSql(sql, params, (resultSet) => {
console.log("Success", "User deleted successfully");
navigation.reset({
index: 0,
routes: [{ name: "Home" as never }],
})

}, (error) => {
console.log("Delete user error", error);
})
}
deleteUser();
}

return(
<View style={{flex:1,backgroundColor:"#CCCCCC"}}>
<StatusBar backgroundColor={"#CCCCCC"} barStyle="dark-content" />
<TouchableOpacity style={{marginTop:40}} onPress={()=>navigation.reset({
index: 0,
routes: [{ name: "Home" as never}],
})}>
<Image style={{height:40,width:40,marginLeft:20,borderRadius:50
}} source={require("../img/back2.png")}></Image>
</TouchableOpacity>
<Text style={{alignSelf:"center",marginTop:20,fontSize:20}}>CAR NO:{(route.params.values?.toUpperCase())}</Text>
<TouchableOpacity onPress={done}>
<View style={{flexDirection:"row",marginTop:50}}>
<View>
<View style={{width:20,height:20,borderWidth:2,marginLeft:50,marginTop:6,backgroundColor:color}}></View>
</View>
<View>
<Text style={{marginLeft:40,fontSize:20,fontWeight:"600",color:"#000000"}}>
Car Washed
</Text>
</View>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={pending}>
<View style={{flexDirection:"row",marginTop:70}}>
<View>
<View style={{width:20,height:20,borderWidth:2,marginLeft:50,marginTop:6,backgroundColor:color1}}></View>
</View>
<View>
<Text style={{marginLeft:40,fontSize:20,fontWeight:"600",color:"#000000"}}>
Work Pending
</Text>
</View>
</View>
</TouchableOpacity>
<View style={{flexDirection:"row"}}>
<TouchableOpacity style={{alignItems:"center",alignSelf:"center",marginTop:50,marginLeft:18,
width:160,height:60,borderColor:"black",borderWidth:2,justifyContent:"center",backgroundColor:"gray"}}
onPress={sendStatus}>
<Text style={{fontSize:20,fontWeight:"700",color:"#000000"}}>
Send Status
</Text>
</TouchableOpacity>
<TouchableOpacity style={{alignItems:"center",alignSelf:"center",marginTop:50,marginLeft:20,
width:160,height:60,borderColor:"black",borderWidth:2,justifyContent:"center",backgroundColor:"gray"}}
onPress={DeleteStatus}>
<Text style={{fontSize:20,fontWeight:"700",color:"#000000"}}>
Delete Car
</Text>
</TouchableOpacity>
</View>
</View>
)
}