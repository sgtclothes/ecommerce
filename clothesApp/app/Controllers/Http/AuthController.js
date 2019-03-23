'use strict'

const User = use('App/Models/User')

class AuthController {

    async register({request, auth, response}) {
    
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let user = new User()
        user.username = username
        user.email = email
        user.password = password

        user = await user.save()
        return response.json({"user": user})
}

    async login({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
        if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken = await auth.generate(user)
            return response.json({"user":user, "access_token": accessToken})
        }
    }
        catch (e) {
        return response.json({message: 'You first need to register!'})
        }
    }

    async show ({params, response}) {
        try {
           const user = await User.find(params.id)

           return response.json(user)
        } catch (error) {
            return response.send({message:'Error'})
        }

       
   }

}

module.exports = AuthController
