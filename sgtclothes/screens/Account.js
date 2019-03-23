import React, { Component } from 'react'
import {StyleSheet, TextInput, Text,Button, View, Image, FlatList, TouchableOpacity, Modal, AsyncStorage} from 'react-native'
import { Card } from 'native-base'
import {withNavigation} from 'react-navigation'

class Account extends Component {

    // getToken = async () => {
    //     let token = '';
    //     try {
    //       token = await AsyncStorage.getItem('token') || 'none'
    //     } catch (error) {
    //       // Error retrieving data
    //       console.log(error.message);
    //     }
    //     return token
    //   }


    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus',()=>{
            this.retrievingData()
        }
            )
}

    async retrievingData() {
    try {
        let value = await AsyncStorage.getItem('token')
        if (value != null) {
            this.props.navigation.navigate('Profile')
        }
        else {
            this.props.navigation.navigate('Account')
        }
    } catch (error) {
        //Error retrieving data
    }   
    }

    render() {
        return(
            <View style={{alignItems:'center', justifyContent:'center', backgroundColor:'#f9fbff'}}>
              <Text style={{ marginTop:'70%', fontSize:15, textAlign:'center', color:'#e84f20', fontWeight:'bold'}}>YOU NEED TO LOGIN TO VIEW YOUR PROFILE</Text>
              <View style={{marginTop:40}}>
                <Button color='#e84f20' title='LOGIN' onPress={()=>this.props.navigation.navigate('Login')} />
              </View>
            </View>
        )
    }
}

export default withNavigation(Account)