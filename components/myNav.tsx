import React from "react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "./ui/navigation-menu";

function MyNavigationMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink
                            href="/"
                            className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                        >
                            Go to Home
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Report</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="flex flex-col">
                            <NavigationMenuLink
                                href="/post/found"
                                className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                            >
                                Found Item
                            </NavigationMenuLink>
                            <NavigationMenuLink
                                href="/post/lost"
                                className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                            >
                                Lost Item
                            </NavigationMenuLink>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>About</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink
                            href="/about"
                            className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                        >
                            Learn About Us
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink
                            href="/items"
                            className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                        >
                            View Lost Items
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default MyNavigationMenu;
