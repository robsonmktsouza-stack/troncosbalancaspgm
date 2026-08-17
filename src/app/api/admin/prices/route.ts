import { NextResponse } from "next/server"
import { z } from "zod"
import { requireRole } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
const schema=z.object({priceTableId:z.string().min(1),productId:z.string().min(1),price:z.coerce.number().nonnegative(),minQty:z.coerce.number().positive()})
export async function PUT(request:Request){const user=await requireRole(["ADMIN"]);const parsed=schema.safeParse(await request.json().catch(()=>({})));if(!parsed.success)return NextResponse.json({error:"Dados inválidos."},{status:400});const d=parsed.data;const item=await prisma.priceTableItem.upsert({where:{priceTableId_productId:{priceTableId:d.priceTableId,productId:d.productId}},create:d,update:{price:d.price,minQty:d.minQty}});await prisma.auditLog.create({data:{userId:user.id,action:"UPSERT_PRICE",entity:"PriceTableItem",entityId:item.id,payload:{price:d.price,minQty:d.minQty}}});return NextResponse.json({ok:true,item})}
