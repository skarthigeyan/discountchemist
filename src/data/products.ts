import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { and, eq, isNotNull } from "drizzle-orm";

export async function getSaleProducts() {
  return db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      price: products.price,
      compareAtPrice: products.compareAtPrice,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(and(eq(products.isActive, true), isNotNull(products.compareAtPrice)));
}

export type SaleProduct = Awaited<ReturnType<typeof getSaleProducts>>[number];
