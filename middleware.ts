import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ru", "kz", "en"],
  defaultLocale: "ru",
});

export const config = {
  matcher: [
    "/",
    "/(ru|kz|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
