import { NextResponse } from "next/server"
import { z } from "zod"
import { requireRole } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
const schema=z.object({status:z.enum(["ACTIVE","DRAFT","INACTIVE"]).optional(),featured:z.boolean().optional(),priceOnRequest:z.boolean().optional(),basePrice:z.coerce.number().nonnegative().nullable().optional(),stockStatus:z.string().min(2).optional(),leadTimeDays:z.coerce.number().int().positive().nullable().optional()})
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){const user=await requireRole(["ADMIN"]);const parsed=schema.safeParse(await request.json().catch(()=>({})));if(!parsed.success)return NextResponse.json({error:"Dados inválidos"},{status:400});const{id}=await params;const product=await prisma.product.update({where:{id},data:parsed.data});await prisma.auditLog.create({data:{userId:user.id,action:"UPDATE",entity:"Product",entityId:id,payload:parsed.data}});return NextResponse.json({ok:true,product})}
