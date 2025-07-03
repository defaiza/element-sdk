# NPM Publishing Checklist for @defai Packages

## Pre-Publishing Steps

### 1. NPM Account Setup
- [ ] Create NPM account at https://www.npmjs.com (if you don't have one)
- [ ] Enable 2FA for security
- [ ] Login with `npm login`

### 2. Organization Setup
- [ ] Go to https://www.npmjs.com/org/create
- [ ] Create organization named "defai"
- [ ] Set organization visibility to public

### 3. Local Setup
- [ ] Install Node.js 16+ and npm 8+
- [ ] Clone this repository
- [ ] Navigate to `/packages` directory

## Publishing Steps

### Option 1: Automated Publishing (Recommended)

```bash
# 1. Login to NPM
npm login

# 2. Run the publishing script (dry run first)
./publish-packages.sh

# 3. If dry run succeeds, edit the script to remove --dry-run
# Then run again to actually publish
```

### Option 2: Manual Publishing

```bash
# 1. Login to NPM
npm login

# 2. Publish @defai/element-types (no dependencies)
cd types
npm publish --access public

# 3. Publish @defai/element-sdk
cd ../sdk
npm install
npm run build  # Skip if no build script
npm publish --access public

# 4. Publish @defai/element-validator
cd ../validator
npm install
npm run build
npm publish --access public

# 5. Publish @defai/element-react
cd ../react
npm install
npm run build
npm publish --access public

# 6. Publish @defai/element-templates
cd ../templates
npm install
npm run build
npm publish --access public

# 7. Publish @defai/element-testing
cd ../testing
npm install
npm run build
npm publish --access public

# 8. Publish @defai/element-cli
cd ../cli
npm install
npm run build
npm publish --access public
```

## Post-Publishing Verification

### 1. Verify Packages on NPM
- [ ] Check https://www.npmjs.com/org/defai
- [ ] Verify all packages are listed
- [ ] Check package pages for correct info

### 2. Test Installation
```bash
# Create a test directory
mkdir test-defai-elements
cd test-defai-elements
npm init -y

# Test installing packages
npm install @defai/element-sdk
npm install @defai/element-react
npm install -g @defai/element-cli

# Test CLI
defai-element --version
defai-element create test-element
```

### 3. Documentation Updates
- [ ] Update README with installation instructions
- [ ] Create announcement for developers
- [ ] Update platform documentation

## Troubleshooting

### "403 Forbidden" Error
- Make sure you're logged in: `npm whoami`
- Ensure organization exists
- Use `--access public` flag

### "Package name too similar" Error
- The package name might be taken
- Check if organization is correctly set up

### Build Errors
- Some packages might not have build steps
- It's okay to skip build for type-only packages
- Check if TypeScript is installed locally

## Important Notes

1. **First Time Publishing**: The organization owner needs to publish the first package
2. **Access Rights**: Add team members to the organization after creation
3. **Version Updates**: Use `npm version patch/minor/major` before publishing updates
4. **Security**: Never commit `.npmrc` with auth tokens to git

## Quick Commands Reference

```bash
# Check login status
npm whoami

# Login
npm login

# Logout
npm logout

# View package info
npm view @defai/element-sdk

# Deprecate a version
npm deprecate @defai/element-sdk@1.0.0 "Use version 1.0.1"

# Add organization member
# Go to: https://www.npmjs.com/settings/defai/members
```

## Success Criteria

✅ All 7 packages published to NPM  
✅ Packages accessible via `npm install @defai/[package-name]`  
✅ CLI installable globally  
✅ No security vulnerabilities  
✅ Documentation updated  

Good luck with publishing! 🚀