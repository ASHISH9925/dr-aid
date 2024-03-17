import { PrismaClient } from "@prisma/client";
import JWT from "jsonwebtoken";
import type { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { JWTPassword } from "../auth/route";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  res: NextApiResponse,

) {
  const auth = req.headers.get("Authorization")
  if(!auth){
    return NextResponse.json({ error: "invalid token" })
  }
  try {
    const decoded = JWT.verify(auth, JWTPassword);
    console.log(decoded)
    const body = await req.json();
   const dbRes =  await prisma.record.create({
      data:{
        bill:body.bill,
        diagnosis: body.diagnosis,
        name: body.name,
        phone_number: body.phone_number,
        next_visit: body.next_visit,
        prescription: body.prescription,
        doctor_name: decoded.name,
        doctor_phoneNumber: decoded.number,
        notes:body.notes
      }
    });
    return NextResponse.json({
      success:true,
      data:dbRes
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "invalid token" })
  }
}