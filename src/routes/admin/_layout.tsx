import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AdminSidebar } from "#/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-screen w-full bg-background">
			<AdminSidebar className="sticky top-0 h-screen shrink-0" />
			<div className="flex min-w-0 flex-1 flex-col">
				<Outlet />
			</div>
		</div>
	);
}
