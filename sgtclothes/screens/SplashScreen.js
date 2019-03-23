import React, {Component} from 'react';
import { StatusBar , View , Text , ActivityIndicator } from 'react-native';
export default class SplashScreen extends Component {

    componentDidMount() {

        setTimeout(()=> {
            this.props.navigation.navigate('Home')
        },2000)
    }
    render() {
        return (
            <View style={{ flex: 1 , justifyContent: 'center' , alignItems: 'center' , backgroundColor : '#e84f20'}}>
                <StatusBar backgroundColor="#2c3e50" barStyle="light-content"/>
                <Text style={{ marginVertical:50, color : 'white',fontSize : 20, fontWeight:'bold' }}>BAJU COWOK INDONESIA</Text>
            </View>
        )
    }
}