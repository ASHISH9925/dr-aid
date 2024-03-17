import JWT from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
export const JWTPassword = "dlkfjdslsdfefvdffdgvfd4435545fbvbkf@@#$$%$#@#jojoewi1"

export  async function POST(
  req: Request,
  res: NextApiResponse,
) {
   const body = await req.json()
   const name = body.name
   const number = body.number  
   const token = JWT.sign({name, number}, JWTPassword)
   console.log(name,number,token);
   return NextResponse.json({ token })
   
  
}
