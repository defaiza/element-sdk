# @defai/element-cli

Command-line interface for developing DEFAI elements.

## Installation

```bash
npm install -g @defai/element-cli
```

## Quick Start

```bash
# Create a new element
defai-element create my-awesome-element

# Start development server
cd my-awesome-element
defai-element dev

# Build for production
defai-element build

# Validate your element
defai-element validate

# Publish to marketplace
defai-element publish
```

## Commands

### `create <name>`

Create a new element project from a template.

```bash
defai-element create my-element

# With specific template
defai-element create my-element --template trading

# With custom settings
defai-element create my-element --author "John Doe" --tier silver
```

Options:
- `--template <type>`: Template to use (basic, trading, analytics, ai-chat)
- `--author <name>`: Author name
- `--tier <tier>`: Required tier (free, bronze, silver, gold, titanium)

### `dev`

Start the development server with hot reload.

```bash
defai-element dev

# With custom port
defai-element dev --port 3001

# With specific environment
defai-element dev --env production
```

Options:
- `--port <number>`: Port number (default: 3000)
- `--host <string>`: Host address (default: localhost)
- `--env <string>`: Environment (development, production)

### `build`

Build the element for production.

```bash
defai-element build

# With minification disabled
defai-element build --no-minify

# With source maps
defai-element build --sourcemap
```

Options:
- `--minify`: Enable minification (default: true)
- `--sourcemap`: Generate source maps
- `--analyze`: Analyze bundle size

### `validate`

Validate element code and configuration.

```bash
defai-element validate

# Strict validation
defai-element validate --strict

# With custom rules
defai-element validate --config validator.json
```

Options:
- `--strict`: Enable strict validation
- `--config <file>`: Custom validation config
- `--fix`: Auto-fix issues where possible

### `test`

Run element tests.

```bash
defai-element test

# With coverage
defai-element test --coverage

# Watch mode
defai-element test --watch
```

### `publish`

Publish element to the DEFAI marketplace.

```bash
defai-element publish

# With version bump
defai-element publish --version patch

# Dry run
defai-element publish --dry-run
```

Options:
- `--version <type>`: Version bump (patch, minor, major)
- `--tag <tag>`: NPM tag
- `--dry-run`: Simulate publish

### `login`

Login to DEFAI marketplace.

```bash
defai-element login

# With API key
defai-element login --key YOUR_API_KEY
```

### `stats`

View element statistics from marketplace.

```bash
defai-element stats

# Specific element
defai-element stats --element my-element

# Date range
defai-element stats --from 2024-01-01 --to 2024-01-31
```

### `update`

Update element dependencies and SDK.

```bash
defai-element update

# Check only
defai-element update --check

# Force update
defai-element update --force
```

## Configuration

Create a `element.config.js` file in your project root:

```javascript
module.exports = {
  // Build configuration
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: false,
    target: 'es2020'
  },
  
  // Development server
  dev: {
    port: 3000,
    host: 'localhost',
    https: false,
    open: true
  },
  
  // Element metadata overrides
  element: {
    tierRequired: 'bronze',
    category: 'Trading'
  },
  
  // Custom webpack config
  webpack: (config) => {
    // Modify webpack config
    return config;
  }
};
```

## Environment Variables

Create a `.env` file for environment-specific settings:

```bash
# API endpoints
DEFAI_API_URL=https://api.defai.com
DEFAI_WS_URL=wss://stream.defai.com

# Development
DEFAI_DEV_MODE=true
DEFAI_HOT_RELOAD=true

# Authentication
DEFAI_API_KEY=your_api_key_here
```

## Project Structure

```
my-element/
├── src/
│   ├── index.ts        # Element entry point
│   ├── styles.css      # Element styles
│   └── assets/         # Static assets
├── tests/
│   └── element.test.ts  # Element tests
├── dist/               # Build output
├── element.config.js    # Element configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Debugging

Enable debug mode for detailed logs:

```bash
DEBUG=defai:* defai-element dev
```

## License

MIT