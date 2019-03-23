import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, TextInput,Button, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Container, Card} from 'native-base'
import axios from 'axios';
import { Rating } from 'react-native-ratings'
import Dialog from 'react-native-dialog'
import numeral from 'numeral'
import "numeral/locales/pt-br"
import Toast, {DURATION} from 'react-native-easy-toast'
import {connect} from 'react-redux'
import {getProduct, addOrder} from '../src/publics/redux/actions/products'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

const mapStateToProps = (state) => {
	return {
	  products: state.products
	}
}

class Detail extends Component {

	static navigationOptions = {
	title: 'Product Detail',
	headerStyle : {
		backgroundColor:'#e84f20'
	},
	headerTintColor : 'white'
	}
		

	constructor(props) {
		super(props)
		this.state = {
			product:{},
			dialogVisible:false,
			qty:1
		}
	}

	async fetchData(){
		const id = await this.props.navigation.getParam('id','no id')
		this.props.dispatch(getProduct(id))
	}


	showDialog(){
		this.setState({ dialogVisible: true })
	}
	
	handleCancel = () => {
    this.setState({ dialogVisible: false })
  }


	convertToRupiah(price) {
		var rupiah = ''
		var angkarev = price.toString().split('').reverse().join('')
		for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.'
		return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('')
	}

	
	async componentDidMount() {
		await this.fetchData()
	}


  render() {
		if(this.props.products.isLoading) {
				return (
				<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					<ActivityIndicator size='large' color='#e84f20'/>
				</View>
			)
		} else {
		return(
			<Container>
				<ScrollView>
					<View>
						<View style={{alignItems:'center'}}>
							<Image source={{uri:this.props.products.detail.image}} style={{width:320, height:350}}/>
						</View>
						<View style={{flex:1, flexDirection:'row', backgroundColor:'#e84f20',paddingVertical:10, width:'100%', alignItems:'center', justifyContent:'center'}}>
							<View style={{borderColor:'white', borderWidth:1, flex:1, paddingTop:8, justifyContent:'center', flexDirection:'row', marginLeft:20, width:10, height:40}}>
								<IconFontAwesome name='flash' size={20} color='yellow'/>
								<Text style={{fontSize:12, color:'yellow', fontWeight:'bold', marginLeft:10}}>FLASH SALE</Text>
							</View>
							<View style={{marginLeft:30}}>
								<Text style={{fontSize:20, color:'white', fontWeight:'bold', marginBottom:10,marginTop:10, marginRight:20}}>{this.convertToRupiah(parseInt(this.props.products.detail.price))}</Text>
							</View>
						</View>
						<Text style={{fontSize:20, color:'#e84f20', fontWeight:'bold', marginLeft:20}}>{this.props.products.detail.title} {this.props.products.detail.name}</Text>
						<View style={{flexDirection:'row', flex:1, borderBottomWidth:1, paddingBottom:10, borderBottomColor:'#f2f6fc'}}>
							<Rating style={{marginVertical:2, marginLeft:20, marginRight:5}} imageSize={20} readonly startingValue={this.props.products.detail.rating}/>
							<Text>{'('}{this.props.products.detail.rating}{')'}</Text>
							<IconFontAwesome style={{marginTop:5, marginLeft:120}} name='heart' size={20} color='red'/>
							<Text style={{fontSize:10, marginTop:5, marginLeft:5, color:'#e84f20'}}>{'('}{this.props.products.detail.likes}{')'}</Text>
						</View>
						<View style={{backgroundColor:'#f2f6fc'}}>
							<View style={{ marginLeft:20, marginTop:5, flex:1, flexDirection:'row'}}>
								<IconMaterialIcons name='filter-7' size={25} color='#e84f20'/>
								<Text style={{marginLeft:5}}>7 days return</Text>
								<IconMaterialIcons style={{marginLeft:30}} name='check-circle' size={25} color='#e84f20'/>
								<Text style={{marginLeft:5}}>100% Original</Text>
							</View>
							<View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:5, borderBottomWidth:1, borderBottomColor:'#f2f6fc', paddingBottom:5}}>
								<IconFontAwesome name='shopping-cart' size={25} color='#e84f20'/>
								<Text style={{marginLeft:5}}>Free Shipping</Text>
							</View>
						</View>
					</View>
					<Card>
						<Text style={{fontSize:15, color:'#e84f20', fontWeight:'bold', marginLeft:20, marginTop:10}}>PRODUCT DESCRIPTION</Text>
						<Text style={{marginLeft:20, marginVertical:20}}>{this.props.products.detail.desc}</Text>
					</Card>
				</ScrollView>
				<View style={{flexDirection:'row'}}>
						<TouchableOpacity style={{width:'50%'}}>
							<Button color='#e84f20' title="Add to Cart" onPress={()=>{
								this.refs.toast.show('Product added to cart!',DURATION.LENGTH_LONG)
								this.props.dispatch(addOrder(this.props.products.detail))
					
								}}/>
						</TouchableOpacity>
						<TouchableOpacity style={{width:'50%'}}>
							<Button color='#39bf51' title="Buy Now" onPress={()=>{
								this.refs.toast.show('Product added to cart!',DURATION.LENGTH_LONG)
								this.props.dispatch(addOrder(this.props.products.detail))
								}}/>
						</TouchableOpacity>
				</View>
                <Toast
                    ref="toast"
                    style={{backgroundColor:'#1bd136'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{fontWeight:'bold', color:'white'}}
                />
			</Container>
		)
	}
}
}

// this.props.dispatch(incNumber(this.props.contacts.number + 1))

export default connect(mapStateToProps)(Detail)

const styles = StyleSheet.create({
	title : {
		color: '#1E90FF',
		fontWeight: 'bold',
		alignSelf: 'center',
		margin: 30,
	},

	prices: {
		flex:1,
		flexDirection: 'row',
		margin:20,
		alignSelf: 'center',

	},

	model : {
		fontWeight:'bold',
		fontSize: 20,
		color:'#1E90FF'
	},
	
	image: {
		width:300,
		height:300
	}
})