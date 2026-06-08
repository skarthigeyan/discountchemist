"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NAV_CATEGORIES } from "@/data/nav-categories";

export function NavCategoryBar() {
  return (
    <nav className="hidden lg:block border-t border-green-800 bg-green-700">
      <div className="max-w-7xl mx-auto px-4">
        <NavigationMenu viewport={false} className="max-w-none w-full justify-start">
          <NavigationMenuList className="flex-wrap gap-0 justify-start">
            {NAV_CATEGORIES.map((cat) => (
              <NavigationMenuItem key={cat.label}>
                <NavigationMenuTrigger className="h-auto rounded-none px-3 py-2.5 text-xs font-medium text-white bg-transparent hover:bg-green-800 hover:text-white focus:bg-green-800 focus:text-white data-[state=open]:bg-green-800 data-[state=open]:text-white [&>svg]:text-white whitespace-nowrap">
                  {cat.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[180px] rounded-md bg-white shadow-lg ring-1 ring-black/5 p-1">
                  <ul className="flex flex-col">
                    {cat.items.map((item) => (
                      <li key={item.label}>
                        <NavigationMenuLink
                          href={item.href}
                          className={
                            item.label === "Shop All"
                              ? "rounded-md px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-50"
                              : "rounded-md px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                          }
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
