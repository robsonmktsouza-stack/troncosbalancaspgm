import { NextResponse } from "next/server"
import { z } from "zod"
import { requireRole } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
const schema=z.object({status:z.enum(["REQUESTED","IN_ANALYSIS","SENT","APPROVED","REJECTED","EXPIRED"])})
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){const user=await requireRole(["ADMIN"]);const parsed=schema.safeParse(await request.json().catch(()=>({})));if(!parsed.success)return NextResponse.json({error:"Status inválido"},{status:400});const{id}=await params;const quote=await prisma.quote.update({where:{id},data:{status:parsed.data.status}});await prisma.auditLog.create({data:{userId:user.id,action:"UPDATE_STATUS",entity:"Quote",entityId:id,payload:{status:parsed.data.status}}});return NextResponse.json({ok:true,quote})}
