import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Card, SearchBar } from 'native-base'
import ImageSlider from 'react-native-image-slider'
import { Rating, Header } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import numeral from 'numeral'
import 'numeral/locales/pt-br'
import { connect } from 'react-redux'
import {
  getProducts,
  incBadge,
  getProduct
} from '../src/publics/redux/actions/products'
import { getOrders } from '../src/publics/redux/actions/orders'
import IconBadge from 'react-native-icon-badge'

class LeftHeader extends Component {
  render () {
    return (
      <View style={{ marginBottom: 20 }}>
        <IconMaterialIcons
          color='white'
          name='menu'
          size={20}
          onPress={() => {}}
        />
      </View>
    )
  }
}
class CenterHeader extends Component {
  render () {
    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>FLASH SALE</Text>
      </View>
    )
  }
}
class RightHeader extends Component {
  toCart = () => {
    this.props.navigation.navigate('Cart')
  }
  render () {
    return (
      <View style={{ marginBottom: 20 }}>
        <IconBadge
          MainElement={
            <View>
              <IconFontAwesome
                onPress={this.toCart}
                color='white'
                name='shopping-cart'
                size={30}
                style={{ top: -2 }}
              />
            </View>
          }
          BadgeElement={
            <Text style={{ color: 'white', fontSize: 8 }}>
              {this.props.badge}
            </Text>
          }
          IconBadgeStyle={{
            width: 12,
            height: 12,
            top: -3,
            left: 12,
            backgroundColor: 'red'
          }}
          Hidden={this.props.badge == 0}
        />
      </View>
    )
  }
}
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: [],
      dialogVisible: false,
      qty: 1,
      currentProduct: {},
      query: ''
    }
  }

  showDialog () {
    this.setState({ dialogVisible: true })
  }

  handleCancel = () => {
    this.setState({ qty: 1, dialogVisible: false })
  }

  handleSearch = text => {
    this.setState({ query: text })
  }

  componentDidMount () {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.fetchData()
    })
  }

  async fetchData () {
    await this.props.dispatch(getProducts())
    await this.props.dispatch(getOrders())
  }

  render () {
    if (this.props.products.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size='large' color='#e84f20' />
        </View>
      )
    } else {
      return (
        <View style={{ backgroundColor: '#eff2f7' }}>
          <Header
            containerStyle={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#e84f20',
              borderBottomColor: '#e84f20'
            }}
            leftComponent={<LeftHeader />}
            centerComponent={<CenterHeader />}
            rightComponent={
              <RightHeader
                {...this.props}
                badge={this.props.orders.data.length}
              />
            }
          />
          <ScrollView>
            <View>
              <View>
                <ImageSlider
                  style={{ height: 200, width: '100%', resizeMode: 'stretch' }}
                  loopBothSides
                  autoPlayWithInterval={1000}
                  loop
                  images={[
                    'http://cdn2.tstatic.net/jogja/foto/bank/images/shopee-tawarkan-jutaan-produk-fashion-ternama-head-to-toe_20180923_172409.jpg',
                    'https://ciyashop.potenzaglobalsolutions.com/mega-store/wp-content/uploads/sites/43/2017/06/video-cover-1170x500.jpg',
                    'https://4.imimg.com/data4/UW/JT/MY-7710710/clothes-banner-500x500.jpg',
                    'https://jadeblue.com/media/wysiwyg/jadeblue/home/homeslider/Bespoke%20Kurta%20Koti.jpg'
                  ]}
                />
              </View>
              <View style={{ marginBottom: 120 }}>
                <Card>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontWeight: 'bold',
                        color: '#e84f20',
                        marginBottom: 10
                      }}
                    >
                      CATEGORIES
                    </Text>
                    <View style={{ alignItems: 'center' }}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View>
                          <TouchableOpacity>
                            <Image
                              style={{ marginLeft: 10, width: 50, height: 50 }}
                              source={{
                                uri: 'https://i.imgur.com/YXrD0Oh.png'
                              }}
                            />
                            <Text style={{ fontSize: 10 }}>Casual Shirt</Text>
                          </TouchableOpacity>
                          <View style={{ marginVertical: 5 }} />
                          <TouchableOpacity>
                            <Image
                              style={{ marginLeft: 10, width: 50, height: 50 }}
                              source={{
                                uri: 'https://i.imgur.com/0Z0k0iT.png'
                              }}
                            />
                            <Text style={{ fontSize: 10 }}>Party Dress</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <TouchableOpacity>
                            <Image
                              style={{ marginLeft: 10, width: 50, height: 50 }}
                              source={{
                                uri: 'https://i.imgur.com/bP6zkW6.png'
                              }}
                            />
                            <Text style={{ fontSize: 10, marginLeft: 15 }}>
                              Jeans
                            </Text>
                          </TouchableOpacity>
                          <View style={{ marginVertical: 5 }} />
                          <TouchableOpacity>
                            <Image
                              style={{ marginLeft: 20, width: 50, height: 50 }}
                              source={{
                                uri: 'https://i.imgur.com/Q0jGi7V.png'
                              }}
                            />
                            <Text style={{ fontSize: 10, marginLeft: 10 }}>
                              Formal Shirt
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <TouchableOpacity>
                            <Image
                              style={{ marginLeft: 10, width: 50, height: 50 }}
                              source={{
                                uri: 'https://i.imgur.com/KUq0uRF.png'
                              }}
                            />
                            <Text style={{ fontSize: 10, marginLeft: 15 }}>
                              Shoes
                            </Text>
                          </TouchableOpacity>
                          <View style={{ marginVertical: 5 }} />
                          <TouchableOpacity>
                            <Image
                              style={{ marginLeft: 10, width: 50, height: 50 }}
                              source={{
                                uri: 'https://i.imgur.com/yEnNLLn.png'
                              }}
                            />
                            <Text style={{ fontSize: 10, marginLeft: 20 }}>
                              Hats
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                          <TouchableOpacity>
                            <Image
                              style={{ marginLeft: 10, width: 50, height: 50 }}
                              source={{
                                uri: 'https://i.imgur.com/JWnVrtD.png'
                              }}
                            />
                            <Text style={{ fontSize: 10, marginLeft: 15 }}>
                              Vintage
                            </Text>
                          </TouchableOpacity>
                          <View style={{ marginVertical: 5 }} />
                          <TouchableOpacity>
                            <Image
                              style={{ marginLeft: 20, width: 50, height: 50 }}
                              source={{
                                uri: 'https://i.imgur.com/7NEFIXm.png'
                              }}
                            />
                            <Text style={{ fontSize: 10, marginLeft: 10 }}>
                              Funny Stuff
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
                <View>
                  <TouchableOpacity>
                    <Image
                      style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'stretch'
                      }}
                      source={{ uri: 'https://i.imgur.com/RbgejBb.jpg' }}
                    />
                  </TouchableOpacity>
                </View>
                <Card>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontWeight: 'bold',
                        color: '#e84f20',
                        marginRight: 160
                      }}
                    >
                      FLASH SALE
                    </Text>
                    <TouchableOpacity>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontWeight: 'bold',
                          color: '#e84f20'
                        }}
                      >
                        See all
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={this.props.products.data}
                    refreshing={this.props.products.isLoading}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                      if (item.SALE == 1) {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navigation.navigate('Detail', {
                                id: item.id
                              })
                            }}
                          >
                            <View
                              style={{
                                alignItems: 'center',
                                marginHorizontal: 5,
                                marginRight: -5,
                                zIndex: 1
                              }}
                            >
                              <Card>
                                <View style={{ marginBottom: 5 }}>
                                  <Image
                                    style={{
                                      width: 150,
                                      height: 150,
                                      alignSelf: 'center'
                                    }}
                                    source={{ uri: item.image }}
                                  />
                                  <View
                                    style={{
                                      width: '100%',
                                      alignSelf: 'center'
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        textAlign: 'center',
                                        color: '#e84f20',
                                        justifyContent: 'center'
                                      }}
                                    >
                                      {item.name}
                                    </Text>
                                  </View>
                                  <Text
                                    style={{
                                      fontSize: 10,
                                      textAlign: 'center',
                                      color: '#e84f20',
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    Rp. {numeral(item.price).format(',')}
                                  </Text>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignSelf: 'center',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    <IconFontAwesome
                                      style={{
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                        marginTop: 5
                                      }}
                                      name='heart'
                                      size={10}
                                      color='red'
                                    />
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        marginTop: 5,
                                        marginLeft: 5,
                                        color: '#e84f20'
                                      }}
                                    >
                                      {'('}
                                      {item.likes}
                                      {')'}
                                    </Text>
                                    <Rating
                                      style={{ marginTop: 10, marginLeft: 40 }}
                                      imageSize={10}
                                      readonly
                                      startingValue={item.rating}
                                    />
                                  </View>
                                </View>
                              </Card>
                            </View>
                          </TouchableOpacity>
                        )
                      }
                    }}
                  />
                </Card>
                <FlatList
                  data={this.props.products.data}
                  numColumns={2}
                  refreshing={this.props.products.isLoading}
                  renderItem={({ item, index }) => {
                    let sale
                    if (item.SALE == 1) {
                      sale = (
                        <View>
                          <Image
                            style={{
                              height: 30,
                              width: 50,
                              position: 'absolute',
                              zIndex: 2,
                              top: 30,
                              resizeMode: 'stretch',
                              left: 120,
                              transform: [{ rotate: '-30deg' }]
                            }}
                            source={{
                              uri:
                                'http://www.iwokcenter.com/public/live/static/upload/post/2017-07/Special-offer-Download-PNG.png'
                            }}
                          />
                        </View>
                      )
                    }
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('Detail', {
                            id: item.id
                          })
                        }}
                      >
                        {sale}
                        <View
                          style={{
                            alignItems: 'center',
                            margin: 20,
                            marginRight: -5,
                            marginBottom: -5,
                            zIndex: 1
                          }}
                        >
                          <Card>
                            <View style={{ marginBottom: 5 }}>
                              <Image
                                style={{
                                  width: 150,
                                  height: 150,
                                  alignSelf: 'center'
                                }}
                                source={{ uri: item.image }}
                              />
                              <View
                                style={{ width: '100%', alignSelf: 'center' }}
                              >
                                <Text
                                  style={{
                                    fontSize: 10,
                                    textAlign: 'center',
                                    color: '#e84f20',
                                    justifyContent: 'center'
                                  }}
                                >
                                  {item.name}
                                </Text>
                              </View>
                              <Text
                                style={{
                                  fontSize: 10,
                                  textAlign: 'center',
                                  color: '#e84f20',
                                  fontWeight: 'bold'
                                }}
                              >
                                Rp. {numeral(item.price).format(',')}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignSelf: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <IconFontAwesome
                                  style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    marginTop: 5
                                  }}
                                  name='heart'
                                  size={10}
                                  color='red'
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    marginTop: 5,
                                    marginLeft: 5,
                                    color: '#e84f20'
                                  }}
                                >
                                  {'('}
                                  {item.likes}
                                  {')'}
                                </Text>
                                <Rating
                                  style={{ marginTop: 10, marginLeft: 40 }}
                                  imageSize={10}
                                  readonly
                                  startingValue={item.rating}
                                />
                              </View>
                            </View>
                          </Card>
                        </View>
                      </TouchableOpacity>
                    )
                  }}
                  keyExtractor={(item, index) => String(index)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  cover: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingTop: 50,
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    products: state.products,
    orders: state.orders
  }
}

export default connect(mapStateToProps)(withNavigation(Home))
