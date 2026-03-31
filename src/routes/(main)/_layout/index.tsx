import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/_layout/")({ component: App });

function App() {
	return <main className="page-wrap px-4 pb-8 pt-14">Hello World</main>;
}
