# NPM Publishing Guide for @defai Packages

This guide explains how to publish the DEFAI Element SDK packages to NPM.

## Prerequisites

1. **NPM Account**: Create an account at https://www.npmjs.com
2. **Organization**: Create the `@defai` organization on NPM
3. **Access Token**: Generate an NPM access token with publish permissions

## Initial Setup

### 1. Login to NPM
```bash
npm login
# Enter your username, password, and email
```

### 2. Create Organization (if not exists)
```bash
# Go to https://www.npmjs.com/org/create
# Create organization named "defai"
```

### 3. Configure NPM for Publishing
```bash
# Set registry (if using private registry)
npm config set registry https://registry.npmjs.org/

# For automated publishing, create .npmrc
echo "//registry.npmjs.org/:_authToken=YOUR_NPM_TOKEN" > ~/.npmrc
```

## Publishing Process

### Option 1: Publish All Packages with Lerna (Recommended)

```bash
cd packages/

# Install dependencies
npm install

# Bootstrap packages
npx lerna bootstrap

# Build all packages
npx lerna run build

# Run tests
npx lerna run test

# Publish all packages
npx lerna publish from-package --yes

# Or with version bump
npx lerna publish patch --yes  # For patch release (1.0.0 -> 1.0.1)
npx lerna publish minor --yes  # For minor release (1.0.0 -> 1.1.0)
npx lerna publish major --yes  # For major release (1.0.0 -> 2.0.0)
```

### Option 2: Publish Individual Packages

```bash
# 1. Publish types first (no dependencies)
cd packages/types
npm publish --access public

# 2. Publish SDK (depends on types)
cd ../sdk
npm install
npm run build
npm publish --access public

# 3. Publish React hooks (depends on SDK)
cd ../react
npm install
npm run build
npm publish --access public

# 4. Publish validator (depends on types)
cd ../validator
npm install
npm run build
npm publish --access public

# 5. Publish templates (depends on SDK)
cd ../templates
npm install
npm run build
npm publish --access public

# 6. Publish testing utilities (depends on SDK and types)
cd ../testing
npm install
npm run build
npm publish --access public

# 7. Publish CLI (depends on SDK)
cd ../cli
npm install
npm run build
npm publish --access public
```

## Version Management

### Semantic Versioning
- **Patch** (1.0.x): Bug fixes, no API changes
- **Minor** (1.x.0): New features, backwards compatible
- **Major** (x.0.0): Breaking changes

### Update Version
```bash
# Update single package
cd packages/sdk
npm version patch

# Update all packages with Lerna
npx lerna version patch --no-push
```

## GitHub Actions CI/CD

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]
  workflow_dispatch:

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: |
          cd packages
          npm ci
          npx lerna bootstrap
      
      - name: Build packages
        run: |
          cd packages
          npx lerna run build
      
      - name: Run tests
        run: |
          cd packages
          npx lerna run test
      
      - name: Publish to NPM
        run: |
          cd packages
          npx lerna publish from-package --yes --no-verify-access
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## Pre-publish Checklist

- [ ] All tests pass (`npx lerna run test`)
- [ ] Build successful (`npx lerna run build`)
- [ ] Version numbers updated appropriately
- [ ] CHANGELOG.md updated with changes
- [ ] README files are up to date
- [ ] No sensitive information in code
- [ ] Dependencies are production-ready
- [ ] TypeScript declarations generated
- [ ] Examples and documentation current

## Post-publish Steps

1. **Verify Publication**
   ```bash
   npm view @defai/element-sdk
   npm view @defai/element-cli
   ```

2. **Test Installation**
   ```bash
   # Create test project
   mkdir test-element && cd test-element
   npm init -y
   
   # Install packages
   npm install @defai/element-sdk
   npm install -g @defai/element-cli
   
   # Test CLI
   defai-element create test-element
   ```

3. **Update Documentation**
   - Update docs with new version
   - Add migration guide if breaking changes
   - Update examples

4. **Announce Release**
   - Create GitHub release
   - Update DEFAI platform docs
   - Notify developers

## Troubleshooting

### Common Issues

1. **403 Forbidden**
   - Not logged in: `npm login`
   - No publish access: Check organization permissions
   - Package exists: Check version number

2. **404 Not Found**
   - Organization doesn't exist
   - Scoped package name incorrect

3. **E402 Payment Required**
   - Private packages require paid account
   - Use `--access public` flag

### Unpublish (Emergency Only)
```bash
# Unpublish specific version (within 72 hours)
npm unpublish @defai/element-sdk@1.0.0

# Deprecate instead of unpublish
npm deprecate @defai/element-sdk@1.0.0 "Security issue, please upgrade"
```

## Security Best Practices

1. **Use NPM 2FA**: Enable two-factor authentication
2. **Automation Tokens**: Use automation tokens for CI/CD
3. **Scoped Packages**: Always use @defai scope
4. **Access Control**: Limit publish access to core team
5. **Security Audit**: Run `npm audit` before publishing

## Maintenance

### Regular Updates
```bash
# Check outdated dependencies
npx lerna exec -- npm outdated

# Update dependencies
npx lerna exec -- npm update

# Security audit
npx lerna exec -- npm audit
```

### Deprecation Process
```bash
# Deprecate old version
npm deprecate @defai/element-sdk@0.9.0 "Please upgrade to 1.0.0"

# Add deprecation notice to README
echo "**DEPRECATED**: Please use version 1.0.0 or higher" >> README.md
```

## Contact

For publishing access or issues:
- GitHub: https://github.com/defai/element-sdk/issues
- Email: sdk@defai.com
- Discord: #element-sdk channel