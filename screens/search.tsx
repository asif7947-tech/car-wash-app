import React, { useEffect, useState } from 'react';
import {View,Text, ImageBackground, StyleSheet, Dimensions, StatusBar, useColorScheme, Image, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import { Device } from 'react-native-ble-plx';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import UseBle from "../useBle";
import { atob, btoa } from 'react-native-quick-base64';
import { useNavigation } from "@react-navigation/native";

export default function Search ({ }){
    const navigation=useNavigation();
    const graph = require("../img/abc.jpg")

    const { requestPermissions,helloSend, scanforDevices, allDevices, connectToDevice, currentDevice, message, sendData, heartRate, disConnectionHappened ,txtSend} = UseBle();
    const [scanText, setScanText] = useState<string>("Start Scanning");    /// Changes scan button text when pressed..
    const [availableText, setAvailableText] = useState<string>("");
    const [Refreshing, setRefreshing] = useState(false);
    const [color, setColor] = useState("#A0A0A0");
    
    const [currentDeviceName, setCurrentDeviceName] = useState<any>(" ");
    const [currentDeviceNameHeader, setCurrentDeviceNameHeader] = useState<any>("Connecting..");
    const openModal = async () => {
        helloSend("disconnect,")
        requestPermissions((isGranted: boolean) => {
            if (isGranted) {
                scanforDevices();
                handeleSetScanText();
            }
        })
    };
    const abc = async (item: Device) => {
      connectToDevice(item)
      helloSend("123")
    }
    const currentDeviceChecker = async (device: Device) => {
      setCurrentDeviceNameHeader("Trying to Connect...");
      setCurrentDeviceName(" ");
      setTimeout(() => {
          if (currentDevice !== undefined) {                    ///originally it was only CurrentDevice
              setCurrentDeviceName(device.name);
              setCurrentDeviceNameHeader("Connected: ")
              console.log("Should connect.." + currentDevice?.name);
              console.log("isConnected" + currentDevice?.isConnected);
             // helloSend("list,123")
  
          } else {
              setCurrentDeviceNameHeader("Not Connected");
              setCurrentDeviceName(" ");
            // helloSend("list,123")
          }
      }, 6000);
  
     
  };
    const handeleSetScanText = () => {                                  ////scan button text handler.
        if (scanText === "Start Scanning") {
            setScanText("Scanning for Devices....")
            setAvailableText("AVAILABLE DEVICES:")
        } else {
            setScanText("Start Scanning")
        }
    };
    const listRefreshHandler = () => {
        if (allDevices != null) {
            setRefreshing(true);                      //this is for handling the flatlist refresh state
            scanforDevices();
            setScanText("Scanning for Devices....")
            setRefreshing(false);
        }
    };
    const back = require("../img/back.png")

return(
    <View style={{flex:1,backgroundColor:"#CCCCCC"}}>
        <StatusBar backgroundColor={"#CCCCCC"} barStyle="dark-content" />

        <TouchableOpacity style={{marginTop:40}} onPress={openModal}>
       
 <View style={styles.box}>  
 <Text style={styles.percentTxt}>Start Scan</Text>

 </View>
  
  </TouchableOpacity>
        <FlatList
             data={allDevices}
             refreshing={Refreshing} onRefresh={listRefreshHandler}
             extraData={allDevices}
             renderItem={({ item }) => {
                 return (
                     <TouchableOpacity 
                     onPress={() => {      connectToDevice(item); console.log(item.mtu);
                         navigation.navigate("Home" as never); //helloSend("list,123");
                        currentDeviceChecker(item);
                     }} style={{marginTop:15}}>
                           {/* <ImageBackground source={graph} style={styles.graph1}  imageStyle={{ borderRadius: 6}}> */}
                         <View style={styles.box1}>
                             <Text style={{color:"#000000",fontFamily:"BaiJamjuree-Light",fontSize:21,fontWeight:"500",padding:2}} >{item.name} {"\n"} 
                             <Text style={{color:"black",fontFamily:"BaiJamjuree-SemiBold",fontSize:18}}>{item.id}</Text>
                             </Text>

                         </View>
                         {/* </ImageBackground> */}
                     </TouchableOpacity>
                 )
             }}
         />
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