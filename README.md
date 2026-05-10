# Aleksandrs Drozdovs Portfolio

Personal portfolio for graduate software engineering, full-stack, data tooling, and quantitative developer roles.

Live at: [aleksandrs-portfolio.vercel.app](https://aleksandrs-portfolio.vercel.app)

## Positioning

The site presents Aleksandrs as a Dublin-based final-year Computer Science and Software Engineering student at Maynooth with a practical SWE plus quant angle. The homepage leads with DLT Capital experience, a 228-commit trading dashboard, a Python backtesting engine, and a NASDAQ-100 final-year strategy.

## Stack

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with OKLCH design tokens
- **Motion:** Framer Motion
- **Charts:** SVG and Recharts where useful
- **Deployment:** Vercel

## Main Routes

- `/` - portfolio homepage
- `/projects/fyp-trading-strategy` - final-year NASDAQ-100 trading strategy case study
- `/projects/backtest-engine` - Python backtesting infrastructure and strategy comparison dashboard
- `/projects/trading-dashboard` - financial market dashboard project
- `/projects/noteit` - full-stack note-taking project
- `/projects/portfolio` - case study for this site

## Homepage Sections

- Hero with role positioning, hiring snapshot, and proof metrics
- Proof section: Trading Analytics Dashboard, Vectorised Backtesting Engine, and NASDAQ-100 FYP Strategy
- Experience: DLT Capital, Maynooth software projects, and pressure-tested part-time roles
- Education
- Skills and tools
- Other shipped projects
- Character section: judo and algorithmic trading
- Contact

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run test:run
npm run build
```
