import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity, LogBox, SafeAreaViewBase, StyleSheet, DrawerLayoutAndroid, FlatList, StatusBar, ImageBackground, ScrollView ,Dimensions,TextInput, ActivityIndicator,ToastAndroid,Platform, Alert,KeyboardAvoidingView  } from "react-native";

import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

import { Defs,  Stop, SvgXml,G,ClipPath,Rect } from 'react-native-svg';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from "react-native-svg";

 import { btoa, atob } from 'react-native-quick-base64'
export default TestScreen = ({ route }) => {

  const handleModal = () => setIsModalVisible(() => !isModalVisible,);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();

  const [history1, setHistory1] = useState("");
  const [results, setResults] = useState("");

  //const[output,setOutput]=useReducer((state, actionData) => ([...state, ...actionData]), []);

  
  const handleModal2 = () => setIsModalVisible2(() => !isModalVisible2);
  const [isModalVisible2, setIsModalVisible2] = React.useState(false); 
  const handleModal3 = () => setIsModalVisible3(() => !isModalVisible3);
  const [isModalVisible3, setIsModalVisible3] = React.useState(false); 
  const handleModalp = () => setIsModalVisiblep(() => !isModalVisiblep);
  const [isModalVisiblep, setIsModalVisiblep] = React.useState(false); 
  const handleModaln = () => setIsModalVisiblen(() => !isModalVisiblen);
  const [isModalVisiblen, setIsModalVisiblen] = React.useState(false); 
  const[cameras,setcamera]=useState(false)
  const[mic,setMic]=useState(false)
  const[spk,setSpk]=useState(false)
  const[shdclr,setShdclr]=useState("rgba(0, 178, 255, 1)")
  const[shdclr1,setShdclr1]=useState("rgba(0, 178, 255, 1)")
  const[mktxt,srtMktxt]=useState("Tap to start")
  
  const[text,setText]=useState("")
  const[text1,setText1]=useState("")
  const[afttxt,setAfttxt]=useState(false)
  const[processing,setProcessing]=useState(false)
  const[animation,setAnimation]=useState(true)
  const[resultscreen,setResultscreen]=useState(true)
  const[datas,setDatas]=useState("");
  const[bottomview,setBottomview]=useState(true)
  const[fillcl,setFillcl]=useState("#636363")
  const[fillcl1,setFillcl1]=useState("#636363")
  const[btn,setBtn]=useState(true)
  const base64 = btoa('foo')
  const[lsttxt,setLsttxt]=useState(false)
  const[positn,setPositn]=useState(106)
  const[language,setLanguage]=useState('')
  const[micb,setMicb]=useState(false)
  const[ena,setEna]=useState(false)
  const[ena1,setEna1]=useState(false)
  const[ena2,setEna2]=useState(false)
  const[ena3,setEna3]=useState(false)
  const[tname,setTname]=useState('')
  const[tsname,setStname]=useState('')
  const[linmic,setLinmic]=useState(true)
  const decoded = atob(base64)
  const[bottomview1,setBottomview1]=useState(true)
  const[bottomlistn,setBottomlistn]=useState(false)
  const[disabinput,setDisabinput]=useState(false)
  const[enables,setEnables]=useState(true)
  const[udmic,setUdmic]=useState(true)
  const[inputwidth,setInputwidth]=useState(242)
  const[leftposition,setLeftposition]=useState(100)
  const[leftposition1,setLeftposition1]=useState(-80)
  const[positiveview,setPositiveview]=useState(false)
  const[star1,setStar1]=useState(true)
  const[star2,setStar2]=useState(true)
  const[star3,setStar3]=useState(true)
  const[star4,setStar4]=useState(true)
  const[star5,setStar5]=useState(true)
  const[start1,setStart1]=useState(false)
  const[start2,setStart2]=useState(false)
  const[start3,setStart3]=useState(false)
  const[start4,setStart4]=useState(false)
  const[start5,setStart5]=useState(false)
  const[ratingtxt,setRatingtxt]=useState(true)
  const[useremail,setUseremail]=useState('')
  const [emailData, setEmailData] = useState({
    senderAddress: 'DoNotReply@7efa991d-3e2f-4cea-acfe-c19eecaaa842.azurecomm.net',
    recipients: {
      to: [{ address: 'reactexpert89@gmail.com' }],
    },
    content: {
      subject: 'Test Email',
      plainText: 'Hello world via email.',
    },
  });
  const [authToken, setAuthToken] = useState('eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNUVCMzFEMzBBMjBEQkRBNTMxODU2MkM4QTM2RDFCMzIyMkE2MTkiLCJ4NXQiOiJZRjZ6SFRDaURiMmxNWVZpeUtOdEd6SWlwaGsiLCJ0eXAiOiJKV1QifQ.eyJza3lwZWlkIjoiYWNzOmEzZmIwYzAwLWFhNTctNDYwOC05OGZjLWU4N2I0YjdkNDAxN18wMDAwMDAyMC04MWQ1LTE0MWQtNDYwNi02YjNhMGQwMDMxYWMiLCJzY3AiOjE3OTIsImNzaSI6IjE3MTc0ODI3NzgiLCJleHAiOjE3MTc1NjkxNzgsInJnbiI6ImF1IiwiYWNzU2NvcGUiOiJjaGF0LHZvaXAiLCJyZXNvdXJjZUlkIjoiYTNmYjBjMDAtYWE1Ny00NjA4LTk4ZmMtZTg3YjRiN2Q0MDE3IiwicmVzb3VyY2VMb2NhdGlvbiI6ImF1c3RyYWxpYSIsImlhdCI6MTcxNzQ4Mjc3OH0.PQ-ETeNFvmmQ-LyoxyL2ZVyRFeSThBpYhpmFYiEMkn_eX_6bPpdTL7qBhYvgucvkuWw9bZYU2YDJB8yJJWTLEt6JJWumLGX75FE4Cc6oA6FC6Bnz3s1X95m6SwAvMygE_5R5o9oiG-ekWDX4qvRxV-cFq5_zGUHgR-iMPf8GBhTipQv04tkqqx42jyDkVduM9Mf25OLARZWNtfI_wg8SxDMyMXzLZ8DoUkNzeJRq6jZNny2uprvIpuwe7hpgY-l2dEa8M5VqSS337IRR6ySbqY-tgtK2bo3iRdZm3FtBE3sCWV9zJjf3a_pPK7SGQanPO14upsxl1-Jl4MprPDoCnA');












  // const[cameraimg,setCameraimg]=useState('')
  LogBox.ignoreAllLogs();



  useEffect(() => {
    const loadURL = async () => {
      let name = await AsyncStorage.getItem('name');
      if (name) {

        console.log(name, "name")
      }
    }
    loadURL();
  }, [])




  useEffect(() => {
    const loadHistory1 = async () => {
      let history1 = await AsyncStorage.getItem('history1');
      if (history1) {
        setHistory1(history1);
      }
    }
    loadHistory1();
  }, [])
  useEffect(() => {
    AsyncStorage.setItem('history1', history1);
  }, [history1])
  // const key = '@MyApp:key';



  useEffect(() => {

    const loadHis = async () => {
      let results = await AsyncStorage.getItem('results');
      if (results) {
        setResults(results);
        console.log("Customer_id......", results)
      }
    }
    loadHis();
  }, [])


  useEffect(() => {
    const loadHi = async () => {
      await AsyncStorage.setItem('results', results);
    }
    loadHi();
  }, [results])


  const [galleryPhoto, setGalleryPhoto] = useState('');



  const [display, setDisplay] = useState(false)
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const newName = route.params?.newName
  // console.log(newName)
  //   useEffect=(()=>{
  var a
  if (newName != undefined) {
    for (var i = 0; i <= 1; i++) {
      a = JSON.stringify(newName)
      console.log(a, "newname")


    }
    console.log(a, "name")

  }












var date = new Date();







const startfun1=async()=>{
  setStar1(false)

  setStart1(true)
  setStart2(true)
  setStart3(true)
  setStart4(true)
  setStart5(true)
 setRatingtxt(false)




 console.log(text,"enterd text")
 const url = `https://acaiapp.azurewebsites.net/?client_id=${results}&status=positive&msg=${text}&new_timestamp=${date}`;
 console.log("jdchkjhv")
 
 
 var result = await fetch(url);
 result = await result.json();
 console.log(result, "this is result");
 
 fetch("https://pythianode.azurewebsites.net/send",{
   method:"POST",
   headers:{
       Accept:"application/json",
       "Content-Type":"application/json"
   },
   body:JSON.stringify({
 "topics":"Pythia app Response Rating",
 "text":`Pythia App Response \n Score : 1 \n Name : ${tname} ${tsname} \n Email : ${useremail} \n User Notes : ${text} \n AI Response : ${datas.content}`
   }),
  })
  .then((response)=>response.json())
   .then((res)=>{
       console.log(res,"response after sending email");
   }).catch((error)=>{
       console.log(error)
   })
  
 setDisplay(false)






}

const startfun2=async()=>{
  setStar1(false)
  setStar2(false)

  setStart1(true)
  setStart2(true)
  setStart3(true)
  setStart4(true)
  setStart5(true)
  setRatingtxt(false)



  const url = `https://acaiapp.azurewebsites.net/?client_id=${results}&status=positive&msg=${text}&new_timestamp=${date}`;
  console.log("jdchkjhv")
  
  
  var result = await fetch(url);
  result = await result.json();
  console.log(result, "this is result");
  
  fetch("https://pythianode.azurewebsites.net/send",{
    method:"POST",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
  "topics":"Pythia app Response Rating",
  "text":`Pythia App Response \n Score : 2 \n Name : ${tname} ${tsname} \n Email : ${useremail} \n User Notes : ${text} \n AI Response : ${datas.content}`
    }),
   })
   .then((response)=>response.json())
    .then((res)=>{
        console.log(res,"response after sending email");
    }).catch((error)=>{
        console.log(error)
    })





}


const startfun3=async()=>{
  setStar1(false)
  setStar2(false)
  setStar3(false)

  setStart1(true)
  setStart2(true)
  setStart3(true)
  setStart4(true)
  setStart5(true)
  setRatingtxt(false)




  const url = `https://acaiapp.azurewebsites.net/?client_id=${results}&status=positive&msg=${text}&new_timestamp=${date}`;
 console.log("jdchkjhv")
 
 
 var result = await fetch(url);
 result = await result.json();
 console.log(result, "this is result");
 
 fetch("https://pythianode.azurewebsites.net/send",{
   method:"POST",
   headers:{
       Accept:"application/json",
       "Content-Type":"application/json"
   },
   body:JSON.stringify({
 "topics":"Pythia app Response Rating",
 "text":`Pythia App Response \n Score : 3 \n Name : ${tname} ${tsname} \n Email : ${useremail} \n User Notes : ${text} \n AI Response : ${datas.content}`
   }),
  })
  .then((response)=>response.json())
   .then((res)=>{
       console.log(res,"response after sending email");
   }).catch((error)=>{
       console.log(error)
   })
}

const startfun4=async()=>{
  setStar1(false)
  setStar2(false)
  setStar3(false)
  setStar4(false)

  setStart1(true)
  setStart2(true)
  setStart3(true)
  setStart4(true)
  setStart5(true)
  setRatingtxt(false)


  const url = `https://acaiapp.azurewebsites.net/?client_id=${results}&status=positive&msg=${text}&new_timestamp=${date}`;
 console.log("jdchkjhv")
 
 
 var result = await fetch(url);
 result = await result.json();
 console.log(result, "this is result");
 
 fetch("https://pythianode.azurewebsites.net/send",{
   method:"POST",
   headers:{
       Accept:"application/json",
       "Content-Type":"application/json"
   },
   body:JSON.stringify({
 "topics":"Pythia app Response Rating",
 "text":`Pythia App Response \n Score : 4 \n Name : ${tname} ${tsname} \n Email : ${useremail} \n User Notes : ${text} \n AI Response : ${datas.content}`
   }),
  })
  .then((response)=>response.json())
   .then((res)=>{
       console.log(res,"response after sending email");
   }).catch((error)=>{
       console.log(error)
   })
}


const startfun5=async()=>{
  setStar1(false)
  setStar2(false)
  setStar3(false)
  setStar4(false)
  setStar5(false)

  setStart1(true)
  setStart2(true)
  setStart3(true)
  setStart4(true)
  setStart5(true)
  setRatingtxt(false)

  const url = `https://acaiapp.azurewebsites.net/?client_id=${results}&status=positive&msg=${text}&new_timestamp=${date}`;
 console.log("jdchkjhv")
 
 
 var result = await fetch(url);
 result = await result.json();
 console.log(result, "this is result");
 
 fetch("https://pythianode.azurewebsites.net/send",{
   method:"POST",
   headers:{
       Accept:"application/json",
       "Content-Type":"application/json"
   },
   body:JSON.stringify({
 "topics":"Pythia app Response Rating",
 "text":`Pythia App Response \n Score : 5 \n Name : ${tname} ${tsname} \n Email : ${useremail} \n User Notes : ${text} \n AI Response : ${datas.content}`
   }),
  })
  .then((response)=>response.json())
   .then((res)=>{
       console.log(res,"response after sending email");
   }).catch((error)=>{
       console.log(error)
   })
}

  return (

<>
<View>


{resultscreen?

<View style={{marginTop:scale(10),flex:1}}>
  <Text style={{color:"#636363",fontSize:moderateScale(17),fontFamily:"Montserrat-Medium",textAlign:"center"}}>Your formalized medical notes</Text>
<View  style={{   
    marginTop:scale(5),
   width:scale(338),
   alignSelf:"center",
   backgroundColor:"rgba(0, 0, 0, 0.04)",
   borderRadius:moderateScale(25),
   padding:moderateScale(5),
   paddingBottom:verticalScale(18),
   paddingLeft:scale(15),
   height:verticalScale(560)
  }}>
    <ScrollView>
  <Text style={{fontSize:moderateScale(16),color:"#000000",fontFamily:"Montserrat-Medium",}}>
    bfcgehydbgcfvbgghdxjxfvdhfgvbdgfbgrvhdsh cfhjv ghdvxc hbbdvs chbdhvbhjrbdschjbdvbc zdvhmsvf hdschv hdf hhjbfvbfv
  </Text>
  </ScrollView>
  </View>


  <View style={{alignSelf:"center",flexDirection:"column",marginTop:verticalScale(15)}}>

      {
        ratingtxt?
        <Text style={{fontWeight:"400",fontSize:moderateScale(12),color:"#484848",textAlign:"center",fontFamily:"Montserrat-Medium",}}>Rate Our response</Text>:
        <Text style={{fontWeight:"400",fontSize:moderateScale(12),color:"#484848",textAlign:"center",fontFamily:"Montserrat-Medium",}}>Thank you for rating!</Text>
      }
  


    <View style={{flexDirection:"row",marginTop:verticalScale(10),alignItems:"center"}}>
      <TouchableOpacity style={{height:verticalScale(24),width:scale(24)}} onPress={()=>startfun1()}  disabled={start1}>

        {star1?
    <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
<Path   d="M9.59999 15.6499L12 13.7999L14.4 15.6499L13.5 12.5999L15.75 10.9999H12.95L12 7.89991L11.05 10.9999H8.24999L10.5 12.5999L9.59999 15.6499ZM7.68999 18.3459L9.30399 13.0159L5.11499 9.99991H10.331L12 4.46191L13.67 9.99991H18.885L14.696 13.0159L16.31 18.3459L12 15.0699L7.68999 18.3459Z" fill="black"/>
</Svg> :
  <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
  <Path   d="M7.68999 18.3459L9.30399 13.0159L5.11499 9.99991H10.331L12 4.46191L13.67 9.99991H18.885L14.696 13.0159L16.31 18.3459L12 15.0699L7.68999 18.3459Z" fill="#F7C100"/>
  </Svg>
}



</TouchableOpacity> 
<TouchableOpacity style={{height:verticalScale(24),width:scale(24)}} onPress={()=>startfun2()}
disabled={start2}
>
{star2?
    <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
<Path   d="M9.59999 15.6499L12 13.7999L14.4 15.6499L13.5 12.5999L15.75 10.9999H12.95L12 7.89991L11.05 10.9999H8.24999L10.5 12.5999L9.59999 15.6499ZM7.68999 18.3459L9.30399 13.0159L5.11499 9.99991H10.331L12 4.46191L13.67 9.99991H18.885L14.696 13.0159L16.31 18.3459L12 15.0699L7.68999 18.3459Z" fill="black"/>
</Svg > :
  <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
  <Path   d="M7.68999 18.3459L9.30399 13.0159L5.11499 9.99991H10.331L12 4.46191L13.67 9.99991H18.885L14.696 13.0159L16.31 18.3459L12 15.0699L7.68999 18.3459Z" fill="#F7C100"/>
  </Svg >
}
</TouchableOpacity> 
<TouchableOpacity style={{height:verticalScale(24),width:scale(24)}} onPress={()=>startfun3()}
disabled={start3}
>
{star3?
    <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
<Path   d="M9.59999 15.6499L12 13.7999L14.4 15.6499L13.5 12.5999L15.75 10.9999H12.95L12 7.89991L11.05 10.9999H8.24999L10.5 12.5999L9.59999 15.6499ZM7.68999 18.3459L9.30399 13.0159L5.11499 9.99991H10.331L12 4.46191L13.67 9.99991H18.885L14.696 13.0159L16.31 18.3459L12 15.0699L7.68999 18.3459Z" fill="black"/>
</Svg > :
  <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
  <Path   d="M7.68999 18.3459L9.30399 13.0159L5.11499 9.99991H10.331L12 4.46191L13.67 9.99991H18.885L14.696 13.0159L16.31 18.3459L12 15.0699L7.68999 18.3459Z" fill="#F7C100"/>
  </Svg >
} 
</TouchableOpacity> 
<TouchableOpacity style={{height:verticalScale(24),width:scale(24)}} onPress={()=>startfun4()}
disabled={start4}
>
{star4?
    <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
<Path   d="M9.59999 15.6499L12 13.7999L14.4 15.6499L13.5 12.5999L15.75 10.9999H12.95L12 7.89991L11.05 10.9999H8.24999L10.5 12.5999L9.59999 15.6499ZM7.68999 18.3459L9.30399 13.0159L5.11499 9.99991H10.331L12 4.46191L13.67 9.99991H18.885L14.696 13.0159L16.31 18.3459L12 15.0699L7.68999 18.3459Z" fill="black"/>
</Svg > :
  <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
  <Path   d="M7.68999 18.3459L9.30399 13.0159L5.11499 9.99991H10.331L12 4.46191L13.67 9.99991H18.885L14.696 13.0159L16.31 18.3459L12 15.0699L7.68999 18.3459Z" fill="#F7C100"/>
  </Svg >
}
</TouchableOpacity> 
<TouchableOpacity style={{height:verticalScale(24),width:scale(24)}} onPress={()=>startfun5()}
disabled={start5}
>
{star5?
    <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
<Path   d="M9.59999 15.6499L12 13.7999L14.4 15.6499L13.5 12.5999L15.75 10.9999H12.95L12 7.89991L11.05 10.9999H8.24999L10.5 12.5999L9.59999 15.6499ZM7.68999 18.3459L9.30399 13.0159L5.11499 9.99991H10.331L12 4.46191L13.67 9.99991H18.885L14.696 13.0159L16.31 18.3459L12 15.0699L7.68999 18.3459Z" fill="black"/>
</Svg > :
  <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{}}>
  <Path   d="M7.68999 18.3459L9.30399 13.0159L5.11499 9.99991H10.331L12 4.46191L13.67 9.99991H18.885L14.696 13.0159L16.31 18.3459L12 15.0699L7.68999 18.3459Z" fill="#F7C100"/>
  </Svg >
}
</TouchableOpacity> 
      </View>
    </View>

  <View style={{ alignItems: "center", flexDirection: "row",marginTop:verticalScale(10)}}>

<TouchableOpacity onPress={()=>navigation.navigate("Search")}>
  <Text style={{color:"#00B2FF",textDecorationLine:"underline",fontSize:moderateScale(13),fontFamily:"Montserrat-Medium"}}>Disclaimer</Text>
 </TouchableOpacity>
 <Text style={{color:"#636363",fontSize:moderateScale(13),fontWeight:400,textAlign:"center",fontFamily:"Montserrat-Medium"}}>
 : For investigation use only</Text>
 </View>
  
  <View style={{justifyContent:"space-between",flexDirection:"row",position:"absolute",bottom:verticalScale(0),paddingHorizontal:scale(60),width:"100%",alignSelf:"center",}}>


<TouchableOpacity style={{width:scale(18),height:scale(20)}} //</View>onPress={()=>share()}
>
  <Svg width={scale(18)} height={scale(20)} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:verticalScale(20),}}>
<Path d="M15 20C14.1667 20 13.4583 19.7083 12.875 19.125C12.2917 18.5417 12 17.8333 12 17C12 16.8833 12.0083 16.7623 12.025 16.637C12.0417 16.5117 12.0667 16.3993 12.1 16.3L5.05 12.2C4.76667 12.45 4.45 12.646 4.1 12.788C3.75 12.93 3.38333 13.0007 3 13C2.16667 13 1.45833 12.7083 0.875 12.125C0.291667 11.5417 0 10.8333 0 10C0 9.16667 0.291667 8.45833 0.875 7.875C1.45833 7.29167 2.16667 7 3 7C3.38333 7 3.75 7.071 4.1 7.213C4.45 7.355 4.76667 7.55067 5.05 7.8L12.1 3.7C12.0667 3.6 12.0417 3.48767 12.025 3.363C12.0083 3.23833 12 3.11733 12 3C12 2.16667 12.2917 1.45833 12.875 0.875C13.4583 0.291667 14.1667 0 15 0C15.8333 0 16.5417 0.291667 17.125 0.875C17.7083 1.45833 18 2.16667 18 3C18 3.83333 17.7083 4.54167 17.125 5.125C16.5417 5.70833 15.8333 6 15 6C14.6167 6 14.25 5.92933 13.9 5.788C13.55 5.64667 13.2333 5.45067 12.95 5.2L5.9 9.3C5.93333 9.4 5.95833 9.51267 5.975 9.638C5.99167 9.76333 6 9.884 6 10C6 10.1167 5.99167 10.2377 5.975 10.363C5.95833 10.4883 5.93333 10.6007 5.9 10.7L12.95 14.8C13.2333 14.55 13.55 14.3543 13.9 14.213C14.25 14.0717 14.6167 14.0007 15 14C15.8333 14 16.5417 14.2917 17.125 14.875C17.7083 15.4583 18 16.1667 18 17C18 17.8333 17.7083 18.5417 17.125 19.125C16.5417 19.7083 15.8333 20 15 20ZM15 4C15.2833 4 15.521 3.90433 15.713 3.713C15.905 3.52167 16.0007 3.284 16 3C16 2.71667 15.904 2.47933 15.712 2.288C15.52 2.09667 15.2827 2.00067 15 2C14.7167 2 14.4793 2.096 14.288 2.288C14.0967 2.48 14.0007 2.71733 14 3C14 3.28333 14.096 3.521 14.288 3.713C14.48 3.905 14.7173 4.00067 15 4ZM3 11C3.28333 11 3.521 10.904 3.713 10.712C3.905 10.52 4.00067 10.2827 4 10C4 9.71667 3.904 9.47933 3.712 9.288C3.52 9.09667 3.28267 9.00067 3 9C2.71667 9 2.47933 9.096 2.288 9.288C2.09667 9.48 2.00067 9.71733 2 10C2 10.2833 2.096 10.521 2.288 10.713C2.48 10.905 2.71733 11.0007 3 11ZM15 18C15.2833 18 15.521 17.904 15.713 17.712C15.905 17.52 16.0007 17.2827 16 17C16 16.7167 15.904 16.4793 15.712 16.288C15.52 16.0967 15.2827 16.0007 15 16C14.7167 16 14.4793 16.096 14.288 16.288C14.0967 16.48 14.0007 16.7173 14 17C14 17.2833 14.096 17.521 14.288 17.713C14.48 17.905 14.7173 18.0007 15 18Z" fill="black"/>
</Svg >   
</TouchableOpacity>

<View  
   
   style={{
      width:scale(81),
    
     shadowRadius:scale(4), 
     bottom:verticalScale(0),
     alignItems: 'center',
    justifyContent:"center",
    alignSelf:"center",
  
  //  marginHorizontal:scale(20)
  }}

>

          
        
        <View 
  
  //style={styles.neo}
  style={{
    width:scale(56),
    height:scale(56),
    shadowRadius:scale(2),
    backgroundColor:"#E6ECF2",
    marginTop:verticalScale(10.9),
    alignItems: 'center',
   borderRadius:moderateScale(85),
  borderWidth:scale(0.5),
  borderColor:"white",
  // shadowColor:"#00B2FF",
  alignSelf:"center",
shadowOpacity:0.5,
marginBottom:verticalScale(8)
  }}
   
   >

<TouchableOpacity style={{height:scale(56),width:scale(56),alignItems:"center",justifyContent:"center"}} 

>
<Svg width={scale(26)} height={scale(26)} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{alignSelf:"center",marginVertical:scale(9)}}>
<Path d="M2.617 6.98391C4.07608 4.46573 6.40059 2.56362 9.15772 1.63176C11.9149 0.699896 14.9167 0.801787 17.6043 1.91846C20.2919 3.03513 22.4821 5.09048 23.767 7.7018C25.052 10.3131 25.3442 13.3024 24.5891 16.1131C23.8341 18.9238 22.0833 21.3644 19.6628 22.9803C17.2423 24.5962 14.317 25.2774 11.4316 24.897C8.54622 24.5167 5.89741 23.1006 3.97836 20.9126C2.05931 18.7246 1.00083 15.9137 1 13.0034" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M9.125 7.50341H2.625V1.00342" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</Svg >
</TouchableOpacity>
</View>
       
          
            </View>


          <TouchableOpacity style={{width:scale(24),height:verticalScale(24),}}
           onPress={() => { ToastAndroid.show('Copy Done', ToastAndroid.SHORT) }}>
          <Svg width={scale(24)} height={verticalScale(24)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:verticalScale(20),}}>
<Path  fill-rule="evenodd" clip-rule="evenodd" d="M15 1.25H10.944C9.106 1.25 7.65 1.25 6.511 1.403C5.339 1.561 4.39 1.893 3.641 2.641C2.893 3.39 2.561 4.339 2.403 5.511C2.25 6.651 2.25 8.106 2.25 9.944V16C2.25002 16.8934 2.56894 17.7575 3.14934 18.4367C3.72974 19.1159 4.53351 19.5657 5.416 19.705C5.553 20.469 5.818 21.121 6.348 21.652C6.95 22.254 7.708 22.512 8.608 22.634C9.475 22.75 10.578 22.75 11.945 22.75H15.055C16.422 22.75 17.525 22.75 18.392 22.634C19.292 22.512 20.05 22.254 20.652 21.652C21.254 21.05 21.512 20.292 21.634 19.392C21.75 18.525 21.75 17.422 21.75 16.055V10.945C21.75 9.578 21.75 8.475 21.634 7.608C21.512 6.708 21.254 5.95 20.652 5.348C20.121 4.818 19.469 4.553 18.705 4.416C18.5657 3.53351 18.1159 2.72974 17.4367 2.14934C16.7575 1.56894 15.8934 1.25002 15 1.25ZM17.13 4.271C16.9779 3.827 16.6909 3.44166 16.3089 3.16893C15.927 2.89619 15.4693 2.74971 15 2.75H11C9.093 2.75 7.739 2.752 6.71 2.89C5.705 3.025 5.125 3.279 4.702 3.702C4.279 4.125 4.025 4.705 3.89 5.711C3.752 6.739 3.75 8.093 3.75 10V16C3.74971 16.4693 3.89619 16.927 4.16892 17.3089C4.44166 17.6908 4.827 17.9779 5.271 18.13C5.25 17.52 5.25 16.83 5.25 16.055V10.945C5.25 9.578 5.25 8.475 5.367 7.608C5.487 6.708 5.747 5.95 6.348 5.348C6.95 4.746 7.708 4.488 8.608 4.367C9.475 4.25 10.578 4.25 11.945 4.25H15.055C15.83 4.25 16.52 4.25 17.13 4.271ZM7.408 6.41C7.685 6.133 8.073 5.953 8.808 5.854C9.562 5.753 10.564 5.751 11.999 5.751H14.999C16.434 5.751 17.435 5.753 18.191 5.854C18.925 5.953 19.313 6.134 19.59 6.41C19.867 6.687 20.047 7.075 20.146 7.81C20.247 8.564 20.249 9.566 20.249 11.001V16.001C20.249 17.436 20.247 18.437 20.146 19.193C20.047 19.927 19.866 20.315 19.59 20.592C19.313 20.869 18.925 21.049 18.19 21.148C17.435 21.249 16.434 21.251 14.999 21.251H11.999C10.564 21.251 9.562 21.249 8.807 21.148C8.073 21.049 7.685 20.868 7.408 20.592C7.131 20.315 6.951 19.927 6.852 19.192C6.751 18.437 6.749 17.436 6.749 16.001V11.001C6.749 9.566 6.751 8.564 6.852 7.809C6.951 7.075 7.132 6.687 7.408 6.41Z" fill="black"/>
</Svg >   
</TouchableOpacity>

  </View>
  </View>
  :null

}



      </View>

      </>



  )
}




const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    width: "100%",
    marginTop: "11%",

  },
  back: {
    height: scale(26),
    width: scale(20),
    opacity: 1,
    position: "relative", left: moderateScale(10)
  },
  toptext: {
    fontSize: moderateScale(17),
    fontFamily: "fype-co-londonbridge-semibold",
    color: "black",
    alignSelf: "center",
    position: "absolute",

  },
  topneo: {
    height: scale(40),
    width: scale(40),
    shadowRadius: 2.5,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: "#D0D3D7",
    borderRadius: scale(20),
    position: "absolute",
    right: scale(10)
  },
  topneoimg: {
    marginTop: scale(7),
    marginLeft: moderateScale(6),
    height: scale(30),
    width: scale(30),
  },
  online: {
    fontSize: moderateScale(11),

    color: "#11DC4C",
    fontFamily: "fype-co-londonbridge-semibold",

    alignSelf: "flex-start", marginTop: moderateScale(22)
  },
  Lottie: {
    height: verticalScale(226),
    width: scale(271),
    marginTop: 35,
    alignSelf: "center"
  },
  helptext: {
    fontSize:  moderateScale(30),
    fontFamily: "Montserrat-Bold",
    marginTop: 100,
    color: "black",
    marginLeft: scale(20)
  },
  Clinictext: {
    fontSize: moderateScale(30),
    fontFamily: "Montserrat-Bold",
    color: "black",
    marginLeft: scale(20)
  },
  bottom: {
    alignContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: verticalScale(86),
  },
  bottomp: {
    alignContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: verticalScale(166),
  },
  vect: {
    marginTop: moderateScale(16),
    marginLeft: moderateScale(15),
    paddingLeft: moderateScale(15),
    width: scale(20),
    height: verticalScale(27)
  },

  neosend: {
    width: scale(43),
    height: scale(43),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(25),
    shadowRadius: 0.0,
    // shadowColor: "#000000",
    marginTop: scale(-53),
    backgroundColor: "#FFFFFF",
    marginLeft: scale(180),
    alignSelf: "flex-end",
    position: "relative", bottom: 0, left: scale(20)

  },
  teosend: {
    height: moderateScale(44),
    width: moderateScale(44),
    justifyContent:"center",
    alignItems:"center",
    borderRadius: moderateScale(25),
  
  },
  imgsendb: {
    marginTop: scale(10),
    marginLeft: scale(7),
    opacity: 1,
    tintColor: '0 5px 10px rgba(0, 116, 251, 1)',
    height:scale(20.6),
    width:scale(20.6)
  },
  shadow: {
    shadowOffset: { width: 4.1, height: 0.2 },
    shadowOpacity: 1,
    shadowColor: "#FF000F",
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    height: 55,
    width: 55,
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 30,
    marginLeft: "39%",
    alignSelf: "center"
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  view1: {
    backgroundColor: "white",
    width: moderateScale(330),
    height: moderateScale(230),
  },
  view2: {
    justifyContent: "center",
    height: moderateScale(188),
    borderBottomWidth: moderateScale(1),
    borderColor: "#C9D9E8"
  },
  Your: {
    fontSize: moderateScale(17),
    fontWeight: "600",
    alignSelf: "center",
    margin: moderateScale(11),
    marginTop:moderateScale(30),
    color: "#000000",
    fontFamily:"Montserrat-Medium"
  },
  ok: {
    color: "#0094FF",
    alignSelf: "center",
    fontSize: moderateScale(17),
    fontWeight: "400",
    paddingBottom: moderateScale(4),
    fontFamily:"Montserrat-Bold"
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  line: {
    height: verticalScale(2),
    width: scale(35),
    borderColor: "black",
    borderBottomWidth: scale(1),
    marginTop: verticalScale(12),
    opacity: 0.1
},
line1: {
    height: verticalScale(2),
    width: scale(30),
    borderColor: "black",
    borderBottomWidth: scale(1.5),
    marginTop: verticalScale(12),
    marginLeft: 0,
    opacity: 0.2
},
line2: {
    height: verticalScale(2),
    width: scale(20),
    borderColor: "black",
    borderBottomWidth: scale(2),
    marginTop: verticalScale(12),
    marginLeft: 0,
    opacity: 0.3
},
or: {
    alignSelf: "center",
    marginLeft: scale(20),
    color: "#636363",
    fontSize:moderateScale(18),
    fontFamily:"Montserrat-Medium",
},
line3: {
    height: verticalScale(2),
    width: scale(20),
    borderColor: "black",
    borderBottomWidth: scale(2),
    marginTop: verticalScale(12),
    marginLeft: scale(20),
    opacity: 0.3
},
line4: {
    height: verticalScale(2),
    width: scale(30),
    borderColor: "black",
    borderBottomWidth: scale(1.5),
    marginTop: verticalScale(12),
    marginLeft: 0,
    opacity: 0.2
},
line5: {
    height: verticalScale(2),
    width: scale(35),
    borderColor: "black",
    borderBottomWidth: scale(1),
    marginTop: verticalScale(12),
    marginLeft: 0,
    opacity: 0.1
},
})












