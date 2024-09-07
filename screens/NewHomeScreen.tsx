import React, { useEffect, useReducer, useRef, useState } from 'react';
import {View,Text, ImageBackground, StyleSheet, Dimensions,Modal, StatusBar, useColorScheme, Image, ScrollView, TouchableOpacity, FlatList, Alert, RefreshControl, TextInput} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from "@react-navigation/native";
import SQLite from "react-native-sqlite-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import UseBle, { CarNo,refresh,waterstatus } from '../useBle';
import { useUpdateEffect } from 'usehooks-ts'
export default function Home ({ }){
const { requestPermissions,helloSend, scanforDevices,statusSend, allDevices, connectToDevice, currentDevice, message, sendData, heartRate, disConnectionHappened ,txtSend} = UseBle();

const [refreshList, setRefreshList] = useState(false);
const [similarity,setSimilarity] = useReducer((state: any, actionData: any) => ([...state, ...actionData]), []);
let data: string | never[] = [] ;
var newCar=""
const [carName,setCarName] = useState("")
var CARNO = "";
useEffect(()=>{
const interval = setInterval(()=>{ 
CarNo
setCarName(CarNo)
refresh;
if (refresh == null){
console.log(refresh,"value of refresh")
}else{
    console.log(refresh,"refresh value is not null")

    navigation.reset({
        index: 0,
        routes: [{ name: "Home" as never}],
        }) 
}
CARNO = "gggg"
// console.log(CarNo)
},1000) 
return () => {
clearInterval(interval);
}; 
},[])
const [isModalvisible, setisModalVisible] = useState<boolean>(false);
const [url1, setURL1] = useState("");
const [url2, setURL2] = useState("");

useEffect(()=>{  
const databaseSetup = async() =>{
const db = SQLite.openDatabase({
name: 'mydb',
location: 'default'
},
() => {
console.log("Database connected!")
}, 
error => console.log("Database error", error) 
)
const createUserTable = () => {
db.executeSql("CREATE TABLE IF NOT EXISTS users3 (CarNo VARCHAR PRIMARY KEY, status VARCHAR)", [], (result) => {
console.log("Table created successfully");
}, (error) => {
console.log("Create table error", error)
})

}
createUserTable();
const interval = setInterval(()=>{

const createUser = () => {
console.log(newCar,CarNo,"this is values")
if(newCar == CarNo || CarNo == null || CarNo == "null"){
//console.log("same values")
}else{
console.log("Inserted")
let sql = "INSERT INTO users3 (CarNo , status ) VALUES (?, ?)";
let params = [CarNo, " "]; //storing user data in an array
db.executeSql(sql, params, (result) => {
}, (error) => {
console.log("Create user error", error);
});
}
newCar = CarNo;
}
createUser()
setRefreshList(true)
},1000) 
const listUsers = async () => {
setRefreshList(true)
let sql = "SELECT * FROM users3";
db.transaction((tx) => {
tx.executeSql(sql, [], (tx, resultSet) => {
var length = resultSet.rows.length;
for (var i = 0; i < length; i++) {
console.log(resultSet.rows.item(i),"hhhhhhhhhh");
data.push(resultSet.rows.item(i).status+"  "+(resultSet.rows.item(i).CarNo).split("Car Detected --"));
}
setSimilarity(data)

console.log(data)
}, (error) => {
console.log("List user error", error);
})
})
}
listUsers()   
return () => {
clearInterval(interval);
}; 
}
databaseSetup();
},[])
useUpdateEffect(() => {
const databaseSetup = async() =>{
const db = SQLite.openDatabase({
name: 'mydb',
location: 'default'
},
() => {
console.log("Database connected!")
}, 
error => console.log("Database error", error) 
)
const createUserTable = () => {
db.executeSql("CREATE TABLE IF NOT EXISTS users3 (CarNo VARCHAR PRIMARY KEY, status VARCHAR)", [], (result) => {
console.log("Table created successfully");
}, (error) => {
console.log("Create table error", error)
})

}
createUserTable();
const interval = setInterval(()=>{

const createUser = () => {
console.log(newCar,CarNo,"this is values")
if(newCar == CarNo || CarNo == null || CarNo == "null"){
console.log("same values")
}else{
console.log("Inserted")
let sql = "INSERT INTO users3 (CarNo , status ) VALUES (?, ?)";
let params = [CarNo, " "]; //storing user data in an array
db.executeSql(sql, params, (result) => {
}, (error) => {
console.log("Create user error", error);
});
}
newCar = CarNo;
}
createUser()
setRefreshList(true)
},1000) 
const listUsers = async () => {
setRefreshList(true)
let sql = "SELECT * FROM users3";
db.transaction((tx) => {
tx.executeSql(sql, [], (tx, resultSet) => {
var length = resultSet.rows.length;
for (var i = 0; i < length; i++) {
console.log(resultSet.rows.item(i),"hhhhhhhhhh");
data.push(resultSet.rows.item(i).status+"  "+(resultSet.rows.item(i).CarNo).split("Car Detected --"));
}
setSimilarity(data)

console.log(data)
}, (error) => {
console.log("List user error", error);
})
})
}
listUsers()   
return () => {
clearInterval(interval);

}; 
}
databaseSetup();
}, [])
const isInitialMount = useRef(true);

useEffect(()=>{
const interval = setInterval(()=>{ 
setRefreshList(true) 
},1000) 
return () => {
clearInterval(interval);
};
},[])
const [refreshing, setRefreshing] = React.useState(false);

const onRefresh = React.useCallback(() => {
console.log("in referesh")
setRefreshing(true);
navigation.reset({
index: 0,
routes: [{ name: "Home" as never}],
})
setTimeout(() => {
console.log("out referesh")
setRefreshing(false);
}, 2000);
}, []);
const navigation=useNavigation();

const isDarkMode = useColorScheme() === 'dark';
const backgroundStyle = {
backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};

const [color1,setColor1] = useState("#cccccc")
const [newItem,setNewItem] = useState("")
const [pump,setpump] = useState("OFF")
const setNewColor = async(item: React.SetStateAction<string>) =>{
setNewItem(item)
setColor1("#42B6FE")
}
const sendIP = async() =>{
    console.log(url1,url2,"camip,"+url1.replace(":","-")+","+url2.replace(":","-"))
    
    helloSend("camip,"+url1.replaceAll(":","-")+","+url2.replaceAll(":","-"))
    setisModalVisible(false)
}
return(
<View style={{flex:1,backgroundColor:"#CCCCCC"}}>
<StatusBar backgroundColor={"#CCCCCC"} barStyle="dark-content" />
<Modal visible={isModalvisible} animationType='slide'>
<View style={{flex:1,backgroundColor:"#CCCCCC"}}>
<TouchableOpacity style={{marginTop:20}} onPress={()=>setisModalVisible(false)}>
<Image style={{height:35,width:35,marginLeft:15,borderRadius:50
}} source={require("../img/back2.png")}></Image>
</TouchableOpacity>
<TextInput  placeholder='Enter URL1' style={{width:scale(300),height:scale(60),borderColor:"black",borderWidth:1,marginTop:100,
alignSelf:"center",borderRadius:5,}} onChangeText={(e)=>setURL1(e)} />
<TextInput placeholder='Enter URL2' style={{width:scale(300),height:scale(60),borderColor:"black",borderWidth:1,marginTop:20,
alignSelf:"center",borderRadius:5,}} onChangeText={(e)=>setURL2(e)}/>
<TouchableOpacity style={{borderColor:"black",backgroundColor:"gray",borderWidth:2,borderRadius:5,
alignItems:"center",width:scale(115),alignSelf:"center",marginTop:20,justifyContent:'center'}} onPress={sendIP} >
    <Text style={{alignSelf:"center",marginTop:scale(0),
fontSize:20,fontWeight:"600",color:"#ffffff",height:scale(50),paddingTop:scale(10)}}>Send Url</Text>
</TouchableOpacity>
</View>
</Modal>
<View style={{flexDirection:"row",marginTop:20}}>
<TouchableOpacity style={{borderColor:"black",backgroundColor:"gray",borderWidth:2,borderRadius:5,
alignItems:"center",width:scale(115),marginLeft:scale(2)}} onPress={()=>navigation.reset({
index: 0,
routes: [{ name: "Search" as never }],
})}>
    <Text style={{alignSelf:"center",marginTop:scale(0),
fontSize:20,fontWeight:"600",color:"#ffffff"}}>Back To Scan</Text>

{/* <Image style={{height:35,width:35,marginLeft:20,borderRadius:10
}} source={require("../img/back2.png")}></Image> */}
</TouchableOpacity>
<TouchableOpacity style={{borderColor:"black",backgroundColor:"gray",borderWidth:2,borderRadius:5,
alignItems:"center",width:scale(115),}} onPress={()=>setisModalVisible(true)}>
    <Text style={{alignSelf:"center",marginTop:scale(0),
fontSize:20,fontWeight:"600",color:"#ffffff"}}>IP Camera</Text>

{/* <Image style={{height:35,width:35,marginLeft:20,borderRadius:10
}} source={require("../img/back2.png")}></Image> */}
</TouchableOpacity>
<TouchableOpacity style={{borderColor:"black",backgroundColor:"gray",borderWidth:2,borderRadius:5,
alignItems:"center",width:scale(115),}} onPress={()=>{ navigation.navigate("Login" as never)}}>
<Text style={{alignSelf:"center",marginTop:scale(0),
fontSize:20,fontWeight:"600",color:"#ffffff"}}>Add Cars</Text>
{/* <Image style={{height:35,width:35,marginLeft:0,borderRadius:50
}} source={require("../img/add.png")}></Image> */}
</TouchableOpacity>
</View>
<Text style={{alignSelf:"flex-start",marginTop:scale(0),
fontSize:20,fontWeight:"600",color:"#000000",marginLeft:10}}>{waterstatus}</Text>
<Text style={{alignSelf:"center",marginTop:scale(0),
fontSize:20,fontWeight:"600",color:"#000000"}}>List Of Cars</Text>
<FlatList
data={similarity}
extraData={similarity}
renderItem={({ item }) => {
return (    
(((item)?.slice(0,12)) == "Work Pending")?
<TouchableOpacity onPress={()=>{navigation.navigate("Final" as never,{values:((item)?.slice(15,29)),color:"red"} as never)}}>
<View style={{alignItems:"center",borderWidth:2,width:scale(345),
alignSelf:"center",marginTop:10,height:40,justifyContent:"center",backgroundColor:"#F6714E"}}>
<Text style={{color:"white",fontSize:16,fontWeight:"600"}}>Car No: {((item)?.slice(15,29))?.toUpperCase()}</Text>
</View>
</TouchableOpacity>:(((item)?.slice(0,10)) == "Car Washed")?
<TouchableOpacity onPress={()=>{navigation.navigate("Final" as never,{values:((item)?.slice(13,29)),color:"green"} as never)}}>
<View style={{alignItems:"center",borderWidth:2,width:scale(345),
alignSelf:"center",marginTop:10,height:40,justifyContent:"center",backgroundColor:"#78A447"}}>
<Text style={{color:"white",fontSize:16,fontWeight:"600"}}>Car No: {((item)?.slice(13,29))?.toUpperCase()}</Text>
</View>
</TouchableOpacity>:

<TouchableOpacity onPress={() => { navigation.navigate("Final" as never, { values: ((item)?.slice(4, 20)) } as never); } }>
<View style={{
alignItems: "center", borderWidth: 2, width: scale(345),
alignSelf: "center", marginTop: 10, height: 40, justifyContent: "center", backgroundColor: "gray"
}}>
<Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>Car No: {((item)?.slice(4, 20))?.toUpperCase()}</Text>
</View>
</TouchableOpacity>
)}} />
<View style={{flexDirection:"row",alignSelf:"center"}}>
<TouchableOpacity onPress={()=>{ navigation.reset({
index: 0,
routes: [{ name: "List" as never}],
})}} >
   
<View style={{alignItems:"center",borderWidth:2,width:scale(145),
alignSelf:"center",height:40,justifyContent:"center",backgroundColor:"gray"}}>
<Text style={{color:"white",fontSize:16,fontWeight:"600",fontFamily:"Arial"}}>Show List</Text>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={()=>{
    if(pump == "OFF"){
        helloSend("pump-off,123")
        setpump("ON")
    }else{
        helloSend("pump-on,123")
        setpump("OFF")
    }
     
     }} style={{marginBottom:scale(8)}}>
    

<View style={{alignItems:"center",borderWidth:2,width:scale(145),marginBottom:scale(8),
alignSelf:"center",marginTop:0,height:40,justifyContent:"center",backgroundColor:"gray"}}>
<Text style={{color:"white",fontSize:16,fontWeight:"600",fontFamily:"Arial"}}>PUMP {pump}</Text>
</View>
</TouchableOpacity>
</View>
</View>
)
}


