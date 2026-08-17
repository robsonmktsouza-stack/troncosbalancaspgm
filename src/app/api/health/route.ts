import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export async function GET(){try{await prisma.$queryRaw`SELECT 1`;return NextResponse.json({ok:true,service:"pgm-portal",database:"up"})}catch{return NextResponse.json({ok:false,service:"pgm-portal",database:"down"},{status:503})}}
