import { PrismaClient } from "@prisma/client";
import JWT from "jsonwebtoken";
import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { JWTPassword } from "../auth/route";

const prisma = new PrismaClient();

export async function GET(req: Request, res: NextApiResponse) {
  const auth = req.headers.get("Authorization");
  if (!auth) {
    return NextResponse.json({ error: "invalid token" });
  }
  try {
    const decoded = JWT.verify(auth, JWTPassword);
    console.log(decoded);
    const phone = decoded.number;
    const dbRes = await prisma.record.findMany({
      where: {
        doctor_phoneNumber: phone,
      },
    });
    return NextResponse.json({
      success: true,
      data: dbRes,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "invalid token" });
  }
}
