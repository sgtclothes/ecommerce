'use strict'

const Order = use('App/Models/Order')
const Product = use('App/Models/Product')

class OrderController {


	async index ({response}) {
		const order = await Order.all()

		return response.json(order) 
	}

	// async insert ({ params, response }) {
	// 	const product = await Product.find(params.id)
	// 	const order =  new Order()
	// 	if (!product){
	// 		return response.status(404).json({data: 'Resource not found'})
	// 	}

	// 	order.product_id = product.id
	// 	order.title = product.title
	// 	order.name = product.name
	// 	order.price = product.price
	// 	order.image = product.image
	// 	order.qty = product.qty

	// 	await order.save()

	// 	return response.json('Succesfully inserted!')

	// }

	async store ({request, response}) {
		const productInfo = request.only(['title', 'id', 'name', 'price', 'image', 'qty'])

        const order = new Order()
        order.title = productInfo.title
        order.product_id = productInfo.id
        order.name = productInfo.name
        order.price = productInfo.price
		order.image = productInfo.image
		order.qty = productInfo.qty

        await order.save()

		return response.json(order)
	}

	async delete ({ params, response }) {
		const order = await Order.find(params.id)

		if(!order) {
			return response.status(404).json({data: 'Resource not found'})
		}

		await order.delete()

		return response.json(order)
	}

	async update ({params, request, response}) {
		const productInfo = request.only(['qty'])

		const order = await Order.find(params.id)
		if (!order) {
			return response.status(404).json({data: 'Resource not found'})
		}

		order.qty = productInfo.qty

		await order.save()

		return response.json(order)
	}

//   async index ({request}) {
// 		const { limit } = request.get()
// 	 return await Order.query().select('*').limit(limit).fetch()
// 	 }

// 	 async delete ({params, response}) {
// 		const product = await Product.find(params.id)
// 		if (!product) {
// 			return response.status(404).json({data: 'Resource not found'})
// 		}
// 		await product.delete()

// 		return response.status(204).json(null)
// 	}

	

}

module.exports = OrderController
