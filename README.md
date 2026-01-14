# Pokemon Arena 🎮⚔️

A modern Pokemon battle application that allows you to create custom teams and face them in epic battles. Built with React, TypeScript, and Vite.

## ✨ Features

- 🔍 Search and explore Pokemon from PokéAPI
- 👥 Team builder with drag & drop system
- ⚔️ Battle system with stats-based combat logic
- 📊 Pokemon stats visualization
- 🎨 Retro design inspired by Game Boy
- 📱 Responsive and modern interface
- 🎯 State management with Zustand
- 🔔 Notifications with React Toastify

## 🛠️ Tech Stack

### Core

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.2.4

### State and Data

- **Zustand** 5.0.10
- **TanStack Query** 5.90.16

### UI and Styling

- **Tailwind CSS** 4.1.18
- **Radix UI**
- **React Toastify** 11.0.5
- **Lucide React** 0.562.0
- **dnd-kit** 6.3.1

### Routing

- **React Router DOM** 7.12.0

### Testing

- **Vitest** 4.0.17
- **Testing Library**

## 📋 Prerequisites

- **Node.js**: v22.5.1
- **npm**: 10.8.2

## 🚀 Installation and Execution

### 1. Clone the repository

```bash
git clone <repository-url>
cd PokemonArena
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for production

```bash
npm run build
```

Compiled files will be generated in the `dist/` folder

### 5. Preview production build

```bash
npm run preview
```

## 📁 Folder Structure

```
PokemonArena/
├── public/              # Static files
│   └── images/         # Images (pokeball.svg, etc.)
├── src/
│   ├── api/            # API calls logic
│   │   ├── client.ts   # Configured HTTP client
│   │   └── pokemon.ts  # PokéAPI endpoints
│   ├── assets/         # Static assets (images, fonts)
│   ├── components/     # Reusable components
│   │   ├── CreateTeam/       # Team creation component
│   │   ├── GameBoyContent/   # Game Boy layout content
│   │   ├── LoggerComponent/  # Battle logs viewer
│   │   ├── PokemonCard/      # Individual Pokemon card
│   │   ├── PokemonFightList/ # Pokemon list in battle
│   │   ├── PokemonListed/    # Available Pokemon list
│   │   ├── TeamBuilderHeader/# Team builder header
│   │   ├── TeamCard/         # Team card
│   │   ├── ToastComponent/   # Notifications configuration
│   │   └── ui/              # Base UI components (shadcn)
│   ├── hooks/          # Custom React Hooks
│   │   ├── useDebouncedValues.tsx # Debounce hook
│   │   ├── usePokemon.tsx         # Pokemon management hook
│   │   └── useTeamBuilder.tsx     # Team builder hook
│   ├── layouts/        # Application layouts
│   │   ├── GameBoyLayout.tsx # Game Boy style layout
│   │   └── MainLayout.tsx    # Main layout with navigation
│   ├── lib/            # Utilities and configurations
│   │   └── utils.ts    # Utility functions (cn, etc.)
│   ├── pages/          # Application pages
│   │   ├── BattlePage/       # Battle page
│   │   │   ├── BattlePage.tsx
│   │   │   └── useBattlePage.tsx # Battle logic
│   │   ├── DashBoard/        # Main dashboard
│   │   ├── TeamBuilder/      # Team builder
│   │   └── Teams/            # Team management
│   ├── router/         # Route configuration
│   │   ├── AppRoutes.tsx # Route definitions
│   │   └── router.tsx    # Router configuration
│   ├── store/          # Global state management (Zustand)
│   │   ├── BattlesStore.ts # Battles and logs store
│   │   ├── SearchStore.ts  # Search store
│   │   └── teamStore.ts    # Teams store
│   ├── types/          # TypeScript type definitions
│   │   └── pokemon.ts  # Pokemon and API types
│   ├── utils/          # Utility functions
│   │   └── ShuffelUtil.ts # Randomization utilities
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── components.json     # shadcn/ui configuration
├── eslint.config.js    # ESLint configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md          # This file
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Tests with coverage
npm run test:coverage
```

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Customization

### Colors and Themes

Colors are configured in `index.css` and use Tailwind CSS. The main theme uses a palette inspired by Game Boy and Pokéball (red, black, white).

### Adding New UI Components

```bash
npx shadcn-ui@latest add <component-name>
```

## 📚 Resources

- [PokéAPI Documentation](https://pokeapi.co/docs/v2)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TanStack Query](https://tanstack.com/query)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
