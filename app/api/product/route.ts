import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { User, Role } from "@prisma/client";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  console.log('currentUser', currentUser)
//|| currentUser.role !== "ADMIN"
  if (!currentUser) {
    return NextResponse.error();
  }
  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { name, description, brand, price, category, inStock, images } = body;

  const product = await prisma.product.create({
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
  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const currentUser = getCurrentUser();
//|| currentUser.role !== "ADMIN"
  if (!currentUser ) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { id, inStock } = body;
  const product = await prisma.product.update({
    where: { id: id },
    data: { inStock },
  });
  return NextResponse.json(product);
}
