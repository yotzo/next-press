import { useForm } from "@tanstack/react-form";
import { ClientOnly, Link } from "@tanstack/react-router";
import type { MDEditorProps } from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import type * as React from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BLOG_POST_STATUSES } from "@/features/admin/blog/list/Columns";
import type { BlogPosts } from "@/features/admin/blog/list/schema";

type BlogPostEditValues = {
	title: string;
	status: string;
	slug: string;
	bodyMarkdown: string;
};

/** Builds a URL-safe slug from a post title (latin-friendly). */
export function titleToSlug(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

function fieldError(errors: unknown[]): string | undefined {
	if (!errors?.length) return undefined;
	const first = errors[0];
	return typeof first === "string" ? first : String(first);
}

function MarkdownEditor({
	id,
	label,
	value,
	onChange,
}: {
	id: string;
	label: string;
	value: string;
	onChange: (next: string) => void;
}) {
	const { resolvedTheme } = useTheme();
	const [Editor, setEditor] =
		useState<React.ComponentType<MDEditorProps> | null>(null);

	useEffect(() => {
		void Promise.all([
			import("@uiw/react-md-editor"),
			import("@uiw/react-md-editor/markdown-editor.css"),
		]).then(([mod]) => {
			setEditor(() => mod.default);
		});
	}, []);

	const colorMode = resolvedTheme === "dark" ? "dark" : "light";

	return (
		<div className="grid gap-2">
			<Label htmlFor={id}>{label}</Label>
			<ClientOnly
				fallback={
					<Textarea
						id={id}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						className="font-mono min-h-[320px]"
					/>
				}
			>
				{Editor ? (
					<div data-color-mode={colorMode}>
						<Editor
							value={value}
							onChange={(v) => onChange(v ?? "")}
							height={320}
							textareaProps={{ id }}
						/>
					</div>
				) : (
					<Textarea
						id={id}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						className="font-mono min-h-[320px]"
					/>
				)}
			</ClientOnly>
		</div>
	);
}

type BlogPostEditFormProps = {
	post: BlogPosts;
};

export function BlogPostEditForm({ post }: BlogPostEditFormProps) {
	const slugTracksTitleRef = useRef(
		titleToSlug(post.title) === post.slug || post.slug === "",
	);

	const handleDeletePost = () => {
		console.log("delete post");
	};

	const postForm = useForm({
		defaultValues: {
			title: post.title,
			status: post.status,
			slug: post.slug,
			bodyMarkdown: post.bodyMarkdownPreview,
		} satisfies BlogPostEditValues,
		onSubmit: async () => {},
	});

	return (
		<Tabs defaultValue="general" className="w-full">
			<form
				className="flex flex-col gap-6"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					console.log("submit");
					// void postForm.handleSubmit();
				}}
			>
				<div className="flex flex-col md:flex-row justify-between items-center px-6">
					<TabsList>
						<TabsTrigger value="general">General</TabsTrigger>
						<TabsTrigger value="analytics">Content</TabsTrigger>
						<TabsTrigger value="seo">SEO</TabsTrigger>
						<TabsTrigger value="social">Social</TabsTrigger>
					</TabsList>
					<div className="flex flex-row gap-2">
						<Button type="button" variant="outline" asChild>
							<Link to="/admin/blog/posts">Back to posts</Link>
						</Button>
						<Button
							type="button"
							variant="destructive"
							onClick={handleDeletePost}
							className="cursor-pointer"
						>
							Delete post
						</Button>
						<Button type="submit" className="cursor-pointer">
							Save changes
						</Button>
					</div>
				</div>
				<TabsContent value="general">
					<div className="flex min-w-0 w-full max-w-full flex-col gap-6 p-6">
						<Card>
							<CardHeader>
								<CardTitle>Edit post</CardTitle>
								<CardDescription>
									Post #{post.id} · {post.uuid}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-4">
								<postForm.Field
									name="title"
									listeners={{
										onChange: ({ value }) => {
											if (slugTracksTitleRef.current) {
												postForm.setFieldValue("slug", titleToSlug(value));
											}
										},
									}}
									validators={{
										onChange: ({ value }) =>
											value.trim().length === 0
												? "Title is required"
												: undefined,
									}}
								>
									{(field) => (
										<div className="grid gap-2">
											<Label htmlFor={field.name}>Title</Label>
											<Input
												id={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.setValue(e.target.value)}
												aria-invalid={field.state.meta.errors.length > 0}
											/>
											{fieldError(field.state.meta.errors) ? (
												<p className="text-destructive text-sm">
													{fieldError(field.state.meta.errors)}
												</p>
											) : null}
										</div>
									)}
								</postForm.Field>

								<postForm.Field
									name="status"
									validators={{
										onChange: ({ value }) =>
											!(BLOG_POST_STATUSES as readonly string[]).includes(value)
												? "Pick a valid status"
												: undefined,
									}}
								>
									{(field) => (
										<div className="grid gap-2">
											<Label htmlFor={field.name}>Status</Label>
											<Select
												value={field.state.value}
												onValueChange={(v) => field.setValue(v)}
											>
												<SelectTrigger
													id={field.name}
													className="w-full"
													onBlur={field.handleBlur}
												>
													<SelectValue placeholder="Status" />
												</SelectTrigger>
												<SelectContent>
													{BLOG_POST_STATUSES.map((s) => (
														<SelectItem key={s} value={s}>
															{s}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											{fieldError(field.state.meta.errors) ? (
												<p className="text-destructive text-sm">
													{fieldError(field.state.meta.errors)}
												</p>
											) : null}
										</div>
									)}
								</postForm.Field>

								<postForm.Field
									name="slug"
									validators={{
										onChange: ({ value }) =>
											value.trim().length === 0
												? "Slug is required"
												: undefined,
									}}
								>
									{(field) => (
										<div className="grid gap-2">
											<Label htmlFor={field.name}>Slug</Label>
											<Input
												id={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => {
													slugTracksTitleRef.current = false;
													field.setValue(e.target.value);
												}}
												aria-invalid={field.state.meta.errors.length > 0}
												className="font-mono text-sm"
											/>
											<p className="text-muted-foreground text-xs">
												Auto-generated from the title until you edit this field.
											</p>
											{fieldError(field.state.meta.errors) ? (
												<p className="text-destructive text-sm">
													{fieldError(field.state.meta.errors)}
												</p>
											) : null}
										</div>
									)}
								</postForm.Field>

								<postForm.Field
									name="bodyMarkdown"
									validators={{
										onChange: ({ value }) =>
											value.trim().length === 0
												? "Body markdown is required"
												: undefined,
									}}
								>
									{(field) => (
										<div className="grid gap-2">
											<MarkdownEditor
												id={field.name}
												label="Body (markdown)"
												value={field.state.value}
												onChange={(v) => field.setValue(v)}
											/>
											{fieldError(field.state.meta.errors) ? (
												<p className="text-destructive text-sm">
													{fieldError(field.state.meta.errors)}
												</p>
											) : null}
										</div>
									)}
								</postForm.Field>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
				<TabsContent value="content">
					<Card>
						<CardHeader>
							<CardTitle>Content</CardTitle>
							<CardDescription>
								Track performance and user engagement metrics. Monitor trends
								and identify growth opportunities.
							</CardDescription>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							Page views are up 25% compared to last month.
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="seo">
					<Card>
						<CardHeader>
							<CardTitle>SEO</CardTitle>
							<CardDescription>
								Generate and download your detailed reports. Export data in
								multiple formats for analysis.
							</CardDescription>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							You have 5 reports ready and available to export.
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="social">
					<Card>
						<CardHeader>
							<CardTitle>Social</CardTitle>
							<CardDescription>
								Manage your account preferences and options. Customize your
								experience to fit your needs.
							</CardDescription>
						</CardHeader>
						<CardContent className="text-sm text-muted-foreground">
							Configure notifications, security, and themes.
						</CardContent>
					</Card>
				</TabsContent>
			</form>
		</Tabs>
	);
}
