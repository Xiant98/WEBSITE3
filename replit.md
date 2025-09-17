# Overview

This is a modern, responsive personal portfolio website built with Next.js and designed with a sleek, dark theme. The portfolio showcases professional skills, projects, and experience through an interactive, animated interface. It features smooth scrolling animations, video content, and 3D elements to create an engaging user experience for potential employers or clients.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Framework
Built on **Next.js 14** with TypeScript for type safety and better developer experience. The application uses the Pages Router architecture, with the main content served from `src/pages/index.tsx`. The project follows a component-based architecture with reusable UI components organized in the `src/components` directory.

## Styling and Design System
The application uses **Tailwind CSS** for utility-first styling combined with **shadcn/ui** components for consistent design patterns. Custom CSS modules handle specific component styling, and the design system supports both light and dark themes through CSS custom properties. A custom font (Clash Grotesk) is integrated for enhanced typography.

## Animation and Interactivity
**Framer Motion** provides smooth page transitions and component animations. **Locomotive Scroll** enables advanced scrolling effects and scroll-triggered animations. **Vanilla Tilt** adds 3D tilt effects to interactive elements. The application includes a custom preloader with animated language greetings and video modal functionality for showcasing project demos.

## Progressive Web App (PWA)
Configured with **next-pwa** to provide offline capabilities and native app-like experience. The PWA includes custom manifest configuration with icons and theme colors for different device types.

## Development Tooling
TypeScript provides static type checking with strict configuration. ESLint ensures code quality and consistency. Prettier with Tailwind CSS plugin handles code formatting. The build system uses pnpm for package management and includes type checking in the build process.

## Environment Management
Uses **@t3-oss/env-nextjs** for type-safe environment variable validation with Zod schemas. This ensures proper configuration across different deployment environments.

# External Dependencies

## UI and Animation Libraries
- **Framer Motion**: Advanced animations and page transitions
- **Locomotive Scroll**: Smooth scrolling and scroll-triggered effects
- **Radix UI**: Accessible UI primitives for components
- **Lucide React**: Modern icon library
- **Vanilla Tilt**: 3D tilt effects for interactive elements

## Media and Animation
- **Embla Carousel**: Touch-friendly carousel component
- **Sharp**: High-performance image optimization

## Styling and Design
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **Tailwind Merge**: Utility for merging Tailwind classes
- **Class Variance Authority**: Type-safe variant management

## Development and Build Tools
- **TypeScript**: Static type checking
- **ESLint**: Code linting and quality enforcement
- **Prettier**: Code formatting with Tailwind plugin
- **Zod**: Schema validation for environment variables

## Deployment Platform
The application is configured for deployment on **Vercel** with optimized build settings and PWA capabilities.