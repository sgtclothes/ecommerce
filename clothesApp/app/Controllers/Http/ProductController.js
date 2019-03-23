'use strict'

const Product = use('App/Models/Product')

class ProductController {
		
	async index ({request}) {
		const { limit } = request.get()
	 	return await Product.query().select('*').limit(limit).fetch()
	 }
 
	async insert ({ request }) {
		const { name, price, image, desc, qty } = request.post()
		return await Product.query().insert(request.post())
	 }

	async show ({params, response}) {
		 try {
			const product = await Product.find(params.id)
			// const product = await Product.query().select('*').where('id',params.id).fetch()
			return response.json({'product':product})
		 } catch (error) {
			return response.send({message:'Item not found'})
		 }
	}

	async error({response}) {
        return await response.status(200).json({message:'Error'})
    }

	async delete ({params, response}) {
		const product = await Product.find(params.id)
		if (!product) {
			return response.status(404).json({data: 'Resource not found'})
		}
		await product.delete()

		return response.status(204).json(null)
	}

	async update ({params, request, response}) {
		const productInfo = request.only(['title', 'price', 'image', 'desc', 'qty'])

		const product = await Product.find(params.id)
		if (!product) {
			return response.status(404).json({data: 'Resource not found'})
		}
		product.name = productInfo.name
		product.price = productInfo.price
		product.image = productInfo.image
		product.desc = productInfo.desc
		product.qty = productInfo.qty

		await product.save()

		return response.status(200).json(product)
	}

	//Latihan Adonis

	async selectIDTwo ({request}) {
		const {id} = request.get()
		return await Product.query().select('*').where('id','=',2).fetch()
	}

	async showAProduct ({params, response}) {
		const product = await Product.find(params.id)

		if(!product) {
			return response.json('Produk tidak ditemukan')
		}

		return response.json(product)
	}

}

module.exports = ProductController
