const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('../config')

router.post('/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные даные при регистрации'
                })
            }

            const {email, password} = req.body
            const contact = await User.findOne({email})

            if(contact){
                return res.status(400).json({message: "Такой пользак уже есть в системе"})
            }

            const hashPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashPassword})
            await user.save()

            res.status(201).json({message: 'Пользователь успешно создан'})

        } catch (e) {
            res.status(500).json({message : 'Ты все испортил :( '})
        }
    })

router.post('/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные даные при входе в систему'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({ email })

            if(!user){
                return res.status(400).json({message: "Пользователь не найден"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message: "Ошибочка, что то введено неверно"})
            }

            const token = jwt.sign(
                {userId : user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({ token, userId: user.id})



        } catch (e) {
            res.status(500).json({message : 'Ты все испортил :( '})
        }
})

module.exports = router