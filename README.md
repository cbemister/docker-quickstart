
# Docker + Supabase Starter Project

A minimalist, elegant starter template with Docker and self-hosted Supabase integration. Build beautiful web applications with attention to every detail.

## Features

- 🐳 Docker and Docker Compose setup for easy deployment
- 🔒 Self-hosted Supabase integration
- 🚀 Caddy web server for simpler configuration and better performance
- 🎨 Beautiful, Apple-inspired minimalist UI
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🚀 Ready for production

## Getting Started

### Prerequisites

- Docker and Docker Compose
- A self-hosted Supabase instance
- Node.js (for local development)

### Setup

1. Clone this repository
```bash
git clone <your-repo-url>
cd <your-project-name>
```

2. Create a `.env` file based on `.env.example` and update the values
```bash
cp .env.example .env
```

3. Start the Docker containers
```bash
docker-compose up -d
```

4. Your application should now be running at `http://localhost:8080`

### Local Development

1. Install dependencies
```bash
npm install
```

2. Start the development server
```bash
npm run dev
```

## Deploying to Production

For production deployment, you can use:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Project Structure

```
├── src/                  # Application source code
│   ├── components/       # UI components
│   ├── pages/            # Application pages
│   ├── lib/              # Utility functions and hooks
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Docker configuration
├── Caddyfile             # Caddy web server configuration
└── ...                   # Other configuration files
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the design principles of Apple and the philosophies of Steve Jobs, Jony Ive, and Dieter Rams
- Built with React, TypeScript, Tailwind CSS, and shadcn/ui
