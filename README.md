# Campers

A modern camper rental catalog built with **Next.js**, **React**, and **TypeScript**.

Campers lets users browse available camper vans, filter the catalog, open detailed camper pages, read reviews, explore image galleries, and submit booking requests through an API-backed interface.

## Live Demo

https://campers-seven-rho.vercel.app

## Features

- Camper catalog with API-driven data
- Search and filtering
- Pagination
- Individual camper detail pages
- Camper image galleries
- Customer reviews
- Booking request form
- Loading and not-found states
- Responsive UI
- Client-side data fetching and caching with TanStack Query

## Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **TanStack Query**
- **Axios**
- **Formik**
- **Yup**
- **React Paginate**
- **Swiper**
- **CSS Modules**

## Project Structure

```text
Campers/
├── app/
│   ├── catalog/
│   │   ├── [id]/          # Camper details route
│   │   ├── page.tsx
│   │   └── page.client.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx           # Home page
├── components/
│   ├── FormSearch/
│   ├── Gallery/
│   ├── NotFound/
│   ├── QueryProvider/
│   └── header/
├── images/
├── lib/
│   └── api/
│       ├── api.ts
│       └── clientApi.ts
├── public/
│   └── svg/
├── types/
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

Make sure you have installed:

- **Node.js 20+**
- **npm**

### Installation

Clone the repository:

```bash
git clone https://github.com/Badabuh/Campers.git
cd Campers
```

Install dependencies:

```bash
npm install
```

### Environment Variables

The application reads its API base URL from `NEXT_PUBLIC_BASE_URL`.

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=YOUR_API_BASE_URL
```

Replace `YOUR_API_BASE_URL` with the backend API URL used by the application.

### Run Locally

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the application in development mode.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs ESLint.

## API Integration

API requests are configured through Axios using `NEXT_PUBLIC_BASE_URL`.

The application currently uses endpoints for:

```text
GET  /campers
GET  /campers/:id
GET  /campers/:id/reviews
POST /campers/:id/booking-requests
```

The API layer is located in:

```text
lib/api/
```

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/catalog` | Camper catalog |
| `/catalog/[id]` | Individual camper details |

## Deployment

The project can be deployed on platforms that support Next.js, such as **Vercel**.

For Vercel deployment, add the following environment variable in the project settings:

```text
NEXT_PUBLIC_BASE_URL
```

Then deploy the repository normally.

## Author

Developed by [Badabuh](https://github.com/Badabuh).

## License

This repository does not currently specify a license.
