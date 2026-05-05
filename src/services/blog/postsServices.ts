import type { AxiosResponse } from "axios";
import type { BlogPosts } from "@/features/admin/blog/schema";
import { clientAxios } from "@/lib/axios/clientAxios";

export const getPosts = (): Promise<AxiosResponse<BlogPosts[]>> =>
	clientAxios.get<BlogPosts[]>("/posts");
