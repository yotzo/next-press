# Next Press Kit

Next Press Kit is a starter kit for building modern web apps using [TanStack Start](https://tanstack.com/start), [Tailwind CSS](https://tailwindcss.com/), and [Shadcn UI](https://ui.shadcn.com/).

The goal of this project is to give developers a strong starting point they can clone and build on, with common product needs already in place: authentication handling, blog post creation flows, and an administration area.

- Website: [nextpresskit.com](https://nextpresskit.com)
- Backend API repository: [nextpresskit/backend](https://github.com/nextpresskit/backend)

## Project Concepts

- **Starter-first architecture**: designed for rapid project bootstrapping and customization.
- **Auth-ready foundations**: includes client-side auth integration patterns and services.
- **Content-oriented workflows**: supports blog post and publishing experiences.
- **Admin capabilities**: includes administration screens and structures to manage app data.
- **Modern UI stack**: Tailwind + Shadcn components for fast, consistent interfaces.

## Tech Stack

- [TanStack Start](https://tanstack.com/start)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Vitest](https://vitest.dev/)
- [Biome](https://biomejs.dev/)

## Getting Started

Install dependencies and run the app locally:

```bash
bun install
bun --bun run dev
```

The development server runs on `http://localhost:3000`.

## Scripts

```bash
bun --bun run dev
bun --bun run build
bun --bun run preview
bun --bun run test
bun --bun run lint
bun --bun run format
bun --bun run check
```

## Backend Integration

Next Press Kit frontend is designed to work with the backend API project:

- Backend repo: [https://github.com/nextpresskit/backend](https://github.com/nextpresskit/backend)
- API responsibilities include authentication, content APIs, and admin-related backend operations.
- This project can also be used separately with a different backend or mock/local APIs.

## Internationalization

This project includes ParaglideJS for localized routing and message formatting.

- Messages live in `project.inlang/messages`.
- URLs are localized through the Paraglide Vite plugin and router rewrite hooks.
- Running the dev server or build regenerates `src/paraglide` outputs.

## Shadcn Components

Use the latest Shadcn CLI to add components:

```bash
bunx --bun shadcn@latest add button
```
