# Authentication

## Rules

- **Clerk only** — ALL authentication must use [Clerk](https://clerk.com). No custom auth, NextAuth, Supabase Auth, or any other auth provider.
- **Middleware** — Route protection must be handled via Clerk's `clerkMiddleware` in `src/middleware.ts`. Never gate routes manually inside pages or layouts.
- **Server Components** — Access the current user in Server Components via Clerk's `auth()` or `currentUser()` helpers. Never pass user data down from a Client Component.
- **Client Components** — Access the current user in Client Components via Clerk's `useUser()` or `useAuth()` hooks. Never fetch user data yourself.
- **No custom session logic** — Do not store session tokens, JWTs, or user identity in cookies, localStorage, or your own database. Let Clerk own all session state.

## Setup

```
src/middleware.ts          ← Clerk middleware — protects routes
src/app/layout.tsx         ← <ClerkProvider> wraps the entire app
```

### Middleware (`src/middleware.ts`)

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
```

### Root Layout (`src/app/layout.tsx`)

```ts
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

## Accessing the current user

### In a Server Component

```ts
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = await auth();          // lightweight — just the ID
  const user = await currentUser();         // full user object (extra network call)

  if (!userId) redirect("/sign-in");

  return <div>Hello, {user?.firstName}</div>;
}
```

### In a Client Component

```ts
"use client";

import { useUser, useAuth } from "@clerk/nextjs";

export function UserGreeting() {
  const { user, isLoaded } = useUser();     // full user object
  const { userId } = useAuth();             // lightweight — just the ID

  if (!isLoaded) return null;
  return <div>Hello, {user?.firstName}</div>;
}
```

## Sign-in / Sign-up UI

Use Clerk's pre-built components — do not build custom auth forms.

```ts
import { SignIn, SignUp, UserButton, SignInButton } from "@clerk/nextjs";

// Full-page sign-in
<SignIn />

// Full-page sign-up
<SignUp />

// Signed-in user avatar + dropdown
<UserButton />

// Button that opens the sign-in flow
<SignInButton />
```

## What not to do

```ts
// BAD — rolling your own auth
import jwt from "jsonwebtoken";
const token = jwt.sign({ userId }, process.env.JWT_SECRET!);

// BAD — storing user identity yourself
cookies().set("userId", user.id);

// BAD — protecting a route inside the page instead of middleware
export default async function DashboardPage() {
  const session = await getSession(); // custom session — don't do this
  if (!session) redirect("/sign-in");
}

// BAD — fetching user data in a Client Component via an API call
"use client";
useEffect(() => {
  fetch("/api/me").then(...); // use useUser() instead
}, []);
```
