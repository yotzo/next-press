import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/_layout/blog")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Blog Page!</div>;
}
