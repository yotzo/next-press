import { getAccessToken } from "@/lib/auth/tokenStorage";

export const isAuthenticated = () => {
	if (typeof window === "undefined") {
		return false;
	}
	const accessToken = getAccessToken();
	if (!accessToken) {
		return false;
	}

	return Boolean(accessToken);
};
