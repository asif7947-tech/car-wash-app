
import React from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
StatusBar,
StyleSheet,
Text,
useColorScheme,
View,
} from 'react-native';

import {
Colors,
} from 'react-native/Libraries/NewAppScreen';
// import Home from './screens/Home';

import search from './screens/search';
import Search from './screens/search';
import Final from './screens/Final';
import List from './screens/List';

import AddCar from './screens/AddCar';
import Login from './screens/Login';
import Home from './screens/NewHomeScreen';
import Testscreen from './screens/Testscreen';

const Stack = createNativeStackNavigator();

type SectionProps = PropsWithChildren<{
title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
const isDarkMode = useColorScheme() === 'dark';
return (
<View style={styles.sectionContainer}>
<Text
style={[
styles.sectionTitle,
{
color: isDarkMode ? Colors.white : Colors.black,
},
]}>
{title}
</Text>
<Text
style={[
styles.sectionDescription,
{
color: isDarkMode ? Colors.light : Colors.dark,
},
]}>
{children}
</Text>
</View>
);
}

function App(): JSX.Element {
const isDarkMode = useColorScheme() === 'dark';

const backgroundStyle = {
backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};
<StatusBar
barStyle={isDarkMode ? 'light-content' : 'dark-content'}
backgroundColor={backgroundStyle.backgroundColor}
/>

return (


<NavigationContainer>
<Stack.Navigator>
{/* <Stack.Screen name="Test"  component={Testscreen}
options={({ navigation }) => ({
headerShown: false,
orientation: 'portrait',

})}
/> */}

<Stack.Screen name="Search"  component={Search}
options={({ navigation }) => ({
headerShown: false,
orientation: 'portrait',

})}
/>


<Stack.Screen name="Final"  component={Final}
options={({ navigation }) => ({
headerShown: false,
orientation: 'portrait',

})}
/>

<Stack.Screen name="Login"  component={Login}
options={({ navigation }) => ({
headerShown: false,
orientation: 'portrait',

})}
/>
<Stack.Screen name="AddCar"  component={AddCar}
options={({ navigation }) => ({
headerShown: false,
orientation: 'portrait',

})}
/>
<Stack.Screen name="List"  component={List}
options={({ navigation }) => ({
headerShown: false,
orientation: 'portrait',

})}
/>
<Stack.Screen name="Home"  component={Home}
options={({ navigation }) => ({
headerShown: false,
orientation: 'portrait',

})}
/>


</Stack.Navigator>
</NavigationContainer>
);
}

const styles = StyleSheet.create({
sectionContainer: {
marginTop: 32,
paddingHorizontal: 24,
},
sectionTitle: {
fontSize: 24,
fontWeight: '600',
},
sectionDescription: {
marginTop: 8,
fontSize: 18,
fontWeight: '400',
},
highlight: {
fontWeight: '700',
},
});

export default App;
