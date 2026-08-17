import { readFile } from "fs/promises"
import path from "path"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(_:Request,{params}:{params:Promise<{name:string}>}){
  const {name}=await params
  const clean=path.basename(decodeURIComponent(name))
  const url=`/api/files/${encodeURIComponent(clean)}`
  const [productDoc,customerDoc]=await Promise.all([
    prisma.productDocument.findFirst({where:{url}}),
    prisma.customerDocument.findFirst({where:{url},include:{customer:true}}),
  ])
  if(!productDoc&&!customerDoc)return NextResponse.json({error:"Arquivo não encontrado"},{status:404})
  if(productDoc&&!productDoc.isPublic){const user=await getCurrentUser();if(!user||user.role!=="ADMIN")return NextResponse.json({error:"Acesso negado"},{status:403})}
  if(customerDoc){const user=await getCurrentUser();const allowed=!!user&&(user.role==="ADMIN"||(user.role==="CUSTOMER"&&user.customer?.id===customerDoc.customerId)||(user.role==="REPRESENTATIVE"&&user.representative?.id===customerDoc.customer.representativeId));if(!allowed)return NextResponse.json({error:"Acesso negado"},{status:403})}
  try{const data=await readFile(path.resolve(process.cwd(),"storage",clean));const ext=path.extname(clean).toLowerCase();const types:Record<string,string>={".pdf":"application/pdf",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".txt":"text/plain",".xml":"application/xml",".csv":"text/csv"};return new NextResponse(data,{headers:{"Content-Type":types[ext]||"application/octet-stream","Content-Disposition":`inline; filename="${clean.replace(/\"/g,"")}"`}})}catch{return NextResponse.json({error:"Arquivo não encontrado"},{status:404})}
}
