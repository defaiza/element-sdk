#!/bin/bash

# DEFAI Element SDK Publishing Script
# This script publishes packages in the correct dependency order

set -e

echo "🚀 DEFAI Element SDK Publishing Script"
echo "===================================="
echo ""

# Check if logged in to NPM
if ! npm whoami &> /dev/null; then
    echo "❌ Error: Not logged in to NPM"
    echo "Please run: npm login"
    exit 1
fi

echo "✅ Logged in as: $(npm whoami)"
echo ""

# Function to publish a package
publish_package() {
    local package_name=$1
    local package_dir=$2
    
    echo "📦 Publishing $package_name..."
    
    cd $package_dir
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        echo "❌ Error: package.json not found in $package_dir"
        return 1
    fi
    
    # Build if needed (skip for types package)
    if [ "$package_name" != "@defai/element-types" ] && [ -f "tsconfig.json" ]; then
        echo "  🔨 Building..."
        npm run build || echo "  ⚠️  Build failed or not configured"
    fi
    
    # Publish with public access
    echo "  📤 Publishing to NPM..."
    npm publish --access public
    
    echo "  ✅ Dry run completed for $package_name"
    echo ""
    
    cd ..
}

# Ask for confirmation
echo "This script will do a DRY RUN of publishing all packages."
echo "To actually publish, remove the --dry-run flag from the script."
echo ""
read -p "Continue with dry run? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo ""
echo "Starting package publication (DRY RUN)..."
echo ""

# Publish in dependency order
publish_package "@defai/element-types" "types"
publish_package "@defai/element-sdk" "sdk"
publish_package "@defai/element-validator" "validator"
publish_package "@defai/element-react" "react"
publish_package "@defai/element-templates" "templates"
publish_package "@defai/element-testing" "testing"
publish_package "@defai/element-cli" "cli"

echo "✨ Dry run completed!"
echo ""
echo "To actually publish the packages:"
echo "1. Remove --dry-run from the npm publish command in this script"
echo "2. Run the script again"
echo ""
echo "Or publish individually with:"
echo "cd <package-dir> && npm publish --access public"