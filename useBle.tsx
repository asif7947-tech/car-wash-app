import { Platform, PermissionsAndroid, Alert } from "react-native";
import { BleError, BleManager, Characteristic, Device } from 'react-native-ble-plx';
import { useDebugValue, useEffect, useState } from "react";
import { atob, btoa } from 'react-native-quick-base64';
import DeviceInfo from 'react-native-device-info';
import Sound from 'react-native-sound';
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import { useNavigation } from "@react-navigation/native";
// /// -------------for ppg data---------------- ///
 const UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
 const CHARACTERISTIC_UUID_TX = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";                 //uuid and charact. used of ESP ble
 const CHARACTERISTIC_UUID_RX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
 /// -------------for ppg data---------------- ///
 var listView: any = null;


const bleMan = new BleManager();

type permisionCallback = (result: boolean) => void;


interface bleManApi {
    requestPermissions(callback: permisionCallback): Promise<void>;
    connectToDevice(device: Device): Promise<void>;
    scanforDevices(): void;                                                        ///interface for ble (return values)
    currentDevice: Device | null,
    heartRate: number;
    allDevices: Device[];
    message: [];
    ECGData :[];

    disConnectionHappened: boolean;
    sendData(device: Device): Promise<void>;

    dummySendFunction(
        id: any, sec: any, min: any, hours: any, month: any, day: any, year: any, duration: any,
        monday: any, tuesday: any, wednesday: any, thursday: any, friday: any, saturday: any, sunday: any
    ): void;

    finalDataSend: any;
    sendCommand: any;
    change103Status: any;
    sendClientCommand: any;
    changeThreshCommand: any;
    getAlarmStatus: any;
    txtSend:any;
    statusSend:any;
    helloSend:any;
}

export default function UseBle(): bleManApi {
   
    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
    const [heartRate, setHeartRate] = useState<number>(0);
    const [message, setMessage] = useState<any>([]);         //new message  
    const [ECGData, setECGData] = useState<any>([]);         //new message  

    const [messageItems, setMessageItems] = useState<any>([]);                           ///this is not used

    const [disConnectionHappened, setDisconnectionHappened] = useState<boolean>(false);
    let dataToString: any;

    const [finalDataSend, setFinalDataSend] = useState("No Data Right Now.....");

    // const [message, setMessage] = useState<(string | number)[]>(["No messages.", ""]);       //original message  
    // const [sendMessage, setSendMessage]= useState<string>;                ///storing sent data.. not used yet.
    const requestPermissions = async (callback: permisionCallback) => {

        if (Platform.OS === "android") {
            const apiLevel = await DeviceInfo.getApiLevel();
            if (apiLevel < 31) {
                const grantedStatus = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permision",
                        message: "BLE requires location permission",                     ///checks permissions in devices lower than android
                        buttonPositive: 'Okay',
                        buttonNeutral: "Maybe Later",
                        buttonNegative: "no",

                    },
                );
                callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
            } else {
                const result = await requestMultiple([
                    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,                      //// checks permissions in android 12
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ]);

                const isAllPermissionsGranted =
                    result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
                    result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED

                callback(isAllPermissionsGranted);                                  ////if all permissions granted then make permissions granted to success.
            }
        } else {
            callback(true);
        }

    };
  
    const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
        devices.findIndex(device => nextDevice.id === device.id) > -1;                 //cheks for duplicate devices.

        const navigation = useNavigation() 


    const scanforDevices = () => {
        console.log("Scanning for devices..");
        bleMan.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log(error);
            }
            if (device !== null) {                           //scans for devices
                setAllDevices(prevState => {
                    if (!isDuplicateDevice(prevState, device)) {
                        return [...prevState, device];
                    }

                    return prevState;

                })
//             const getDeiceInfo = async() =>{
//               const abc =  bleMan.connectedDevices(["6E400001-B5A3-F393-E0A9-E50E24DCCA9E"]).
//               then(res=>{
//                 console.log(res,"RES")
//               })
//               let connectedDevices = await bleMan.connectedDevices([UUID]).then(response=>{
// console.log(response,"RESPONSE")
//               });
//               //console.log((abc),(connectedDevices),"gytg")
//             }
          //  getDeiceInfo()
            }
        })
    };

    const connectToDevice = async (device: Device) => {
        console.log("Connecting to device..." + device.name);


        try {
            const deviceConnection = await bleMan.connectToDevice(device.id, { requestMTU: 512 }) ///added MTU
            setCurrentDevice(deviceConnection);
            console.log('setting current device');
            bleMan.stopDeviceScan();
            await deviceConnection.discoverAllServicesAndCharacteristics()
            startStreamingData(device);
            //startStreamingData1(device);
//            const service =  await device.discoverAllServicesAndCharacteristics();
//           const info = getServicesAndCharacteristics(service)
// console.log(service,"tgt")
            grabDevice(device);
          
            console.log('current Device', currentDevice?.name);


            bleMan.stopDeviceScan();                                                    ///to stop device scanning if connected.
            // device.discoverAllServicesAndCharacteristics().then(() => {

            //     device.services().then((service) => {

            //       for (var x = 0; x < service.length; x++) {

            //         device.characteristicsForService(UUID).then((result) => {

            //           for (var x = 0; x < result.length; x++) {
                        
            //             if (result[x].isNotifiable === true) {

            //                 device.monitorCharacteristicForService(result[x].serviceUUID, result[x].uuid, async (error: BleError | null, characteristic: Characteristic | null) => {
                            
            //                 // error handling
            //                 if (error || !characteristic) {
            //                   console.log(error);
            //                   return
            //                 }

            //                 if (characteristic) {
                              
            //                   var raw = characteristic.value;
            //                   var decodeVal = atob(raw);
            //                   console.log(`${raw}:  ${decodeVal}`);
                             
            //                 }
            //               })
            //             }
            //           }
            //         })
            //       }
            //     })
            //   })
         function  
          getServicesAndCharacteristics(services: any) {
                      return new Promise((resolve, reject) => {
                          device.services().then(services => {
                              const characteristics: any[] = []
          
                              services.forEach((service, i) => {
                                  service.characteristics().then(c => {
                                      characteristics.push(c)
          
                                      if (i === services.length - 1) {
                                          const temp = characteristics.reduce(
                                              (acc, current) => {
                                                  return [...acc, ...current]
                                              },
                                              []
                                          )
                                          const dialog = temp.find(
                                              (  characteristic: { iswritablewithoutresponse: any; }) =>
                                                  characteristic.iswritablewithoutresponse
                                          )
                                          if (!dialog) {
                                              reject('no writable characteristic')
                                          }
                                          resolve(dialog)
                                      }
                                  })
                              })
                          })
                      })
                  }


        } catch (e) {
            console.log("Error while connecting" + e);

        }
    };

    const startStreamingData = async (device: Device) => {                                       ///no need of this function.
        if (device) {
            console.log("streamingdata function")
              await device.monitorCharacteristicForService(
                UUID, CHARACTERISTIC_UUID_TX,
                (error, characteristic) => onHeartRateUpdate(error, characteristic),
           );

        } else {
            console.log("No Device Connected.")

        }
    };

 

    const onHeartRateUpdate = (
        error: BleError | null,
        characterstic: Characteristic | null,
    ) => {
        console.log("characteristics value")
        if (error) {
            console.error(error)
            return;
        }
        else if (!characterstic?.value) {
            console.error("No Characterstics found");
            return;
        } else {
        console.log(characterstic?.value,"Characteristics values")
        // let your_bytes = Buffer.from(characterstic?.value, "base64");
        // console.log(your_bytes);
        }

        const rawData: any = atob(characterstic.value);
        /// making dummy to handle messages start

        setMessage((arr: any) => [rawData, ...arr]);
        console.log(rawData,message, 'received messages.');
        setECGData((arr: any) => [rawData, ...arr]);
        //console.log(rawData,message, 'received messages.');

        // setMessage((arr: any) =>[...arr, rawData].reverse());      
        grabStatus(rawData);                                                 //grabbing messages here
        /// making dummy to handle messages end




        /// old this is used for storing the messages.
        // setMessage((arr: any) =>[...arr, rawData]);                   //new without reverse


        let innerHeartRate = -1
        const firstBitValue = Number(rawData) & 0x01;

        if (firstBitValue === 0) {
            innerHeartRate = rawData[1].charCodeAt(0);
        } else {
            innerHeartRate =
                Number(rawData[1].charCodeAt(0) << 8) +
                Number(rawData[2].charCodeAt(0));
        }


        // console.log("innerheart "+ innerHeartRate)
        // console.log("set: "+ setHeartRate);
        // console.log("set: "+ heartRate);

    };

    ///send data start

    //new function to make experiments starts here=--------------
    function dummySendFunction(id: any, sec: any, min: any, hours: any, month: any, day: any, year: any, duration: any,
        monday: any, tuesday: any, wednesday: any, thursday: any, friday: any, saturday: any, sunday: any
    ) {
        const exampleData = {
            "cmd": "SET_ALARM",
            'ALARM_ID': new String(id),
            'ALARM_SECONDS': new String(sec),
            'ALARM_MINUTES': new String(min),
            'ALARM_HOURS': new String(hours),
            'ALARM_MONTH': new String(month + 1),
            'ALARM_DAY': new String(day),
            'ALARM_YEAR': new String(year),
            'ALARM_DURATION': new String(duration),
            "Monday": new String(monday),
            "Tuesday": new String(tuesday),
            "Wednesday": new String(wednesday),
            "Thursday": new String(thursday),
            "Friday": new String(friday),
            "Saturday": new String(saturday),
            "Sunday": new String(sunday),
        };

        dataToString = JSON.stringify(exampleData);

        // console.log(dataToString);

        processDataToString(dataToString);

    };
    //new function to make experiments endds here=--------------

    const sendData = async (device: Device) => {
        console.log("Sending data from input to " + device.name);
        const convertedValue = tyringSave;
        const convertedValueSent = btoa(convertedValue);

        console.log(convertedValue, 'Converted Value Sent')

        try {
            await bleMan.writeCharacteristicWithResponseForDevice(device.id,
                UUID,
                CHARACTERISTIC_UUID_RX,
                convertedValueSent,                                              //// Data will be send from here..
            );
            console.log("Sending Data...")
            console.log("////Sent//////");

            setDisconnectionHappened(false);                                  //will switch back to false when sending another data.



        }
        catch (e) {
            console.log("Failed to send data: " + e);

            setDisconnectionHappened(true);  
                               ///disconnection detected
            console.log("device is disconnected");
             
        }
        ///send data end

    };


    ///// here the  len of data will be started converting to hex///        //this will convert legnth of data in hexadecimal
    function convertToHexDec(n: number) {

        let hex = n.toString(16).toUpperCase();

        if (hex.length < 2) {

            hex = `0${hex}`;

        }
        return hex;
    };

    ///// here the data will be ended converting to hex///


    ////convert string to hex start

    function convertToHex(str: any) {

        var hex = '';

        for (var i = 0; i < str.length; i++) {

            hex += '' + str.charCodeAt(i).toString(16);

        }

        return hex;

    };

    //convert string to hex end

    //here all the data will be converted to hex and quickbase also with legnth (start).
    function dataToSend(check: any) {
        const stringVal = new String(check);
        const strLen = stringVal.length;
        const strValLenInHex = convertToHexDec(strLen);
        const strValInHex = convertToHex(stringVal);

        const strValLenInAscii = hex_to_ascii(strValLenInHex);
        var dataWithLenToSend = `${strValLenInAscii}${stringVal}`;            //only len in hex
        console.log("data from msg box: " + dataWithLenToSend)

        return dataWithLenToSend;
    };


    //here all the data will be converted to hex and quickbase also with legnth (end).

    ///converting hex to ascii for checking purpose (start)

    function hex_to_ascii(str1: any) {
        var hex = str1.toString();
        var str = '';
        for (var n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
        }
        return str;
    };

    ///converting hex to ascii for checking purpose (end)

    ///split of value starts here

    function split(str: any) {
        const result = [str.slice(0, 30), str.slice(30)];

        return result;
    };

    ///spit of values ends here

    //function for sending command starts from here
    function sendCommand(command: string) {
        const c = {
            "cmd": command
        };
        const commandToSend = JSON.stringify(c);
        processDataToString(commandToSend);
        if (deviceName) {
            sendData(deviceName);
        } else {
            console.log('could not send command ')
        }
    };
    //function for sending command ends here

    //function to grab status starts from===== here
    function grabStatus(received: any) {
        processStatus(received);
    };
    //function to grab status ends===========here

    //function for sending CHANGE IO3 STATUS starts from here
    function change103Status(i03: string, time: string) {
        const data = {
            "cmd": "IO3_STATUS",
            "IO3": i03,
            "IO3_TIME": time,
        };

        const commandToSend = JSON.stringify(data);
        processDataToString(commandToSend);
        console.log(commandToSend, '##########IO3 status')
        if (deviceName) {
            sendData(deviceName);
        } else { console.log('could not send') }
    };
    //function for sending CHANGE IO3 STATUS ends here

    // function txtSend(id: String) {
    //     const data =  `${id}`
    //     const commandToSend = JSON.stringify(data);
    //     processDataToString(commandToSend);
    //     console.log(commandToSend, '##########IO3 status')
    //     if (deviceName) {
    //         sendData(deviceName);
    //     } else { console.log('could not send') };
    // };



    function txtSend(id: String) {
        const data   = 
             'RST';
        const commandToSend = (data);
        processDataToString(commandToSend);
        if (deviceName) {
            sendData(deviceName);
        } else { console.log('could not send') }
    };
    
    function helloSend(id: string) {
        const data = `${id}`
    listView = "";
        const commandToSend = data;
        processDataToString(commandToSend);
        if (deviceName) {
            sendData(deviceName);
            console.log(" data sending is in process")
        } else { console.log('could not send') };
    };
    function statusSend(id: string) {
        const data = `${id}`
    
        const commandToSend = data;
        processDataToString(commandToSend);
        if (deviceName) {
            sendData(deviceName);
            console.log(" data sending is in process")
        } else { console.log('could not send') };
    };



    //function for sending command with client ID starts here
    function sendClientCommand(sec: string, min: string, hours: string, day: string, month: string, year: string) {
        const data = {
            "cmd": "CLIENT_ID",
            "CID": "0x14",
            "SECONDS": sec,
            "MINUTES": min,
            "HOURS": hours,
            "DAY": day,
            "MONTH": month,
            "YEAR": year,
        };
        const commandToSend = JSON.stringify(data);
        processDataToString(commandToSend);
        if (deviceName) {
            sendData(deviceName);
        } else { console.log('could not send') }
    };
    //function for sending command with client ID ends here







    //funtion for sending change threshold command starts here 
    function changeThreshCommand(high: string, low: string) {
        const data = {
            "cmd": "CURRENT_THRESHOLDS",
            "HIGH_CURRENT_TH": high,
            "LOW_CURRENT_TH": low,
        };
        const commandToSend = JSON.stringify(data);
        processDataToString(commandToSend);
        if (deviceName) {
            sendData(deviceName);
        } else { console.log('could not send') };
    };
    //funtion for sending change threshold command ends here

    //function to get alarm status by id starts from here
    function getAlarmStatus(id: string) {
        const data = {
            "cmd": "ALARM_STATUS",
            "Alarm ID": id,
        };
        const commandToSend = JSON.stringify(data);
        processDataToString(commandToSend);
        if (deviceName) {
            sendData(deviceName);
        } else { console.log('could not send') };
    };
    //function to get alarm status by id ends here
    return {
        requestPermissions,
        connectToDevice,
        scanforDevices,
        currentDevice,
        heartRate,
        allDevices,
        message,
        ECGData,
        sendData,
txtSend,
statusSend,
helloSend,
        disConnectionHappened,

        dummySendFunction,

        finalDataSend,
        sendCommand,
        change103Status,
        sendClientCommand,
        changeThreshCommand,
        getAlarmStatus,
    }

}


//Trying to use process data to string function to make data avaiable for sendoing purposes starts from here

var tyringSave = 'NOOO';

function processDataToString(d: any) {
    tyringSave = d;
    // console.log(tyringSave, "trying save");
};

//Trying to use process data to string function to make data avaiable for sendoing purposes ENDS HERE


//grab device starts from here
var deviceName: null | Device = null;

function grabDevice(device: Device) {
    deviceName = device;
    console.log(deviceName.name, "current device Grabbed");
}
//grab device ends here

//grab reveived messages from here start
var statusEnd: Array<any> | null = null;
interface Person {
    type: string,
    unit: string,
    value: string,
}
var adc1_data: Person | null = null;
var remaining_time: any = null;
var currThresh: any = null;
var alarmStatus: any = null;
var ledStatus: any = null;
var CarNo: any = null;
var waterstatus: any = null;
var refresh:any = null;


var bpm = 0;
function processStatus(data: any) {
    if (data != null) {
        //new experiment to catch json parse error============
        try {
          const newData =   data.split(/[,--]+/)
            console.log((newData[1]),"data from ble")
            if(newData[1] == "CAR_STATUS" || newData[1] == "NONE" 
            ||newData[1] == "CAR WASHED" ||newData[1] == "WORK PENDING"){
               listView = listView+(data+",    ");
                console.log("not to insert in database")
            }else if(newData[1] == "LESS LIQUID"){
                waterstatus=newData[1]
            }
            else{
            CarNo = data
            if(CarNo == " " || CarNo == null){
           
            }
            else{
                const soundPlayer = new Sound(require('./sounds/alert.mp3'), (error) => {
                    console.log(error)
                    if (error) {
                      console.log('failed to load the sound', error);
                      return;
                    }
                    soundPlayer.play((success) => {
                      console.log("abc",);
                      refresh = "refresh";
                      setTimeout(()=>{
                        CarNo = null
                      },5000)
                      setTimeout(()=>{
                        refresh = null;
                      },1100)
                      Alert.alert(CarNo)    
                    })
                  })
                
            }
            }   
        } catch (e) {
            console.log(e, data, '%%%%%%%%%%%%%%%%%%%%%%%data coming from ble')
        }


    }

}
//grab reveived messages from here end
 // "react-native-ble-plx": "^3.1.2",
export { deviceName, statusEnd, adc1_data, remaining_time, currThresh, alarmStatus, ledStatus, CarNo, listView, refresh,waterstatus };