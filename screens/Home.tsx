import React, { useEffect, useReducer, useRef, useState } from 'react';
import {View,Text, ImageBackground, StyleSheet, Dimensions, StatusBar, useColorScheme, Image, ScrollView, TouchableOpacity, FlatList, Alert, RefreshControl} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from "@react-navigation/native";
import SQLite from "react-native-sqlite-storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import UseBle, { CarNo,refresh } from '../useBle';
import { useUpdateEffect } from 'usehooks-ts'
export default function Home ({ }){
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
const setNewColor = async(item: React.SetStateAction<string>) =>{
setNewItem(item)
setColor1("#42B6FE")
}

return(
<View style={{flex:1,backgroundColor:"#CCCCCC"}}>
<StatusBar backgroundColor={"#CCCCCC"} barStyle="dark-content" />

<View style={{flexDirection:"row"}}>
<TouchableOpacity style={{marginTop:40}} onPress={()=>navigation.reset({
index: 0,
routes: [{ name: "Search" as never }],
})}>
<Image style={{height:35,width:35,marginLeft:20,borderRadius:50
}} source={require("../img/back2.png")}></Image>
</TouchableOpacity>
<Text style={{alignSelf:"center",marginTop:scale(40),marginHorizontal:scale(70),fontSize:20,fontWeight:"600",color:"#000000"}}>List Of Cars</Text>
<TouchableOpacity style={{marginTop:40}} onPress={()=>{ navigation.navigate("Login" as never)}}>

<Image style={{height:35,width:35,marginLeft:0,borderRadius:50
}} source={require("../img/add.png")}></Image>
</TouchableOpacity>
</View>
{/* {CarNo != null?
    <TouchableOpacity style={{marginTop:20}} onPress={()=>{navigation.navigate("Final",{values:CarNo?.slice(15,25),show:"false"})}}>
<View style={{alignItems:"center",borderWidth:2,width:scale(345),
alignSelf:"center",marginTop:10,height:40,justifyContent:"center",backgroundColor:"gray"}}>
<Text style={{color:"white",fontSize:16,fontWeight:"600"}}>Car No: {(CarNo.slice(15,25))?.toUpperCase()}</Text>
</View></TouchableOpacity> 
:null } */}


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

<TouchableOpacity onPress={()=>{ navigation.reset({
index: 0,
routes: [{ name: "List" as never}],
})}}>
    
<View style={{alignItems:"center",borderWidth:2,width:scale(145),marginBottom:scale(3),
alignSelf:"center",marginTop:0,height:40,justifyContent:"center",backgroundColor:"gray"}}>
<Text style={{color:"white",fontSize:16,fontWeight:"600"}}>Show List</Text>
</View>
</TouchableOpacity>
</View>
)
}


