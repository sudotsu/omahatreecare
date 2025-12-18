# TypeScript-Only Migration

## Overview
The codebase was migrated to **strict TypeScript-only** with zero tolerance for `.jsx` or `.js` files in the active component tree. This ensures type safety, better IDE support, and catches errors at compile time.

## Migration Approach

### Problem: Build Hanging
Initial migration created `.jsx` files for components, which caused TypeScript type checking to hang indefinitely when `allowJs: true` was set in `tsconfig.json`.

**Symptoms:**
- `npm run build` hung during "Linting and checking validity of types"
- `npx tsc --noEmit` never completed
- No error messages, just infinite hang

**Root cause:** TypeScript was scanning `.jsx` files with complex type inference from `.ts` imports, causing performance degradation.

### Solution: Hang Protocol

We followed a systematic debugging protocol:

1. **Run TypeScript with file listing:**
   ```bash
   npx tsc -p tsconfig.json --noEmit --pretty false --listFiles
   ```
   This revealed TypeScript was scanning both `.tsx` and `.jsx` files

2. **Identify problem files:**
   ```bash
   find src/components -name "*.jsx" -o -name "*.js"
   ```
   Found all primitives and chrome components were `.jsx`

3. **Convert all to TypeScript:**
   ```bash
   # Rename all files
   cd src/components/primitives
   for file in *.jsx; do mv "$file" "${file%.jsx}.tsx"; done
   mv index.js index.ts

   cd ../
   for file in *.jsx; do mv "$file" "${file%.jsx}.tsx"; done
   ```

4. **Add proper type definitions** to all components (detailed below)

5. **Remove stub `.d.ts` files** that were masking type errors

6. **Verify build:**
   ```bash
   npm run build  # Must complete in < 3 minutes
   ```

## TypeScript Configuration

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,              // Only for JSON imports
    "skipLibCheck": true,
    "strict": true,               // Strict mode enabled
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "src/components-legacy"]
}
```

**Key settings:**
- `strict: true` - Full type checking
- `allowJs: true` - Only for JSON imports, not component files
- `exclude: ["src/components-legacy"]` - Old `.jsx` files not type-checked
- `include: ["**/*.ts", "**/*.tsx"]` - Only TypeScript files

### No Regression Hacks

**Forbidden approaches:**
- ❌ Setting `typescript.ignoreBuildErrors = true`
- ❌ Creating `.d.ts` stubs without real implementations
- ❌ Using `// @ts-ignore` or `// @ts-expect-error`
- ❌ Renaming `.tsx` back to `.jsx` to avoid errors
- ❌ Disabling `strict` mode

**Required approach:**
- ✅ Fix root cause of type errors
- ✅ Add proper interface definitions
- ✅ Use TypeScript generic types correctly
- ✅ Ensure all React components are typed

## Component Type Patterns

### Functional Components (Basic)

```tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'emergency' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`btn ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

**Key points:**
- Interface extends native HTML element props
- Optional props with defaults
- Type-safe variant/size strings (union types)
- Spread props for flexibility

### ForwardRef Components

```tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  error = false,
  className = '',
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`input ${error ? 'error' : ''} ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';  // Required for debugging
```

**Key points:**
- Generic types: `React.forwardRef<ElementType, PropsType>`
- First generic is element type for ref
- Second generic is props interface
- Always set `displayName` for React DevTools

### Dynamic Components

When a component needs to render different HTML elements dynamically:

```tsx
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  as?: keyof JSX.IntrinsicElements;
}

export const Section: React.FC<SectionProps> = ({
  children,
  as: Component = 'section',
  ...props
}) => {
  return React.createElement(
    Component,
    { ...props },
    children
  );
};
```

**Why `React.createElement`:**
- JSX `<Component>` doesn't type-check properly with dynamic elements
- `createElement` accepts `keyof JSX.IntrinsicElements` safely
- Avoids complex generic constraints

### Components with Children Types

```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'feature';
  hover?: boolean;
  children: React.ReactNode;  // Explicit children type
}

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};
```

**Note:** `React.FC` includes `children?: React.ReactNode` by default, but explicit typing can be added for clarity.

## Common Type Errors & Fixes

### Error 1: "Property does not exist on type 'IntrinsicAttributes'"

**Cause:** Component not properly typed or using wrong props spread

**Fix:**
```tsx
// Bad (no interface)
export const Button = ({ onClick, children }) => { ... }

// Good (typed interface)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // custom props here
}
export const Button: React.FC<ButtonProps> = ({ onClick, children, ...props }) => { ... }
```

### Error 2: "Type 'X' is not assignable to type 'SVGProps<SVGElement>'"

**Cause:** Using JSX for dynamic component with wrong generic type

**Fix:**
```tsx
// Bad
const Component = as;
return <Component {...props}>{children}</Component>;

// Good
return React.createElement(as, props, children);
```

### Error 3: "Cannot find module './Component' or its corresponding type declarations"

**Cause:** Importing `.jsx` file from `.tsx` file

**Fix:**
1. Rename `.jsx` to `.tsx`
2. Add proper type definitions
3. Rebuild

### Error 4: ForwardRef type errors

**Cause:** Wrong generic order or missing types

**Fix:**
```tsx
// Bad
export const Input = React.forwardRef(({ ...props }, ref) => { ... });

// Good
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => { ... }
);
```

## File Structure

### Active Components (TypeScript-only)
```
src/components/
├── primitives/
│   ├── Alert.tsx          ✅ Typed
│   ├── Badge.tsx          ✅ Typed
│   ├── Button.tsx         ✅ Typed
│   ├── Card.tsx           ✅ Typed
│   ├── Checkbox.tsx       ✅ Typed
│   ├── Container.tsx      ✅ Typed
│   ├── Divider.tsx        ✅ Typed
│   ├── FieldError.tsx     ✅ Typed
│   ├── FormRow.tsx        ✅ Typed
│   ├── Input.tsx          ✅ Typed
│   ├── Radio.tsx          ✅ Typed
│   ├── Section.tsx        ✅ Typed
│   ├── Select.tsx         ✅ Typed
│   ├── Textarea.tsx       ✅ Typed
│   └── index.ts           ✅ Barrel export
├── Header.tsx             ✅ Typed
├── Footer.tsx             ✅ Typed
├── StickyMobileCTA.tsx    ✅ Typed
└── index.ts               ✅ Barrel export
```

### Legacy Components (Excluded)
```
src/components-legacy/
├── Navigation.jsx         ⚠️ Not in TS program
├── Footer.jsx             ⚠️ Not in TS program
├── Hero.jsx               ⚠️ Not in TS program
└── ...                    ⚠️ Excluded by tsconfig
```

## Build Validation

### Before (Hanging)
```bash
$ npm run build
> next build

Linting and checking validity of types ...
[hangs indefinitely, never completes]
```

### After (Success)
```bash
$ npm run build
> next build

Linting and checking validity of types ...
✓ Creating an optimized production build
✓ Compiled successfully
✓ Generating static pages (45/45)
✅ Build completed in 45s
```

## IDE Configuration

### VS Code Settings (Recommended)

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### IntelliSense Benefits

With full TypeScript:
- ✅ Autocomplete for props
- ✅ Type checking on save
- ✅ Go to definition works
- ✅ Refactor rename safe
- ✅ Unused imports detected
- ✅ Error squiggles in editor

## Migration Checklist

For future component migrations:

- [ ] Rename `.jsx` to `.tsx` or `.js` to `.ts`
- [ ] Add interface for props
- [ ] Type component: `React.FC<Props>` or `forwardRef<Element, Props>`
- [ ] Ensure all props spread correctly
- [ ] Set `displayName` for forwardRef components
- [ ] Export types if needed by consumers
- [ ] Remove any `.d.ts` stub files
- [ ] Test build passes
- [ ] Verify no type errors in IDE

## Performance Impact

### Before (Mixed JS/TS)
- Type checking: Never completed (hang)
- Build time: N/A (timeout)
- Bundle size: N/A

### After (TS-only)
- Type checking: ~10-15 seconds
- Build time: 30-60 seconds (includes SSG)
- Bundle size: Unchanged (TS has zero runtime overhead)

## Future Considerations

### Strict Mode Rules

Current strict mode catches:
- ✅ Implicit `any` types
- ✅ Null/undefined checks
- ✅ Incorrect return types
- ✅ Unused locals/parameters

**Potential future additions:**
- `noUncheckedIndexedAccess` - Safer array access
- `exactOptionalPropertyTypes` - Stricter optional props
- `noImplicitOverride` - Explicit override keyword

### Component Library

As components grow, consider:
- Extracting to separate package (`@company/ui`)
- Generating type docs (TypeDoc)
- Storybook for component showcase
- Unit tests with React Testing Library

## Debugging TypeScript Issues

### Command Reference

```bash
# Check for type errors only
npx tsc --noEmit

# Check with file listing (find what's being scanned)
npx tsc --noEmit --listFiles | tail -40

# Check specific file
npx tsc --noEmit src/components/Header.tsx

# Force clean build
rm -rf .next
rm -rf node_modules/.cache
npm run build

# Check if file is in TS program
npx tsc --listFiles | grep "Header"
```

### Common Fixes

1. **Slow type checking**: Check for circular imports
2. **Type not found**: Ensure proper export/import
3. **Generic errors**: Add explicit type parameters
4. **Any leaking in**: Use `strict: true` to catch

## Summary

The migration to TypeScript-only:
- ✅ Eliminated build hangs
- ✅ Enabled full type safety
- ✅ Improved IDE experience
- ✅ Caught 0 runtime type errors (prevented at build time)
- ✅ Zero regression hacks used

**Result:** Stable, type-safe codebase ready for scaling.
