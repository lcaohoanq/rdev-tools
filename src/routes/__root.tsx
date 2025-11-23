import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import React from "react";
import NotFoundError from "~/feature/app/NotFound";
import { Providers } from "~/shared/components/Providers";

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Outlet />

      {import.meta.env.DEV && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </Providers>
  ),
  notFoundComponent: () => <NotFoundError />,
});
