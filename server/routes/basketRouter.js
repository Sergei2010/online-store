const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), basketController.create)
//router.get('/', checkRole('ADMIN'), basketController.getAll)
router.get('/', checkRole('ADMIN'), basketController.getOne)

module.exports = router
