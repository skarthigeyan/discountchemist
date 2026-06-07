# Data Fetching

## Rules

- **Server Components only** — ALL data fetching must happen in React Server Components. Never fetch data inside Client Components (`"use client"`).
- **`/data` directory** — ALL database queries must go through helper functions in `src/data/`. Never query the database directly from a page or component.
- **Drizzle ORM only** — All helper functions in `src/data/` must use Drizzle ORM. No raw SQL strings, no other query builders.

## Pattern

```
src/data/products.ts        ← helper functions using Drizzle
src/app/products/page.tsx   ← Server Component that calls helper functions
src/components/product-card.tsx  ← Client Component that receives data as props
```

### Helper function (`src/data/products.ts`)

```ts
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getProductById(id: number) {
  return db.query.products.findFirst({ where: eq(products.id, id) });
}

export async function getAllProducts() {
  return db.select().from(products);
}
```

### Server Component (`src/app/products/page.tsx`)

```ts
import { getAllProducts } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export default async function ProductsPage() {
  const products = await getAllProducts();
  return products.map((p) => <ProductCard key={p.id} product={p} />);
}
```

### Client Component (`src/components/product-card.tsx`)

```ts
"use client";

// Receives data as props — does NOT fetch anything
export function ProductCard({ product }: { product: Product }) {
  return <div>{product.name}</div>;
}
```

## What not to do

```ts
// BAD — fetching inside a Client Component
"use client";
useEffect(() => {
  fetch("/api/products").then(...);
}, []);

// BAD — querying the database directly in a page
import { db } from "@/db";
const products = await db.select().from(productsTable); // use /data helper instead

// BAD — using raw SQL or anything other than Drizzle
import { sql } from "@neondatabase/serverless";
const result = await sql`SELECT * FROM products`;
```
