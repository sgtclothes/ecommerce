import React, { Component } from 'react'
import {StyleSheet, TextInput, Text,Button, View, Image, FlatList, TouchableOpacity, Modal} from 'react-native'
import { Card } from 'native-base'
import {connect} from 'react-redux'
import {registerUser} from '../src/publics/redux/actions/users'

const mapStateToProps = (state) => {
    return {
      users: state.users
    }
}

class Register extends Component {

    static navigationOptions = {
        title:'Sign Up'
    }

   constructor(props) {
        super(props)
        this.state = {
            username:'',
            password:'',
            retryPass:'',
            email:''
        }
    }

    checkLogin() {

        if(this.state.password != this.state.retryPass) {
            alert('Wrong Password')
        } 
        else if (!this.state.username || !this.state.email || !this.state.password) {
            alert('Please fill the correct form')
        }
        else {
            this.props.dispatch(registerUser(this.state))
            alert('Register Successfully')
            this.props.navigation.navigate('Account')
        }
    }

    render() {
        return(
            <View>
                <Card style={{marginTop:'10%', borderColor:'white'}} noShadow >
                    <Text style={{color:'#e84f20', marginLeft:40, marginTop:20}}>Username</Text>
                    <TextInput 
                    style={{ padding:0, alignSelf:'center', marginBottom:5, borderBottomWidth:1, width:'78%'}} 
                    onChangeText={(username)=>{this.setState({username})}}    
                    />
                    <Text style={{color:'#e84f20', marginLeft:40, marginTop:20}}>Email</Text>
                    <TextInput style={{padding:0, alignSelf:'center', marginBottom:20, borderBottomWidth:1, width:'78%'}}
                    onChangeText={(email)=>{this.setState({email})}}    
                    />
                    <Text style={{color:'#e84f20', marginLeft:40}}>Password</Text>
                    <TextInput secureTextEntry={true} style={{padding:0, alignSelf:'center', marginBottom:5, borderBottomWidth:1, width:'78%'}}
                    onChangeText={(password)=>{this.setState({password})}}    
                    />
                    <Text style={{color:'#e84f20', marginLeft:40, marginTop:20}}>Retry Password</Text>
                    <TextInput secureTextEntry={true} style={{padding:0, alignSelf:'center', marginBottom:50, borderBottomWidth:1, width:'78%'}}
                    onChangeText={(retryPass)=>{this.setState({retryPass})}}    
                    />
                    <View style={{width:'50%', marginBottom:20, alignSelf:'center'}}>
                        <Button color='#e84f20' title='SIGN UP' onPress={()=>this.checkLogin()}/>
                    </View>
                </Card>
            </View>
        )
    }
}

export default connect(mapStateToProps)(Register)