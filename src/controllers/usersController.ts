import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from '../Token'

const prisma = new PrismaClient()

async function registerUser(req: Request, res: Response) {
  try {
    const user = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
        role: req.body.role,
      },
    })
    return res.status(201).send({ msg: 'User created Sucessfuly!!', user })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.users.findMany()

    return res.status(200).send( data)
  } catch (error) {
    return res.status(400).send({ error })
  }
}


async function Login(req: Request, res: Response) {
  try {
    const data = await prisma.users.findFirst({
      where: {
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      
      }
    })

    if (!data) return res.status(200).send({ msg: "Usuario ou senha Inválidos!!" })
    
   const token= await generateToken(data)

    return res.status(200).send({msg: "Login efetuado com sucesso!", token})
  } catch (error) {
    return res.status(400).send({ error })
  }
}


async function updateUser(req: Request, res: Response) {
  try {
    await prisma.users.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
        role: req.body.role,
      },
    })

    return res.status(200).send({ msg: 'User Deleted!!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    await prisma.users.delete({
      where: { id: req.params.id },
    })

    return res.status(200).send({ msg: 'User Updated!!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

export default { registerUser,Login, getAll, deleteUser, updateUser }
