import { Request, Response } from "express"
import { verifyToken } from "./Token"
 

export async function isAuthorized(req: Request, res: Response, next: () => any) {
  try {
 
    const token = req.body.token || req.params.token || req.headers['token']

    if (!token) return res.status(401).send({ error: 'Not authorized' })

    console.log(token)
  
    const { decode, error }: any = await verifyToken(token)

    if (error && !decode) return res.status(200).send({ isValidToken: false, msg: "Token Invalido!" })

    next()
    // return res.status(200).send({ isValidToken: true, msg: "Token Correto!" })
  } catch (error) {
    return res.status(400).send({msg: "Token invalido!", error })
  }
 
}