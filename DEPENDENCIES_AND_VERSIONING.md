# DEFAI Element SDK Dependencies & Versioning Strategy

## Package Dependencies

### Core Dependencies Structure

```
@defai/element-types (no dependencies)
    ↓
@defai/element-sdk (depends on types)
    ↓
@defai/element-react (depends on sdk, types)
@defai/element-validator (depends on types)
@defai/element-templates (depends on sdk)
@defai/element-testing (depends on sdk, types)
    ↓
@defai/element-cli (depends on sdk, validator, templates)
```

### Package Dependencies Details

#### @defai/element-types
- **Dependencies**: None
- **DevDependencies**:
  - `typescript`: `^5.0.0`
- **Purpose**: Pure TypeScript type definitions

#### @defai/element-sdk
- **Dependencies**:
  - `@defai/element-types`: `^1.0.0`
- **DevDependencies**:
  - `typescript`: `^5.0.0`
  - `@types/node`: `^18.0.0`
  - `jest`: `^29.4.0`
  - `ts-jest`: `^29.0.5`
- **Purpose**: Core SDK functionality

#### @defai/element-react
- **Dependencies**:
  - `@defai/element-sdk`: `^1.0.0`
  - `@defai/element-types`: `^1.0.0`
- **PeerDependencies**:
  - `react`: `>=16.8.0`
  - `react-dom`: `>=16.8.0`
- **DevDependencies**:
  - `@types/react`: `^18.0.0`
  - `@testing-library/react`: `^13.4.0`
  - `typescript`: `^5.0.0`
- **Purpose**: React integration

#### @defai/element-validator
- **Dependencies**:
  - `@defai/element-types`: `^1.0.0`
- **DevDependencies**:
  - `typescript`: `^5.0.0`
  - `jest`: `^29.4.0`
- **Purpose**: Validation and security checks

#### @defai/element-templates
- **Dependencies**:
  - `@defai/element-sdk`: `^1.0.0`
- **DevDependencies**:
  - `typescript`: `^5.0.0`
  - `jest`: `^29.4.0`
- **Purpose**: Pre-built element templates

#### @defai/element-testing
- **Dependencies**:
  - `@defai/element-sdk`: `^1.0.0`
  - `@defai/element-types`: `^1.0.0`
- **PeerDependencies**:
  - `jest`: `>=27.0.0`
  - `@testing-library/react`: `>=12.0.0` (optional)
- **DevDependencies**:
  - `typescript`: `^5.0.0`
- **Purpose**: Testing utilities

#### @defai/element-cli
- **Dependencies**:
  - `@defai/element-sdk`: `^1.0.0`
  - `@defai/element-validator`: `^1.0.0`
  - `@defai/element-templates`: `^1.0.0`
  - `commander`: `^11.0.0`
  - `chalk`: `^5.3.0`
  - `ora`: `^7.0.0`
  - `inquirer`: `^9.2.0`
  - `webpack`: `^5.88.0`
  - `webpack-dev-server`: `^4.15.0`
  - `typescript`: `^5.0.0`
  - `esbuild`: `^0.19.0`
  - `dotenv`: `^16.3.0`
- **DevDependencies**:
  - `@types/node`: `^18.0.0`
  - `jest`: `^29.4.0`
- **Purpose**: CLI tool for development

## Versioning Strategy

### Semantic Versioning (SemVer)

All packages follow Semantic Versioning 2.0.0:
- **MAJOR** (X.0.0): Breaking API changes
- **MINOR** (0.X.0): New features, backwards compatible
- **PATCH** (0.0.X): Bug fixes, backwards compatible

### Version Alignment

1. **Synchronized Major Versions**: All packages maintain the same major version
   - Example: All packages at 1.x.x, then all move to 2.x.x together

2. **Independent Minor/Patch Versions**: Packages can have different minor/patch versions
   - Example: sdk@1.2.3, react@1.1.0, cli@1.3.1

### Release Cycle

#### Regular Releases
- **Patch**: As needed for bug fixes (no schedule)
- **Minor**: Monthly releases with new features
- **Major**: Quarterly or bi-annual for breaking changes

#### Release Process
1. **Alpha**: Internal testing (`1.0.0-alpha.0`)
2. **Beta**: Public testing (`1.0.0-beta.0`)
3. **RC**: Release candidate (`1.0.0-rc.0`)
4. **Stable**: Production release (`1.0.0`)

### Version Constraints

#### Internal Dependencies
```json
{
  "@defai/element-sdk": "^1.0.0"  // Compatible with 1.x.x
}
```

#### External Dependencies
```json
{
  "react": ">=16.8.0",           // Minimum version
  "typescript": "^5.0.0",        // Compatible with 5.x.x
  "jest": "~29.4.0"              // Compatible with .29.4.x
}
```

### Breaking Change Policy

#### What Constitutes a Breaking Change
- Removing a public API method
- Changing method signatures
- Changing required TypeScript types
- Removing support for Node/React versions
- Changing default behavior significantly

#### Migration Support
- Deprecation warnings for 2 minor versions before removal
- Migration guides for all breaking changes
- Codemods when possible

### Version Management Tools

#### Lerna Configuration
```json
{
  "version": "independent",
  "command": {
    "version": {
      "conventionalCommits": true,
      "createRelease": "github",
      "message": "chore(release): publish %s"
    }
  }
}
```

#### Conventional Commits
- `feat:` New feature (minor version)
- `fix:` Bug fix (patch version)
- `BREAKING CHANGE:` Breaking change (major version)
- `chore:` Maintenance (no version change)
- `docs:` Documentation (no version change)

### Dependency Update Policy

#### Security Updates
- **Critical**: Immediate patch release
- **High**: Within 48 hours
- **Medium**: Within 1 week
- **Low**: Next regular release

#### Regular Updates
- Monthly dependency audit
- Quarterly major dependency updates
- Automated PRs for non-breaking updates

### Version Compatibility Matrix

| SDK Version | Types Version | React Version | Node Version |
|-------------|---------------|---------------|--------------|
| 1.0.x       | 1.0.x         | >=16.8.0      | >=16.0.0     |
| 1.1.x       | 1.0.x-1.1.x   | >=16.8.0      | >=16.0.0     |
| 2.0.x       | 2.0.x         | >=18.0.0      | >=18.0.0     |

### Pre-release Testing

#### Alpha Testing
- Internal team testing
- Core functionality verification
- API stability checks

#### Beta Testing
- Public testing with early adopters
- Performance benchmarking
- Integration testing

#### Release Candidate
- Production-ready testing
- Final bug fixes only
- No new features

### Deprecation Timeline

1. **Announce**: Deprecation announced in release notes
2. **Warning**: Console warnings added (2 minor versions)
3. **Remove**: Feature removed (next major version)

Example:
- v1.2.0: Feature deprecated, announcement
- v1.3.0: Console warnings added
- v1.4.0: Final warning
- v2.0.0: Feature removed

### Emergency Procedures

#### Hotfix Process
1. Create hotfix branch from latest stable
2. Apply minimal fix
3. Test thoroughly
4. Release as patch version
5. Forward-port to development branch

#### Rollback Process
1. Deprecate broken version on NPM
2. Notify users via all channels
3. Release previous stable version with bumped patch

### Long-term Support (LTS)

- Major versions supported for 12 months
- Security patches for additional 6 months
- LTS versions marked clearly

Example:
- v1.0.0 LTS: Full support until v3.0.0
- Security support for additional 6 months

### Version Documentation

Each release includes:
- CHANGELOG.md with all changes
- Migration guide for breaking changes
- Updated API documentation
- Example code updates

### Monitoring and Metrics

Track for each version:
- Download statistics
- Issue reports
- Performance metrics
- Adoption rate
- Deprecation warning frequency

## Implementation Checklist

- [ ] Set up Lerna for monorepo management
- [ ] Configure conventional commits
- [ ] Set up automated changelog generation
- [ ] Create version bump scripts
- [ ] Set up dependency update automation
- [ ] Create deprecation warning system
- [ ] Implement telemetry for version tracking
- [ ] Set up automated testing for all versions
- [ ] Create migration guide templates
- [ ] Set up version compatibility testing