import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/admin")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Admin Page</div>;
}
