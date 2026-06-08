# Data Mutations

## Rules

- **`/data` directory** — ALL database mutations must go through helper functions in `src/data/`. Never call Drizzle directly from a Server Action, page, or component.
- **Drizzle ORM only** — All `src/data/` helpers must use Drizzle ORM. No raw SQL, no other query builders.
- **Server Actions only** — ALL mutations must be triggered via Server Actions. No API routes (`/app/api/`) for mutation logic.
- **Colocated `actions.ts`** — Server Actions must live in an `actions.ts` file colocated with the route that uses them (e.g. `src/app/products/actions.ts`).
- **Typed params, no FormData** — Every Server Action must declare typed parameters. Never accept `FormData` as a parameter type.
- **Zod validation** — Every Server Action must validate its arguments with Zod before doing anything else. Never trust the caller.

## Pattern

```
src/data/products.ts                  ← Drizzle helper functions (insert/update/delete)
src/app/products/actions.ts           ← Server Actions that call /data helpers
src/app/products/page.tsx             ← Server Component
src/components/create-product-form.tsx ← Client Component that calls the Server Action
```

### Data helper (`src/data/products.ts`)

```ts
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createProduct(data: { name: string; price: number }) {
  return db.insert(products).values(data).returning();
}

export async function updateProduct(id: number, data: { name?: string; price?: number }) {
  return db.update(products).set(data).where(eq(products.id, id)).returning();
}

export async function deleteProduct(id: number) {
  return db.delete(products).where(eq(products.id, id));
}
```

### Server Action (`src/app/products/actions.ts`)

```ts
"use server";

import { z } from "zod";
import { createProduct, updateProduct, deleteProduct } from "@/data/products";

const CreateProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});

const UpdateProductSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).optional(),
  price: z.number().positive().optional(),
});

const DeleteProductSchema = z.object({
  id: z.number().int().positive(),
});

export async function createProductAction(params: { name: string; price: number }) {
  const validated = CreateProductSchema.parse(params);
  return createProduct(validated);
}

export async function updateProductAction(params: { id: number; name?: string; price?: number }) {
  const { id, ...data } = UpdateProductSchema.parse(params);
  return updateProduct(id, data);
}

export async function deleteProductAction(params: { id: number }) {
  const { id } = DeleteProductSchema.parse(params);
  return deleteProduct(id);
}
```

### Client Component (`src/components/create-product-form.tsx`)

```ts
"use client";

import { createProductAction } from "@/app/products/actions";

export function CreateProductForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createProductAction({ name: "Widget", price: 9.99 });
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## What not to do

```ts
// BAD — mutating the database directly inside a Server Action
"use server";
import { db } from "@/db";
import { products } from "@/db/schema";
export async function createProductAction() {
  await db.insert(products).values({ name: "Widget" }); // use /data helper instead
}

// BAD — FormData parameter
export async function createProductAction(formData: FormData) { ... }

// BAD — no Zod validation
export async function createProductAction(params: { name: string }) {
  return createProduct(params); // caller input is never validated
}

// BAD — mutation logic in an API route instead of a Server Action
// src/app/api/products/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  await createProduct(body);
}

// BAD — Server Action in the wrong file (not colocated actions.ts)
// src/lib/actions.ts  ← don't put actions here
// src/app/products/page.tsx  ← don't define actions inline in the page
```
