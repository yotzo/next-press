import type {
	FormAsyncValidateOrFn,
	FormValidateOrFn,
} from "@tanstack/form-core";
import type { ReactFormExtendedApi } from "@tanstack/react-form";
import { useRef } from "react";
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
import { BLOG_POST_STATUSES } from "@/features/admin/blog/list/Columns";
import type { BlogPosts } from "@/features/admin/blog/schema";
import type { BlogPostEditValues } from "../BlogPostEditForm";
import { fieldError, titleToSlug } from "../helpers";
import { MarkdownEditor } from "./MarkDownEditor";

type BlogPostEditFormApi = ReactFormExtendedApi<
	BlogPostEditValues,
	FormValidateOrFn<BlogPostEditValues> | undefined,
	FormValidateOrFn<BlogPostEditValues> | undefined,
	FormAsyncValidateOrFn<BlogPostEditValues> | undefined,
	FormValidateOrFn<BlogPostEditValues> | undefined,
	FormAsyncValidateOrFn<BlogPostEditValues> | undefined,
	FormValidateOrFn<BlogPostEditValues> | undefined,
	FormAsyncValidateOrFn<BlogPostEditValues> | undefined,
	FormValidateOrFn<BlogPostEditValues> | undefined,
	FormAsyncValidateOrFn<BlogPostEditValues> | undefined,
	FormAsyncValidateOrFn<BlogPostEditValues> | undefined,
	unknown
>;

interface GeneralTabProps {
	post: BlogPosts;
	postForm: BlogPostEditFormApi;
}

export const GeneralTab = ({ post, postForm }: GeneralTabProps) => {
	const slugTracksTitleRef = useRef(true);

	return (
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
						onChange: ({ value }: { value: string }) =>
							value.trim().length === 0 ? "Title is required" : undefined,
					}}
				>
					{(field) => (
						<div className="grid gap-2">
							<Label>Title</Label>
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
							<Label>Status</Label>
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
							value.trim().length === 0 ? "Slug is required" : undefined,
					}}
				>
					{(field) => (
						<div className="grid gap-2">
							<Label>Slug</Label>
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
						onChange: ({ value }: { value: string }) =>
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
	);
};
