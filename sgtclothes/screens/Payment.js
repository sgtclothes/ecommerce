import React, { Component } from 'react';
import {StyleSheet, Text, View,Button, FlatList, Picker, TextInput, Image, ScrollView} from 'react-native';
import { Header, Title, Content, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import {withNavigation} from 'react-navigation'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import {connect} from 'react-redux'
import {getOrders, deleteOrder, updateQty} from '../src/publics/redux/actions/orders'

const mapStateToProps = (state) => {
	return {
		orders : state.orders,
		users: state.users
	}
}

const Item = Picker.Item
var radio_props_payMethod = [
	{label: 'MultiSafepay', value: 'MSP'},
	{label: 'MasterCard', value: 'MasterCard'},
	{label: 'Paypal', value: 'Paypal'},
	{label: 'Bank Transfer', value: 'BankTransfer'}
]

var radio_props_shipper = [
	{label: 'JNE', value: 'JNE'},
	{label: 'J&T', value: 'J&T'},
	{label: 'POS INDONESIA', value: 'POS INDONESIA'}
]
class Payment extends Component {

	static navigationOptions = {
    title: 'Payment Page'
	}

	constructor(props) {
		super(props) 
		this.state = {
			cart:[],
			total:'',
			shipper:'',
			payShip: 9000,
			payMethod: '',
			value:'ada'
		}
	}

	async fetchData() {
		await this.props.dispatch(getOrders())
		
	}

	async componentDidMount() {
		await this.fetchData()
	}

	convertToRupiah(price) {
		var rupiah = ''
		var angkarev = price.toString().split('').reverse().join('')
		for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.'
		return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('')
	}

	render() {

		let totalquantity =0
		let totalprice = 0
		this.props.orders.data.forEach((item)=> {
		totalquantity+=item.qty
		totalprice+=item.qty*item.price
		})

		return (
				<ScrollView>
					<Card style={{borderRadius:10, marginTop:20}}>
						<View style={{flex:1, flexDirection:'row',justifyContent:'center', backgroundColor:'#e84f20',height:50, alignItems:"center"}}>
							<Icon style={{color:'white', marginRight:20}} size={30} name='shopping-cart'/>
							<Text style={{fontWeight:'bold', textAlign:'center', color:'white'}}>ORDER SUMMARY</Text>
						</View>
						<View>
				<FlatList 
					data={this.props.orders.data} 
					refreshing={this.props.orders.isLoading}
					onRefresh={this.getData}
					keyExtractor={(item,index)=>String(index)} 
					renderItem= {
						({item, index}) => {
							return (
								<Card style={{borderRadius:10, borderColor:'#e84f20'}}>
									<View>
										<View style={{borderWidth:1, borderColor:'white'}}>
											<Text style={{fontSize:10, fontWeight:'bold', textAlign:"center", color:'#e84f20',borderBottomWidth:1, borderBottomColor:'#e84f20'}}>{item.title} {item.name}</Text>
											<View style={{flex:1, flexDirection:'row'}}>
												<Image style={{marginHorizontal:10, width:100, height:100, marginVertical:5}} source={{uri:item.image}}/>
													<View>
														<View style={{flex:1, flexDirection:'row'}}>
															<Text style={{fontSize:12,color:'#e84f20', marginTop:10}}>Quantity</Text>
															<Text style={{fontSize:12,color:'#e84f20', marginTop:10, marginLeft:50}}>:</Text>
															<Text style={{fontSize:12,color:'#e84f20', marginTop:10, marginLeft:20}}>{item.qty}</Text>
														</View>
														<View style={{flex:1, flexDirection:'row', marginBottom:60}}>
															<Text style={{fontSize:12,color:'#e84f20'}}>Price</Text>
															<Text style={{fontSize:12,color:'#e84f20', marginLeft:72}}>:</Text>
															<Text style={{fontSize:12,color:'#e84f20', marginLeft:20}}>{this.convertToRupiah(item.price)}</Text>
														</View>
														<View style={{flex:1, flexDirection:'row', marginTop:-60}}>
															<Text style={{fontSize:12,color:'#e84f20'}}>Total</Text>
															<Text style={{fontSize:12,color:'#e84f20', marginLeft:72}}>:</Text>
															<Text style={{fontSize:12,color:'#e84f20', marginLeft:20}}>{this.convertToRupiah(item.price*item.qty)}</Text>
														</View>
													</View>
												</View>
											</View>
										</View>
								</Card>
								)}
								}
					ListEmptyComponent={
						<View style={{justifyContent:'center', marginTop:200}}>
							<Icon style={{alignSelf:'center'}} name="shopping-cart" size={40} color='#e84f20'/>
							<Text style={{textAlign:'center', fontSize:20, color:'#e84f20', fontWeight:'bold'}}>
							EMPTY CART
							</Text>
						</View>
					}		
				/>
						</View>
					</Card>
					<Card style={{borderRadius:10, marginTop:10}}>
						<View style={{flex:1, flexDirection:'row',justifyContent:'center', backgroundColor:'#e84f20',height:50, alignItems:"center"}}>
							<Icon style={{color:'white', marginRight:20}} size={30} name='wpforms'/>
							<Text style={{fontWeight:'bold', textAlign:'center', color:'white'}}>BUYER INFORMATION</Text>
						</View>
					</Card>
					<Card>
						<View style={{flex:1, flexDirection:'row'}}>
							<View style={{flex:1}}>
								<Text style={{fontSize:10,color:'#e84f20', marginTop:10, marginLeft:10}}>First Name</Text>
								<View>
									<TextInput style={{fontSize:10, paddingBottom:-5, height:40, width:150, marginLeft:10, borderBottomWidth:1, borderColor:'gray'}}/>
								</View>
							</View>
							<View style={{flex:1}}>
								<Text style={{fontSize:10,color:'#e84f20', marginTop:10, marginLeft:10}}>Last Name</Text>
								<View>
									<TextInput style={{fontSize:10, paddingBottom:-5, height:40, width:150, marginLeft:10, borderBottomWidth:1, borderColor:'gray'}}/>
								</View>
							</View>
						</View>
					<Text style={{fontSize:10,color:'#e84f20', marginTop:10, marginLeft:10}}>Full Address</Text>
						<View>
							<TextInput style={{fontSize:10, paddingBottom:-5, height:40, width:'93%', marginLeft:10, borderBottomWidth:1, borderColor:'gray'}}/>
						</View>
						<View style={{flex:1, flexDirection:'row', marginBottom:30}}>
							<View style={{flex:1}}>
								<Text style={{fontSize:10,color:'#e84f20', marginTop:10, marginLeft:10}}>Email</Text>
								<View>
									<TextInput style={{fontSize:10, paddingBottom:-5, height:40, width:150, marginLeft:10, borderBottomWidth:1, borderColor:'gray'}}/>
								</View>
							</View>
							<View style={{flex:1}}>
								<Text style={{fontSize:10,color:'#e84f20', marginTop:10, marginLeft:10}}>Phone</Text>
								<View>
									<TextInput style={{fontSize:10, paddingBottom:-5, height:40, width:150, marginLeft:10, borderBottomWidth:1, borderColor:'gray'}}/>
								</View>
							</View>
						</View>
					</Card>

					<Card style={{borderRadius:10, marginTop:10}}>
						<View style={{flex:1, flexDirection:'row',justifyContent:'center', backgroundColor:'#e84f20',height:50, alignItems:"center"}}>
							<Icon style={{color:'white', marginRight:20}} size={30} name='money'/>
							<Text style={{fontWeight:'bold', textAlign:'center', color:'white'}}>PAYMENT INFORMATION</Text>
						</View>
					</Card>

					<Card>			
						<Text style={{textAlign:'center', borderColor:'#e84f20',borderTopWidth:1, borderBottomWidth:1,fontWeight:'bold', color:'#e84f20'}}>Payment Support</Text>
						<View style={{flex:1}}>
							<View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
								<View style={{flex:1,alignItems:'center',marginLeft:30}}>
									<Image style={{alignSelf:"center", marginVertical:10,marginHorizontal:10, resizeMode:'stretch', width:100, height:20}} source={{uri:'https://www.drupal.org/files/project-images/logo_149.png'}}/>
								</View>
								<View style={{flex:1,alignItems:'center',marginLeft:40}}>
									<Image style={{alignSelf:"center", marginVertical:10,marginHorizontal:10, resizeMode:'stretch', width:40, height:30}} source={{uri:'https://www.azernews.az/media/2016/08/15/mastercard__logo_140815.jpg'}}/>
								</View>
								<View style={{flex:1, alignItems:'center',marginLeft:10}}>
									<Image style={{alignSelf:"center", marginVertical:10,marginHorizontal:10, resizeMode:'stretch', width:40, height:30}} source={{uri:'https://fidoalliance.org/wp-content/uploads/paypal_2014_logo_detail-1.png'}}/>
								</View>
								<View style={{flex:1,alignItems:'center',marginLeft:40}}>
									<Image style={{alignSelf:"center", marginVertical:10,marginHorizontal:10, marginRight:30, resizeMode:'stretch', width:70, height:30}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnn3o9oBQLsDmwLBtGSmO6Yx6JrgxE5sUSny5LoSHDUkc0uI1Y'}}/>
								</View>
							</View>
							<View style={{marginTop:10, alignSelf:'center'}}>
								<RadioForm
									radio_props={radio_props_payMethod}
									initial={0}
									onPress={(value) => {this.setState({payMethod:value},()=> alert(this.state.payMethod))}}	
								/>
							</View>
						</View>
						<Text style={{textAlign:'center', borderColor:'#e84f20',borderTopWidth:1,marginTop:20, borderBottomWidth:1,fontWeight:'bold', color:'#e84f20'}}>Shipper Support</Text>
						<View style={{flex:1}}>
							<View style={{flex:1, marginLeft:-20, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
								<View style={{flex:1,alignItems:'center',marginLeft:30}}>
									<Image style={{alignSelf:"center", marginVertical:10,marginHorizontal:10, resizeMode:'stretch', width:80, height:50}} source={{uri:'https://awsimages.detik.net.id/community/media/visual/2018/11/22/b2e0f558-ae89-45ea-a782-b9d4ee28ebe3.png?w=780&q=90'}}/>
								</View>
								<View style={{flex:1,alignItems:'center',marginLeft:10}}>
									<Image style={{alignSelf:"center", marginVertical:10,marginHorizontal:10, resizeMode:'stretch', width:120, height:100}} source={{uri:'https://ecs7.tokopedia.net/img/product-1/2017/1/19/119753/119753_e7894e05-ba91-4bce-ac8d-a6c06c1c6ec3.jpg'}}/>
								</View>
								<View style={{flex:1, alignItems:'center',marginLeft:10}}>
									<Image style={{alignSelf:"center", marginVertical:10,marginHorizontal:10, resizeMode:'stretch', width:80, height:60}} source={{uri:'https://garudapabrikagenda.com/wp-content/uploads/2018/11/Logo-Pos-Indonesia-2012.jpg'}}/>
								</View>
							</View>
							<View style={{alignSelf:'center', marginLeft:20, marginTop:-15, marginBottom:10}}>
								<RadioForm
									radio_props={radio_props_shipper}
									initial={0}
									onPress={(value) => {this.setState({shipper:value},()=> alert(this.state.shipper))}}	
								/>
							</View>
							<Text style={{textAlign:'center', borderColor:'#e84f20',borderTopWidth:1,marginTop:20, borderBottomWidth:1,fontWeight:'bold', color:'#e84f20'}}>Payment</Text>
							<View style={{flex:1}}>
								<View style={{}}>
									<Text style={{fontSize:18, color:'#e84f20'}}>Total Quantity  : {totalquantity}</Text>
								</View>
							<View style={{}}>
								<Text style={{fontSize:18, color:'#e84f20', marginBottom:30}}>Total Payment : {this.convertToRupiah(totalprice)}</Text>
							</View>
						</View>
						<View>
							<Button color='green' onPress={()=>{}} title='CHECKOUT'/>
						</View>
					</View>
				</Card>
			</ScrollView>
		)
	}
}

export default connect(mapStateToProps)(withNavigation(Payment))

const styles = StyleSheet.create({

	text : {
		fontSize:15, 
		color:'#e84f20',
		fontWeight:'bold',
		marginLeft: 40,
		marginTop: 40,
	},
	
  container: {
	 backgroundColor:'#000',
	 height:700,
	 justifyContent:'center',
	 alignItems: 'center'
	},
  item: {
		fontSize: 18,
		width:200,
		color:'#FFF',
		borderColor: '#FFF',
		alignSelf:'center',
		textAlign:'center',
		marginBottom: 40,
	},
	button: {
		color:'#000'
	},
	container : {
		flex: 1,
		borderTopWidth:1,
		borderBottomWidth: 1,
		borderTopColor: '#e84f20', 
		borderBottomColor:'#e84f20',
	},
	textInput: {
		borderWidth:1,
		borderColor: 'black',
		width:50,
		height:45,
		textAlign:'center'
	},
	title : {
		fontSize:15,
		color:'white',
		fontWeight: 'bold',
		margin:10,
		textAlign:'center',
		backgroundColor: '#e84f20'
	},

	model : {
		fontWeight: 'bold',
		fontSize:15,
		marginLeft:10,
		marginRight:10,
		color: '#e84f20'
	},

	ship : {
		fontWeight: 'bold',
		fontSize:15,
		marginLeft:40,
		marginTop:-40,
		color: '#e84f20'
	},

	paymethod : {
		fontWeight: 'bold',
		fontSize:15,
		marginLeft:40,
		color: '#e84f20'
	},

	total : {
		fontWeight: 'bold',
		fontSize:15,
		marginLeft:40,
		marginBottom:50,
		color: '#e84f20'
	},
	
	image: {
		width:150,
		height:150,
	},

	addItem: {
		fontSize:15,
		color:'#e84f20',
		fontWeight: 'bold',
		textAlign:'center'

	}
})