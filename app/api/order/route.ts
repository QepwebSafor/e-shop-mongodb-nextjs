import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { User, Role } from "@prisma/client";

/* export async function POST(request: Request) {
  const currentUser = getCurrentUser();
  console.log('currentUser', currentUser)
//|| currentUser.role !== "ADMIN"
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { name, description, brand, price, category, inStock, images } = body;

  const order = await prisma.order.create({
    data: {
      name,
      description,
      brand,
      price: parseFloat(price),
      category,
      inStock,
      images
    }
  });
  return NextResponse.json(order);
} */

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
//|| currentUser.role !== "ADMIN"
  if (!currentUser ) {
    return NextResponse.error();
  }
   if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id, deliveryStatus } = body;
  const order = await prisma.order.update({
    where: { id: id },
    data: { deliveryStatus },
  });
  return NextResponse.json(order);
}
