# SPID3R Open-Source GEO

<img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjh4N3VwdGw2YXg2ZXpvMHBlNDFlejd1MjBpZXBxNHZ5YXJxOGk5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/x2sTqbCW5m7z0qaNJM/giphy.gif" alt="SPID3R Demo" width="100%" />

Get your SaaS running in minutes with authentication, billing, AI chat, and brand monitoring. Zero-config setup with Next.js 15, TypeScript, and PostgreSQL.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database

### One-Command Setup

```bash
# Clone the repository
git clone https://github.com/mendableai/firegeo
cd firegeo

# Copy environment variables
cp .env.example .env.local
```

**Required API Keys** (add to `.env.local`):
- `DATABASE_URL` - PostgreSQL connection string (required)
- `BETTER_AUTH_SECRET` - Generate with `openssl rand -base64 32` (required)


```bash
# Run the automated setup
npm run setup
```

The setup script will automatically:
- Install all dependencies
- Test database connection
- Generate Better Auth tables
- Apply database migrations
- Configure Autumn billing (if API key provided)
- Get you ready to develop

### Start Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## Manual Setup (Step-by-Step)

If you prefer to run the setup commands individually or need more control over the configuration process:

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your favorite editor
nano .env.local  # or vim, code, etc.
```

### 3. Generate Authentication Secret

```bash
# Generate a secure secret for Better Auth
openssl rand -base64 32
# Copy the output to BETTER_AUTH_SECRET in .env.local
```

### 4. Initialize Database

```bash
# Push the database schema
npm run db:push

# Generate Better Auth tables
npx @better-auth/cli generate --config better-auth.config.ts

# Apply the generated migrations
npm run db:push
```

### 5. Configure Autumn Billing

```bash
# Run the Autumn setup script
npm run setup:autumn
```

### 6. Verify Setup

```bash
# Check database schema
npm run db:studio

# Test the development server
npm run dev
```

### Common Setup Commands

```bash
# Database commands
npm run db:push          # Push schema to database
npm run db:studio        # Open Drizzle Studio GUI
npm run db:migrate       # Run database migrations

# Autumn billing commands
npm run setup:autumn     # Run Autumn setup script

# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Utilities
npm run lint             # Run ESLint
```

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 15.3, React 19, TypeScript 5.7 |
| **Styling** | Tailwind CSS v4, shadcn/ui, Lucide Icons |
| **Web Scraping** | Firecrawl |
| **Database** | PostgreSQL, Drizzle ORM |
| **Authentication** | Better Auth |
| **Payments** | Autumn (with Stripe integration) |
| **AI Providers** | OpenAI, Anthropic, Google Gemini, Perplexity |
| **Email** | Resend |

## Project Structure

```
fire-saas-geo-latest/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Better Auth endpoints
│   │   ├── autumn/       # Billing endpoints (handled by Autumn)
│   │   ├── brand-monitor/# Brand analysis APIs
│   │   └── chat/         # AI chat endpoints
│   ├── (auth)/           # Auth pages (login, register, reset)
│   ├── dashboard/        # User dashboard
│   ├── chat/             # AI chat interface
│   ├── brand-monitor/    # Brand monitoring tool
│   └── pricing/          # Subscription plans
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── autumn/           # Billing components
│   └── brand-monitor/    # Brand monitor UI
├── lib/                   # Utility functions
│   ├── auth.ts           # Auth configuration
│   ├── db/               # Database schema & client
│   ├── providers/        # AI provider configs
│   └── api-wrapper.ts    # API middleware
├── config/                # Configuration files
├── public/                # Static assets
└── better-auth/           # Auth migrations
```

## Manual Setup (if needed)

### 1. Configure Services & Database

#### Database
Create a PostgreSQL database at [Supabase](https://supabase.com)
- Create a new project in Supabase
- Go to Settings → Database
- Copy the connection string (use "Transaction" mode) to `DATABASE_URL` in `.env.local`

#### Autumn Billing (Detailed Setup)

1. **Create Account**
   - Sign up at [useautumn.com](https://useautumn.com)
   - Complete email verification

2. **Get API Key**
   - Navigate to Settings → Developer
   - Click "Create API Key"
   - Copy the key to `AUTUMN_SECRET_KEY` in `.env.local`

3. **Add Stripe Integration**
   - Go to Integrations → Stripe in Autumn dashboard
   - Add your Stripe secret key
   - Autumn handles all webhook configuration automatically

4. **Create Usage Feature**
   - Go to Features → Create Feature
   - **Name**: `Messages`
   - **ID**: `messages` (must match exactly)
   - **Type**: Select `Usage`
   - **Unit**: `message`
   - Click "Create Feature"

5. **Create Free Product**
   - Go to Products → Create Product
   - **Name**: `Free`
   - **ID**: Leave blank (auto-generated)
   - **Price**: `$0/month`
   - **Features**: 
     - Add `Messages` feature
     - Set limit to `100`
   - Click "Create Product"

6. **Create Pro Product**
   - Go to Products → Create Product
   - **Name**: `Pro`
   - **ID**: `pro` (must match exactly)
   - **Price**: `$20/month`
   - **Features**:
     - Add `Messages` feature
     - Set limit to `0` (unlimited)
   - Click "Create Product"

#### Email
Sign up at [resend.com](https://resend.com)
- Verify domain → Copy API key to `RESEND_API_KEY`

#### Web Scraping & AI

Get your API keys from the following providers:

- **Firecrawl**: [https://app.firecrawl.dev/api-keys](https://app.firecrawl.dev/api-keys) → Copy to `FIRECRAWL_API_KEY`
- **OpenAI**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys) → Copy to `OPENAI_API_KEY`
- **Anthropic (Claude)**: [https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) → Copy to `ANTHROPIC_API_KEY`
- **Google AI (Gemini)**: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) → Copy to `GOOGLE_GENERATIVE_AI_API_KEY`
- **Perplexity**: [https://www.perplexity.ai/settings/api](https://www.perplexity.ai/settings/api) → Copy to `PERPLEXITY_API_KEY`

### 2. Initialize & Run

```bash
# Push database schema
npm run db:push

# Start development server
npm run dev
```

Visit http://localhost:3000

## Environment Variables

```bash
# Database
DATABASE_URL=              # PostgreSQL connection string

# Authentication
BETTER_AUTH_SECRET=        # Generated with openssl
BETTER_AUTH_URL=           # Your app URL
NEXT_PUBLIC_APP_URL=       # Public app URL

# Billing
AUTUMN_SECRET_KEY=         # From Autumn dashboard

# Brand Monitor
FIRECRAWL_API_KEY=         # From Firecrawl

# Email
RESEND_API_KEY=            # From Resend
EMAIL_FROM=                # Your email address

# AI Providers (add what you need)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
PERPLEXITY_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
```

## Available Scripts

```bash
npm run dev                  # Start development server
npm run build                # Build for production
npm run start                # Start production server
npm run db:push              # Push schema to database
npm run db:studio            # Open Drizzle Studio
npm run db:migrate           # Run migrations
```


## Production Deployment

### Deploy to Vercel

```bash
vercel --prod
```

### Configure Production Environment

1. Add all `.env.local` variables to Vercel
2. Update `NEXT_PUBLIC_APP_URL` to your domain
3. Set `NODE_ENV=production`


### Run Migrations

```bash
npm run db:push
```

## Troubleshooting

### Authentication Error: "relation 'user' does not exist"
If you see this error, Better Auth tables haven't been created. Run:
```bash
# Generate Better Auth schema
npx @better-auth/cli generate --config better-auth.config.ts

# Push the schema to database
npm run db:push
```

### Common Issues

- **Auth Issues**: Ensure `BETTER_AUTH_SECRET` is set and matches between deploys
- **Database Errors**: Run `npm run db:push` to sync schema
- **Billing Issues**: Check Autumn products are created with correct IDs
- **Email Failures**: Verify Resend domain and `EMAIL_FROM` address
- **Brand Monitor**: Ensure `FIRECRAWL_API_KEY` is valid

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Resources

- [Firecrawl API](https://docs.firecrawl.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Docs](https://better-auth.com)
- [Autumn Documentation](https://docs.useautumn.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [shadcn/ui](https://ui.shadcn.com)

## License

MIT License - see [LICENSE](LICENSE) file for details