import { NextResponse } from "next/server"
import { requireRole } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(_:Request,{params}:{params:Promise<{id:string}>}){
  const user=await requireRole(["ADMIN"])
  const {id}=await params
  const quote=await prisma.quote.findUnique({where:{id},include:{items:true,order:true}})
  if(!quote)return NextResponse.json({error:"Orçamento não encontrado."},{status:404})
  if(quote.order)return NextResponse.json({error:"Este orçamento já foi convertido."},{status:409})
  if(!quote.customerId)return NextResponse.json({error:"Vincule o prospect a um cliente antes de converter."},{status:400})
  if(quote.status!=="APPROVED")return NextResponse.json({error:"Aprove o orçamento antes de gerar o pedido."},{status:400})
  const last=await prisma.order.findFirst({orderBy:{createdAt:"desc"},select:{number:true}})
  const seq=(Number(last?.number.split("-").pop())||0)+1
  const number=`PED-${new Date().getFullYear()}-${String(seq).padStart(4,"0")}`
  const order=await prisma.$transaction(async tx=>{
    const created=await tx.order.create({data:{number,quoteId:quote.id,customerId:quote.customerId!,representativeId:quote.representativeId,status:"CONFIRMED",subtotal:quote.subtotal,discount:quote.discount,freight:quote.freight,total:quote.total,paymentTerms:quote.commercialTerms,items:{create:quote.items.map(i=>({productId:i.productId,quantity:i.quantity,unitPrice:i.unitPrice,discount:i.discount,total:i.total,notes:i.notes}))}}})
    await tx.quote.update({where:{id:quote.id},data:{status:"CONVERTED"}})
    if(quote.representativeId){
      const rep=await tx.representative.findUnique({where:{id:quote.representativeId}})
      if(rep&&Number(quote.total)>0){const pct=Number(rep.commissionRate);await tx.commission.create({data:{representativeId:rep.id,orderId:created.id,competence:new Date().toISOString().slice(0,7),percentage:pct,baseAmount:quote.total,amount:Number(quote.total)*pct/100,status:"FORECAST"}})}
    }
    await tx.auditLog.create({data:{userId:user.id,action:"CONVERT",entity:"Quote",entityId:quote.id,payload:{orderNumber:number}}})
    return created
  })
  return NextResponse.json({ok:true,orderNumber:order.number})
}
