# DynamicBar Documentation

The DynamicBar is a context-based system for dynamically rendering content in the top application bar. It allows different pages and components to update the bar content without prop drilling.

## Architecture

### Components

- **DynamicBar** (`src/components/ui/DynamicBar/index.tsx`) - The visual component that renders bar actions
- **BarProvider** (`src/libs/dynamic-bar/context.tsx`) - Context provider that manages bar state
- **Hooks** (`src/libs/dynamic-bar/hooks.ts`) - Custom hooks for interacting with the bar

### Provider Hierarchy

```
MantineProvider
  └─ RouterProvider (src/router.tsx)
     └─ BarProvider
        └─ ModalProvider
           └─ AppLayout
              └─ SafeArea
                 └─ DynamicBar (renders in the header bar)
```

## Available Hooks

### `useBarContext()`

Direct access to the bar context. Use this only if you need fine-grained control.

```tsx
const { config, setConfig } = useBarContext();
```

### `useBarConfig()`

Update and reset bar configuration.

```tsx
const { config, updateConfig, resetConfig } = useBarConfig();

// Update specific config properties
updateConfig({ actions: <button>Click me</button> });

// Reset to default empty state
resetConfig();
```

### `useBarActions()`

Set and clear bar actions. **This is the recommended way to update the bar.**

```tsx
const { setActions, clearActions } = useBarActions();

// Set simple text
setActions("Home");

// Set JSX elements
setActions(
  <div className="flex gap-2">
    <button>Save</button>
    <button>Cancel</button>
  </div>,
);

// Clear actions
clearActions();
```

### `useBarVisibility()`

Control bar visibility.

```tsx
const { isVisible, show, hide, toggle } = useBarVisibility();
```

### `useBarLoading()`

Manage loading states for async operations.

```tsx
const { isLoading, startLoading, stopLoading, withLoading } = useBarLoading();

// Manual control
startLoading();
// ... do something
stopLoading();

// Or use the helper for async operations
const data = await withLoading(fetchData());
```

## Usage Examples

### Example 1: Set Bar Text on Page Load

```tsx
import { useBarActions } from "@src/libs/dynamic-bar/hooks";
import { useEffect } from "react";

export function HomePage() {
  const { setActions } = useBarActions();

  useEffect(() => {
    setActions("Home");
  }, [setActions]);

  return <div>Home page content</div>;
}
```

### Example 2: Set Dynamic Actions Based on State

```tsx
import { useBarActions } from "@src/libs/dynamic-bar/hooks";
import { useEffect } from "react";

export function SettingsPage() {
  const { setActions, clearActions } = useBarActions();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setActions(
        <div className="flex gap-2">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>,
      );
    } else {
      setActions("Settings");
    }
  }, [isEditing, setActions]);

  return <div>Settings page content</div>;
}
```

### Example 3: Set Actions with Loading State

```tsx
import { useBarActions } from "@src/libs/dynamic-bar/hooks";
import { useBarLoading } from "@src/libs/dynamic-bar/hooks";
import { useEffect } from "react";

export function ProfilePage() {
  const { setActions } = useBarActions();
  const { isLoading, withLoading } = useBarLoading();

  useEffect(() => {
    setActions(
      <button disabled={isLoading} onClick={handleSync}>
        {isLoading ? "Syncing..." : "Sync Profile"}
      </button>,
    );
  }, [isLoading, setActions]);

  const handleSync = async () => {
    await withLoading(syncProfileData());
  };

  return <div>Profile page content</div>;
}
```

### Example 4: Custom Components in the Bar

```tsx
import { useBarActions } from "@src/libs/dynamic-bar/hooks";
import { Button, Group, Text } from "@mantine/core";
import { useEffect } from "react";

export function EditorPage() {
  const { setActions } = useBarActions();
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    setActions(
      <Group gap="sm">
        <Text size="sm">{fileCount} files</Text>
        <Button size="xs" variant="outline">
          Save All
        </Button>
        <Button size="xs">New File</Button>
      </Group>,
    );
  }, [fileCount, setActions]);

  return <div>Editor content</div>;
}
```

## Best Practices

1. **Clean up on unmount** - Always set appropriate actions when a component mounts/unmounts
2. **Use useEffect with dependency arrays** - Ensure hooks re-run when dependencies change
3. **Memoize callbacks** - Use `useCallback` for button handlers to prevent unnecessary re-renders
4. **Keep it simple** - The bar is meant for quick actions and status info, not heavy content
5. **Consistent styling** - Use Mantine components and existing CSS classes for consistency

## Common Patterns

### Clear Actions on Route Change

```tsx
useEffect(() => {
  return () => clearActions(); // Cleanup on unmount
}, [clearActions]);
```

### Set Actions for Multiple Pages

If multiple pages need the same actions, create a custom hook:

```tsx
// src/hooks/usePageActions.ts
export function useHomeActions() {
  const { setActions } = useBarActions();

  useEffect(() => {
    setActions("Home");
  }, [setActions]);
}

// Then in your Home page:
export function HomePage() {
  useHomeActions();
  // ...
}
```

## Troubleshooting

**"useBarContext must be used within a BarProvider component"**

- This error means the hook was called outside the BarProvider
- Make sure your component is within the router where BarProvider is defined

**Actions not showing**

- Verify that `setActions` was called in a useEffect with proper dependencies
- Check that the actions value is valid React content (string, JSX, etc.)

**Stale actions on route change**

- Remember to clear or update actions in useEffect when your component mounts
- Use cleanup functions to reset state on unmount
