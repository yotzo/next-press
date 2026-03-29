import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/__layout")({
	component: AdminLayout,
});

function AdminLayout() {
	return (
		<div>
			<header>
				<h1>Admin</h1>
			</header>
			<main>
				<Outlet />
			</main>
			<footer>
				<p>Footer</p>
			</footer>
		</div>
	)
}
