import { Router, Request, Response } from 'express'
import { isAuthorized } from './authorize'
import usersController from './controllers/usersController'

const routes = Router()

routes.get('/', function (req: Request, res: Response) {
  return res.send({ msg: ` 🌄 Api Running` })
})


routes.get('/all', usersController.getAll)
routes.post('/register',  isAuthorized, usersController.registerUser)
routes.post('/login', usersController.Login)
routes.put('/update/:id', usersController.updateUser)
routes.delete('/delete/:id', usersController.deleteUser)

export default routes
