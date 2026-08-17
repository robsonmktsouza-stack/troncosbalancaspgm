import { NextResponse } from "next/server"
import { z } from "zod"
import { requireRole } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
const schema=z.object({companyName:z.string().min(2),email:z.string().email(),phone:z.string(),whatsapp:z.string()})
export async function PUT(request:Request){const user=await requireRole(["ADMIN"]);const parsed=schema.safeParse(await request.json().catch(()=>({})));if(!parsed.success)return NextResponse.json({error:"Dados inválidos"},{status:400});await prisma.companySetting.upsert({where:{key:"company"},create:{key:"company",value:parsed.data},update:{value:parsed.data}});await prisma.auditLog.create({data:{userId:user.id,action:"UPDATE",entity:"CompanySetting",entityId:"company"}});return NextResponse.json({ok:true})}
