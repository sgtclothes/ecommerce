import React, { Component } from 'react'
import {StyleSheet, TextInput, AsyncStorage, Text,Button, View, Image, FlatList, TouchableOpacity, Modal} from 'react-native'
import { Card } from 'native-base'
import {Rating, Header} from 'react-native-elements'
import {connect} from 'react-redux'
import {getUser} from '../src/publics/redux/actions/users'
import {withNavigation} from 'react-navigation'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';

class LeftHeader extends Component {
    toHome= ()=>{
		this.props.navigation.navigate('Home')
	}
	render() {
		return(
			<View style={{marginBottom:20}}>
				<IconMaterialIcons onPress={this.toHome} color='white' name='home' size={30}/>
			</View>
		)
	}
}

class Profile extends Component {


    static navigationOptions = {
        header: null
        }

   async componentDidMount() {
        await this.retrievingData()
        alert(JSON.stringify(this.props.users.profile))
}

    async retrievingData() {
        let id = this.props.navigation.getParam('id','no id')
        await AsyncStorage.setItem('id',id)
        let token = await this.getToken()
        id = await AsyncStorage.getItem('id')
        await this.props.dispatch(getUser(id,token))
    try {
        let value = AsyncStorage.getItem('token')
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

    getToken = async () => {
        let token = '';
        try {
          token = await AsyncStorage.getItem('token') || 'none'
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
        return token
      }

      async removeToken() {
        try {
          await AsyncStorage.removeItem('token')
          await AsyncStorage.removeItem('id')
          await alert('Logged out successfully')
          await this.props.navigation.navigate('Account')
        }
        catch(exception) {
          return false;
        }
      }


    render() {
        return (
            <View>
            <ScrollView>
            <View>
                <Header containerStyle={{ height:50,alignItems:'center', justifyContent:'center', backgroundColor:'#e84f20', borderBottomColor:'#e84f20'}}
					leftComponent={<LeftHeader {...this.props} />}
				/>	
                <Image source={{uri : 'https://vignette.wikia.nocookie.net/nightmarefactory/images/4/4a/Anonymous_User.png/revision/latest?cb=20180303193206'}} style={{width:100, height:100, borderRadius:100, marginTop:30, alignSelf:'center'}}/>
                <Text style={{alignSelf:'center', color:'#e84f20'}}>Test</Text>
                <Text style={{alignSelf:'center', color:'#e84f20'}}>Test</Text>
                <View style={{marginVertical:10}}/>
                <Text style={{color:'#e84f20', marginLeft:35}}>Name</Text>
                <TextInput editable={false} style={{borderWidth:1, width:'80%', alignSelf:'center'}} />
                <Text style={{color:'#e84f20', marginLeft:35}}>Gender</Text>
                <TextInput editable={false} style={{borderWidth:1, width:'80%', alignSelf:'center'}} />
                <Text style={{color:'#e84f20', marginLeft:35}}>Address</Text>
                <TextInput editable={false} style={{borderWidth:1, width:'80%', alignSelf:'center'}} />
                <Text style={{color:'#e84f20', marginLeft:35}}>Postal</Text>
                <TextInput editable={false} style={{borderWidth:1, width:'80%', alignSelf:'center'}} />
                <Text>
                    This is Profile Screen when ur login successful, click this button to see ur token
                </Text>
                <Button title='Update Profile' onPress={()=>{}} />
                <View style={{marginVertical:5}} />
                <Button title='Log out' onPress={()=>{this.removeToken()}} />
            </View>
            </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users : state.users
    }
}

export default connect(mapStateToProps)(Profile)