import { Link } from "@tanstack/react-router";
import {
	ChevronRight,
	LayoutDashboard,
	Newspaper,
	Package,
	type LucideIcon,
} from "lucide-react";
import adminNav from "#/dummy_data/admin_nav.json";
import { Button } from "#/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "#/components/ui/collapsible";
import { Separator } from "#/components/ui/separator";
import { cn } from "#/lib/utils";

const NAV_ICONS: Record<string, LucideIcon> = {
	"layout-dashboard": LayoutDashboard,
	package: Package,
	newspaper: Newspaper,
};

type NavLeaf = {
	id: string;
	label: string;
	to: string;
};

type NavEntry =
	| (NavLeaf & { icon: string; children?: undefined })
	| {
			id: string;
			label: string;
			icon: string;
			children: NavLeaf[];
	  };

const items = adminNav.items as NavEntry[];

function NavIcon({ name, className }: { name: string; className?: string }) {
	const Icon = NAV_ICONS[name] ?? LayoutDashboard;
	return <Icon className={cn("size-4 shrink-0 opacity-70", className)} aria-hidden />;
}

function AdminNavLink({
	to,
	label,
	className,
	depth = 0,
}: {
	to: string;
	label: string;
	className?: string;
	depth?: number;
}) {
	return (
		<Button
			variant="ghost"
			size="sm"
			className={cn(
				"h-8 w-full justify-start gap-2 px-2 font-normal",
				depth > 0 && "pl-2 text-muted-foreground",
				className,
			)}
			asChild
		>
			<Link
				// Dummy entries include routes not yet in the file route tree.
				to={to as never}
				activeProps={{
					className: "bg-accent font-medium text-accent-foreground",
				}}
			>
				{depth > 0 ? (
					<span className="bg-border ml-0.5 size-1 shrink-0 rounded-full" aria-hidden />
				) : (
					<span className="size-4 shrink-0" aria-hidden />
				)}
				{label}
			</Link>
		</Button>
	);
}

function AdminNavGroup({ entry }: { entry: Extract<NavEntry, { children: NavLeaf[] }> }) {
	return (
		<Collapsible defaultOpen className="group/collapsible w-full">
			<CollapsibleTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="h-9 w-full justify-start gap-2 px-2 font-medium"
				>
					<NavIcon name={entry.icon} className="opacity-80" />
					<span className="flex-1 text-left">{entry.label}</span>
					<ChevronRight className="text-muted-foreground size-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
				</Button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<ul
					className="border-border ml-4 mr-1 flex list-none flex-col gap-0.5 border-l py-1 pl-2"
					aria-label={`${entry.label} submenu`}
				>
					{entry.children.map((child) => (
						<li key={child.id}>
							<AdminNavLink to={child.to} label={child.label} depth={1} />
						</li>
					))}
				</ul>
			</CollapsibleContent>
		</Collapsible>
	);
}

export function AdminSidebar({ className }: { className?: string }) {
	return (
		<aside
			className={cn(
				"flex w-60 flex-col gap-1 border-r bg-sidebar text-sidebar-foreground",
				className,
			)}
		>
			<div className="px-3 py-4">
				<p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
					Admin
				</p>
			</div>
			<Separator />
			<nav className="flex flex-1 flex-col gap-0.5 p-2" aria-label="Admin navigation">
				{items.map((entry) =>
					"children" in entry && entry.children ? (
						<AdminNavGroup key={entry.id} entry={entry} />
					) : (
						<Button
							key={entry.id}
							variant="ghost"
							size="sm"
							className="h-9 w-full justify-start gap-2 px-2 font-medium"
							asChild
						>
							<Link
								to={entry.to as never}
								activeProps={{
									className: "bg-accent text-accent-foreground",
								}}
							>
								<NavIcon name={entry.icon} />
								{entry.label}
							</Link>
						</Button>
					),
				)}
			</nav>
		</aside>
	);
}
