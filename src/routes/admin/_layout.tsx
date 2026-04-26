import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { FooterAdmin } from "@/components/admin/FooterAdmin";
import { HeaderAdmin } from "@/components/admin/HeaderAdmin";
import { NotFoundAdmin } from "@/components/admin/NotFoundAdmin";
import { AdminSidebar } from "@/components/admin/Sideabar/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { isAuthenticated } from "@/lib/auth/userAuth";

export const Route = createFileRoute("/admin/_layout")({
	component: RouteComponent,
	notFoundComponent: () => <NotFoundAdmin />,
});

function RouteComponent() {
	const navigate = useNavigate();

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		const isAuth = isAuthenticated();
		if (!isAuth) {
			navigate({ to: "/admin" });
		}
	}, [navigate]);

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AdminSidebar />
			<SidebarInset>
				<HeaderAdmin />
				<div className="flex min-h-screen min-w-0 w-full bg-background pt-6">
					<div className="flex w-full flex-1 flex-col">
						<Outlet />
						<Toaster />
					</div>
				</div>
				<FooterAdmin />
			</SidebarInset>
		</SidebarProvider>
	);
}
