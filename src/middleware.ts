import { authMiddleware } from "@clerk/nextjs";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default authMiddleware({
  publicRoutes: ["/", "/my_books", "/api/trpc/book.search"],
});
