import React, { Component } from 'react'
import { StyleSheet, Text, View} from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation'
import Home from './screens/Home'
import Cart from './screens/Cart'
import Detail from './screens/Detail'
import Payment from './screens/Payment'
import Account from './screens/Account'
import Register from './screens/Register'
import Profile from './screens/Profile'
import Login from './screens/Login'
import SplashScreen from './screens/SplashScreen'
import { Provider } from 'react-redux'
import store from './src/publics/redux/store'

const TabNavigation = createBottomTabNavigator({

	Home:{screen:Home, 
		navigationOptions : {
			tabBarLabel:"Home",
			tabBarIcon: ({tintColor}) => (
				<IconFontAwesome name="home" size={30} color='#e84f20'/>
			)
		}
	},
	
	Cart:{screen:Cart, 
		navigationOptions : {
			tabBarLabel:"Cart",
			tabBarIcon: ({tintColor}) => (
				<IconFontAwesome name="shopping-cart" size={30} color='#e84f20'/>
			)
		}
	},

	Account:{screen:Account, 
		navigationOptions : {
			tabBarLabel:"Account",
			tabBarIcon: ({tintColor}) => (
				<IconMaterialIcons name="account-circle" size={30} color='#e84f20'/>
			)
		}
	}

})

const TabNavigationLogin = createMaterialTopTabNavigator({

	Login:{screen:Login, 
		navigationOptions : {
			tabBarOptions: {
				activeTintColor: 'white',
				style:{ backgroundColor:'#e84f20'}
			}
		}
	},
	
	Register:{screen:Register, 
		navigationOptions : {
			tabBarOptions: {
				activeTintColor: 'white',
				style:{ backgroundColor:'#e84f20'}
			}
		}
	}
})

const StackNavigation = createStackNavigator({

	Main:{screen:TabNavigation, navigationOptions: {
		header:null
	}},
	Detail:{screen:Detail},
	Cart:{screen:Cart},
	Payment:{screen:Payment},
	Register:{screen:TabNavigationLogin, navigationOptions: {
		header:null,
		tabBarLabel:"Sign Up"
	}},
	Login:{screen:TabNavigationLogin, navigationOptions: {
		header:null,
		tabBarLabel:"Login"
	}},
	Profile:{screen:Profile},
	initialRouteName:'Main'

})

const SwitchNavigation = createSwitchNavigator({

	SplashScreen:{screen:SplashScreen},
	Main:{screen:StackNavigation},
	initialRouteName: 'SplashScreen'
})

const AppContainer = createAppContainer(SwitchNavigation)
class App extends Component {

	render() {

		return(
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		)
	}
}

export default App

const styles = StyleSheet.create({
	header: {
		backgroundColor:'#1E90FF' 
	},
	tab: {
		backgroundColor:'#1E90FF' 
	}
}
)

