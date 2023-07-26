const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const userFunc = require('./user.service')


//Register
router.post('/user/register', async (req, res) => {
    //our register logic goes here
    try {
        //get user input
        const { firstname, lastname, email, password } = req.body;

        //validate user input
        if (!(req.body.email && req.body.password && req.body.firstname && req.body.lastname)) {
            res.status(400).send('All input is required')
            return
        }

        //Check if user already exit
        //validate if user exit in our database 
        const oldUser = await userFunc.checkUserExit(email)

        if (oldUser) {
            res.status(409).send('User already exist. Please login')
            return
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10)

        const user = await userFunc.createUser(firstname, lastname, email.toLowerCase(), encryptedPassword)

        //create token
        const token = jwt.sign(
            { userID: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h'
            }
        )

        // //save user token
        user.token = token;

        // return new user
        res.status(201).send(user)

    } catch (error) {
        res.status(500).send(error)
    }
})

//Login
router.post('/user/login', async (req, res) => {
    //our login logic goes here
    try {
        //get user input
        const { email, password } = req.body;

        //validate user input
        if (!(req.body.email && req.body.password)) {
            res.status(400).send('All input is required')
            return
        }

        // //Check if user already exit
        // //validate if user exit in our database 
        const User = await userFunc.checkUserExit(email)

        if (User && (await bcrypt.compare(password, User.password))) {
            //create token
            const token = jwt.sign(
                { userID: User._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h'
                }
            )
            // //save user token
            User.token = token;

            return res.status(200).send(User)
        }

        res.status(400).send('Invalid Credentials')

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/welcome', auth, async (req, res) => {
    await res.status(200).send('Welcome')
})

module.exports = router;

