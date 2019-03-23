import React, { Component } from 'react'
import {StyleSheet, TextInput, Button, Text, View, Image, FlatList, TouchableOpacity, Modal} from 'react-native'
import { Card, Container} from 'native-base'
import {SearchBar, Rating, Header} from 'react-native-elements'
import {withNavigation} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Dialog from 'react-native-dialog'
import {connect} from 'react-redux'
import {getOrders, deleteOrder, updateQty} from '../src/publics/redux/actions/orders'
import IconBadge from 'react-native-icon-badge'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { incBadge } from '../src/publics/redux/actions/products';

const mapStateToProps = (state) => {
	return {
		orders : state.orders,
		products : state.products
	}
}

class LeftHeader extends Component {
	render() {
		return(
			<View style={{marginBottom:20}}>
				<IconMaterialIcons color='white' name='menu' size={20} onPress={()=>{}}/>
			</View>
		)
	}
}

class CenterHeader extends Component {
	render() {
		return(
			<View style={{marginBottom:20}}>
				<Text style={{color: 'white', fontWeight:'bold'}}>SHOPPING CART</Text>
			</View>
		)
	}
}

class RightHeader extends Component {
	
	render() {
		
		return(
			<View style={{marginBottom:20}}>	
				<IconMaterialIcons color='white' name='chat' size={20} style={{top:-2}}	/>
			</View>
		)
	}
}
class Cart extends Component {

	constructor(props) {
		super(props) 
		this.state = {
			cart:[],
			currentCart:{},
			currentQty:'',
			currentId:'', 
			dialogVisible:false, 
			dialogDelete:false,
			modalVisible:false
		}
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	  }
	
	async fetchData() {
		await this.props.dispatch(getOrders())
		
}

	async handleIncrement(id,qty) {
		await this.props.dispatch(updateQty(id,qty+1))
		await this.props.dispatch(getOrders())
	}

	async handleDecrement(id,qty) {
		await this.props.dispatch(updateQty(id,qty-1))
		await this.props.dispatch(getOrders())
	}

	handleDelete(id) {
		this.props.dispatch(deleteOrder(id))
		this.props.dispatch(getOrders())
		this.setModalVisible(!this.state.modalVisible)
	}

	convertToRupiah(price) {
		var rupiah = ''
		var angkarev = price.toString().split('').reverse().join('')
		for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.'
		return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('')
	}

	componentDidMount() {
		this.focusListener = this.props.navigation.addListener('didFocus',()=>{
		this.fetchData()
		}
		)
	}
		
  render() {
	let totalquantity =0
	let totalprice = 0
	this.props.orders.data.forEach((item)=> {
	totalquantity+=item.qty
	totalprice+=item.qty*item.price
	}
	)
	return (
		<Container>
			<View>
				<Header containerStyle={{ height:50,alignItems:'center', justifyContent:'center', backgroundColor:'#e84f20'}}
							centerComponent={<CenterHeader/>}
							rightComponent={<RightHeader badge={this.props.products.badge}/>}
						/>	
			</View>
			<FlatList 
				data={this.props.orders.data} 
				refreshing={this.props.orders.isLoading}
				onRefresh={this.getData}
				keyExtractor={(item,index)=>String(index)} 
				renderItem= {
					({item, index}) => {
						return (
							<View>

							<Card>
								<View style={{flex:1, flexDirection:'row'}}>
									<Image 
									style={{marginLeft:10, resizeMode:'stretch', width:130, height:150, marginVertical:5}} 
									source={{uri:item.image}}/>
									<View style={{flex:1}}>
										<Text style={{marginVertical:5, marginLeft:10, fontWeight:'bold', color:'#ff7043'}}>{item.name}</Text>
											<View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
												<View style={{alignItems:'center', flex:1, flexDirection:'row', justifyContent:'center', marginRight:20}}>
													<TouchableOpacity>
														<View style={{marginLeft:20}}>
															<IconFontAwesome onPress={()=>this.handleDecrement(item.id,item.qty)} name='minus' size={20} color='#ff7043'/>
														</View>	
													</TouchableOpacity>
													<TextInput style={{textAlign:'center', borderWidth:1,paddingHorizontal:20, marginHorizontal:20}} defaultValue={String(item.qty)} onChangeText={(text)=>{this.props.dispatch(updateQty(item.id,text))}}/>
													<TouchableOpacity>
														<View>
															<IconFontAwesome onPress={()=>this.handleIncrement(item.id,item.qty)} name='plus' size={20} color='#ff7043'/>
														</View>	
													</TouchableOpacity>
												</View>
												<View style={{marginRight:30}}>
													<TouchableOpacity onPress={()=>{
														this.setModalVisible(true)
														}} style={{marginVertical:10}}>
														<View style={{borderWidth:1, borderColor:'red', shadowColor:'grey', padding:5, borderRadius:5, backgroundColor:'red'}}>
															<IconFontAwesome color='white' name='trash-o' size={25} />
														</View>
													</TouchableOpacity>
												</View>
											</View>
											<View>
											<Text style={{fontWeight:'bold', marginLeft:10, color:'#e84f20'}}>Price : {this.convertToRupiah(item.price)}</Text>
												<Text style={{fontWeight:'bold', marginLeft:10, color:'#e84f20'}}>Sub total : {this.convertToRupiah(item.qty*item.price)}</Text>
											</View>
									</View>
								</View>
								<Card>
									<View style={{flex:1, flexDirection:'row'}}>
										<View style={{alignItems:"center", justifyContent:'center', marginHorizontal:5}}>
											<IconFontAwesome color='#ff7043' name='shopping-cart' size={30} />
										</View>
										<View style={{width:'100%',flexDirection:'row' }}>
											<Text style={{fontSize:10, textAlign:'justify', marginRight:30}}>
												Up to Rp. 150.000 off shipping with min spend starting from Rp. 20.000
											</Text>
										</View>
									</View>
								</Card>
							</Card>
							<View>
								<Modal
									
									animationType="fade"
									transparent={true}
									visible={this.state.modalVisible}
									>
									<View style={{width:'100%', height:'100%',backgroundColor:'rgba(0.5,0.5,0.5,0.8)', justifyContent:'center', alignSelf:'center', alignContent:'center', alignItems:'center'}}>
										<View style={{ backgroundColor:'white', width:'90%', height:200, alignItems:'center', justifyContent:'center'}}>
										<Text style={{marginHorizontal:50, fontWeight:'bold'}}>Are you sure you want to delete {item.name} ?</Text>
											<View style={{flexDirection:'row', marginTop:40}}>
												<TouchableOpacity
													onPress={() => {
													this.setModalVisible(!this.state.modalVisible)
													}}>
													<Text style={{marginLeft:-20}}>Cancel</Text>
												</TouchableOpacity>
												<TouchableOpacity
													onPress={() => {this.handleDelete(item.id)}}>
													<Text style={{marginLeft:120}}>Yes</Text>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</Modal>
							</View>
							</View>
						)
					}
				}
				ListEmptyComponent={
					<View style={{justifyContent:'center', marginTop:250}}>
						<Icon style={{alignSelf:'center'}} name="shopping-cart" size={40} color='#e84f20'/>
						<Text style={{textAlign:'center', fontSize:20, color:'#e84f20', fontWeight:'bold'}}>
							EMPTY CART
						</Text>
					</View>
				}/>
				<View style={{flexDirection:'row'}}>
					<Text style={{fontWeight:'bold', color:'#e84f20', marginLeft:10, width:200, fontSize:15, justifyContent:'center', alignSelf:'center'}} onPress={()=>alert(JSON.stringify(this.props.orders.data))}>Total : {this.convertToRupiah(totalprice)}</Text>
					<View style={{marginLeft:30}}>
						<Button color='#e84f20' title='Check out' onPress={()=>{this.props.navigation.navigate('Payment')}}></Button>
					</View>
				</View>
			{/* <Dialog.Container visible={this.state.dialogVisible}>
        <Dialog.Title>Add to Cart</Dialog.Title>
        <Dialog.Description>
          Set quantity :
        </Dialog.Description>
				<View style={{alignSelf:'center', borderWidth:1, height:50, width:80}}>
					<TextInput keyboardType='number-pad' style={{ textAlign:'center'}} defaultValue={this.state.currentQty.toString()} onChangeText={(currentQty)=>this.setState({currentQty})}/> 
				</View>
				<Dialog.Button label="Cancel" onPress={()=>{axios.get('http://192.168.1.133:3333/count').then(
					res=>{
						this.setState({cart:res.data, dialogVisible:false})
					}
					)}} />
        <Dialog.Button label="OK" onPress={()=>{this.setQty()}} />
      </Dialog.Container>

			<Dialog.Container visible={this.state.dialogDelete}>
        <Dialog.Title>Delete Product</Dialog.Title>
        <Dialog.Description>
					Are you sure you want to delete
        </Dialog.Description>
				<View style={{marginTop:-20}}>
					<Text style={{alignSelf:'center', fontSize:20, fontWeight:'bold', color:'#1E90FF'}}>{this.state.currentCart.title} ?</Text>
				</View> 
				<Dialog.Button label="Cancel" onPress={()=>{axios.get('http://192.168.1.133:3333/count').then(
					res=>{
						this.setState({cart:res.data, dialogDelete:false})
					})}} />
        <Dialog.Button label="OK" onPress={()=>{			
					axios.delete('http://192.168.1.133:3333/delete/'+this.state.currentCart.id).then(
						()=>axios.get('http://192.168.1.133:3333/count').then(
					res=>{
						this.setState({cart:res.data, dialogDelete:false})
					}))}} />
      </Dialog.Container> */}

			{/* <Text style={{borderTopWidth:1, color:'#1E90FF'}}> Total Payment : </Text>
			<Text style={{borderTopWidth:1, color:'#1E90FF', fontSize:30}}>{totalprice}</Text>
			<Button color='green' onPress={()=>{this.props.navigation.navigate('Payment')}} title='Proceed to Pay'></Button> */}
		</Container>
    )
	}
}

export default connect(mapStateToProps)(withNavigation(Cart))

const styles = StyleSheet.create({
	container : {
		flex: 1,
		borderTopWidth:1,
		borderBottomWidth: 1,
		borderTopColor: '#1E90FF', 
		borderBottomColor:'#1E90FF',
	},
	textInput: {
		borderWidth:1,
		borderColor: 'black',
		width:100,
		height:40,
		textAlign:'center',
		alignContent: 'center',
		fontSize:20
	},
	title : {
		fontSize:15,
		color:'white',
		fontWeight: 'bold',
		margin:10,
		textAlign:'center',
		backgroundColor: '#1E90FF'
	},
	model : {
		fontWeight: 'bold',
		fontSize:15,
		marginLeft:10,
		marginRight:10,
		color: '#1E90FF',
		textAlign:'center'
	},
	image: {
		width:150,
		height:150,
	},
	addItem: {
		fontSize:15,
		color:'#1E90FF',
		fontWeight: 'bold',
		textAlign:'center'

	}
}
)

