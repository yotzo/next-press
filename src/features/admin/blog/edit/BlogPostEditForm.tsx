import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BlogPosts } from "@/features/admin/blog/schema";
import { GeneralTab } from "./components/GeneralTab";

export interface BlogPostEditValues {
	id: number;
	title: string;
	status: string;
	slug: string;
	bodyMarkdown: string;
}

type BlogPostEditFormProps = {
	post: BlogPosts;
};

export function BlogPostEditForm({ post }: BlogPostEditFormProps) {
	const handleDeletePost = () => {
		console.log("delete post");
	};

	const postForm = useForm({
		defaultValues: {
			id: post.id,
			title: post.title,
			status: post.status,
			slug: post.slug,
			bodyMarkdown: post.bodyMarkdownPreview,
		} satisfies BlogPostEditValues,
		onSubmit: async ({ value }) => {
			console.log(value);
		},
	});

	return (
		<Tabs defaultValue="general" className="w-full">
			<form
				className="flex flex-col gap-6"
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					void postForm.handleSubmit({
						onSuccess: () => {
							console.log("success");
						},
						onError: () => {
							console.log("error");
						},
					});
				}}
			>
				<div className="flex flex-col md:flex-row justify-between items-center px-6">
					<TabsList>
						<TabsTrigger value="general">General</TabsTrigger>
						<TabsTrigger value="content">Content</TabsTrigger>
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
						<GeneralTab post={post} postForm={postForm} />
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
							<postForm.Field
								name="title"
								validators={{
									onChange: ({ value }) =>
										value.trim().length === 0 ? "Title is required" : undefined,
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
									</div>
								)}
							</postForm.Field>
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
