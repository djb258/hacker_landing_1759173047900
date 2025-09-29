# Doctrine Tracker

A modern React application for tracking project processes using altitude-based methodology. Organize your projects from 30,000ft vision down to 10,000ft execution with precision and clarity.

## Features

- **Altitude-Based Organization**: Track processes across three levels
  - 30,000ft (Vision): Strategic objectives and high-level goals
  - 20,000ft (Category): Planning and resource organization  
  - 10,000ft (Execution): Detailed tasks and implementation

- **Interactive Process Views**: 
  - Landing page with feature overview
  - Detailed process tracking with step cards
  - Modal dialogs for step details

- **Modern Tech Stack**:
  - React 18 with functional components and hooks
  - Vite for fast development and building
  - Tailwind CSS for styling
  - TypeScript for type safety
  - React Router for navigation

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd doctrine-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual configuration values
```

4. Start the development server:
```bash
npm run start
```

The application will open at `http://localhost:3000`

### Available Scripts

- `npm run start` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Serve production build locally

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.jsx      # Main layout with header/footer
├── data/               # Demo data and static content
│   └── demo_processes.json
├── hooks/              # Custom React hooks
│   └── useProcesses.js # Process data management
├── pages/              # Page components
│   ├── project-landing-page/
│   └── process-detail-view/
├── types.ts            # TypeScript type definitions
└── api/                # API integration stubs
    └── preview.ts      # Preview API endpoints
```

## Configuration Files

- `mcp.config.json` - Model Context Protocol configuration
- `.env.example` - Environment variable template
- `tailwind.config.js` - Tailwind CSS configuration

## Development

### Adding New Processes

1. Update `src/data/demo_processes.json` with new process data
2. Ensure steps include the required fields: `unique_id`, `process_id`, `altitude`, `title`, `description`, `status`
3. Optional fields: `tool_id`, `table_reference`

### Customizing Altitude Levels

The application supports three altitude levels by default. To modify:

1. Update the `AltitudeLevel` type in `src/types.ts`
2. Modify the altitude configuration in `ProcessDetailView`
3. Update color schemes and icons as needed

### Styling

The application uses Tailwind CSS with custom color schemes for each altitude level:
- Vision (30,000ft): Red theme
- Category (20,000ft): Yellow theme  
- Execution (10,000ft): Green theme

## Future Integrations

The application includes stubs for future integrations:
- **Database**: Neon PostgreSQL configuration
- **Authentication**: Firebase Auth setup
- **Real-time**: MCP protocol endpoints
- **Analytics**: Process tracking and metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Initial Commit

This project was scaffolded with altitude-based process UI and includes:
- React + Vite + TypeScript setup
- Demo data and process tracking
- Responsive design with Tailwind CSS
- Integration stubs for future backend services

*Initial commit message: "scaffold: Doctrine Tracker app with altitude-based process UI"*