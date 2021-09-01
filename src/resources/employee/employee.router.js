const { Router } = require('express')

const router = Router()

router.route('/:id').get((req, res) => {
    res.send(200).send({ data: {} })
})
