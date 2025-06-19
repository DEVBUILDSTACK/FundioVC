# Fundio Backend

A scalable and maintainable backend built with **Node.js**, **Express**, and **TypeScript**. This project includes database migration tools, linting, formatting, and production setup scripts.

---

## 🚀 Requirements

- **Node.js**: Version `22.x` or above
- **pnpm**: Fast, disk space efficient package manager
- (Optional) **PM2**: For production process management

---

## 📦 Project Structure

```
├── src/                # Source code
├── dist/               # Compiled output
├── drizzle/            # Drizzle ORM artifacts
├── .eslintrc.js        # ESLint config
├── .prettierrc         # Prettier config
├── tsconfig.json       # TypeScript config
└── package.json        # Scripts & dependencies
```

---

## 🔧 Setup

```bash
git clone <repository-url>
cd fundio-backend
pnpm install
```

---

## 📜 Available Scripts

| Command                | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `pnpm run dev`         | Start the server in watch mode using tsx                        |
| `pnpm run prod`        | Run the production build using compiled files                   |
| `pnpm run build`       | Compile TypeScript and resolve path aliases                     |
| `pnpm run lint`        | Run ESLint to check code quality                                |
| `pnpm run lint:fix`    | Auto-fix lint errors                                            |
| `pnpm run db:generate` | Generate Drizzle ORM migration and schema files                 |
| `pnpm run db:migrate`  | Run database migrations                                         |
| `pnpm run init-prod`   | Install dependencies, migrate DB, build app and run it with PM2 |

> ⚠️ **Note**: `init-prod` uses `--legacy-peer-deps`. Use it only when necessary (e.g., for compatibility issues).

---

## 🧹 Linting & Formatting

This project uses:

- **ESLint** for code linting
- **ESLint Stylistic** for consistent code formatting
- **Husky** for pre-commit hooks

### ESLint Setup

Configured in `eslint.config.mjs`. To run:

```bash
pnpm run lint
pnpm run lint:fix
```

## 🛠️ Technologies Used

- Node.js 22+
- Express
- TypeScript
- Drizzle ORM
- ESLint + ESLint Stylistic
- PM2 (for production)
- Husky (Pre Commit hooks)

---

## ✅ Recommendations

- Use VSCode with ESLint extensions for auto-formatting
- Commit using pre-commit hooks to ensure code quality
- Use environment-specific `.env` files for configuration

---
