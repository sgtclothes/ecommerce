import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../src/publics/redux/actions/users'
import {StyleSheet, AsyncStorage, TextInput, Text,Button, View, Image, FlatList, TouchableOpacity, Modal} from 'react-native'
import { Card } from 'native-base'


class Login extends Component {


    getToken = async () => {
        let token = '';
        try {
          token = await AsyncStorage.getItem('token') || 'none'
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
        return alert(token)
      }

      async removeToken() {
        try {
          await AsyncStorage.removeItem('token');
          return alert('token berhasil dihapus')
        }
        catch(exception) {
          return false;
        }
      }


    constructor(props) {
        super(props)
        this.state = {
            email:'', password:''
        }
    }

    async checkLogin() {
        await this.props.dispatch(loginUser(this.state))
        // await alert(JSON.stringify(this.props.users.profile.access_token.token))
        try {
            await AsyncStorage.setItem('token', this.props.users.profile.access_token.token)
          } catch (error) {
            // Error retrieving data
            console.log(error.message)
          }
          await this.props.navigation.navigate('Profile',{id: this.props.users.profile.user.id})
    }

    render() {
        return(
            <View>
                <Card style={{marginTop:'10%', borderColor:'white'}} noShadow >
                    <Text style={{color:'#e84f20', marginLeft:40, marginTop:20}}>Email</Text>
                    <TextInput 
                    style={{padding:0, alignSelf:'center', marginBottom:5, borderBottomWidth:1, width:'78%'}}
                    onChangeText={(email)=>{this.setState({email})}}
                    />
                    <Text style={{color:'#e84f20', marginLeft:40, marginTop:20}}>Password</Text>
                    <TextInput 
                    secureTextEntry={true} 
                    style={{padding:0, alignSelf:'center', marginBottom:20, borderBottomWidth:1, width:'78%'}}
                    onChangeText={(password)=>{this.setState({password})}}
                    />
                    <View style={{width:'50%', marginBottom:20, alignSelf:'center'}}>
                        <Button color='#e84f20' title='LOGIN' onPress={()=>this.checkLogin()}/>
                    </View>
                    <View style={{flexDirection:'row', alignSelf:'center'}}>
                        <Text style={{marginRight:10}}>Don't have an account yet? Sign Up first</Text>
                    </View>

                    {/* <View style={{alignSelf:'center'}}>
                        <Button title='Get userID from Async Storage' onPress={this.getToken} />
                        <Button title='Remove userID from Async Storage' onPress={()=>this.removeToken()} />
                    </View> */}
                </Card>
            </View>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Login)