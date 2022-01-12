const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/destroy', checkRole('ADMIN'), basketController.destroy)
router.post('/create', checkRole('ADMIN'), basketController.create)
router.get('/', checkRole('ADMIN'), basketController.getOne)

module.exports = router
