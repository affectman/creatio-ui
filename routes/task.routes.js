const Task = require('../models/Task')
const {Router} = require('express')
const config = require('config')
const auth = require('../auth/auth.moddleware')
const router = Router()

router.post('/creating', auth, async (req, res) => {
    try {
        const title = req.body.title
        const time = req.body.time

        const task = new Task({
            title, text : req.body.text, time, owner : req.user.userId
        })

        await task.save()

        res.status(201).json({task})

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({owner: req.user.userId})
        res.json(tasks)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.json(task)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router