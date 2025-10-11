# Interactive Security Presentation - AI Coding Instructions

## Project Overview
This is an interactive HTML presentation about cybersecurity principles built as a single-page application with expandable content sections. It features slide-based navigation with dynamic content expansion, custom CSS theming, and comprehensive keyboard accessibility.

## Architecture Patterns

### Core Structure
- **Single HTML file** (`index.html`): Contains all 8 slides with expandable sections for detailed content
- **Vanilla JavaScript** (`script.js`): Handles presentation logic, navigation, and interactive features
- **CSS Custom Properties** (`styles.css`): Uses extensive CSS custom properties for theming and component styling
- **Static deployment**: Includes `.nojekyll` for GitHub Pages and `404.html` for redirect handling

### Key Components
- **Slide System**: Each slide has class `slide` with `active` state management
- **Expandable Sections**: Use `.expandable-section` with `.expandable-header` and `.expandable-content` pattern
- **Navigation**: Dynamic navbar built from `slideTitles` array, plus traditional prev/next controls
- **Accessibility**: ARIA attributes, keyboard navigation, and focus management

## Development Patterns

### JavaScript Architecture
- **Global state**: `currentSlideIndex` and `totalSlides` manage presentation state
- **DOM references**: Cached at module level (e.g., `slides`, `dots`, `presentationNav`)
- **Enhanced functions**: Core functions have "Enhanced" versions for smooth animations
- **Event delegation**: Single listeners for keyboard navigation and resize handling

### CSS Design System
- **Token-based theming**: All colors defined as CSS custom properties in `:root`
- **Semantic color mapping**: `--color-primary`, `--color-text`, etc. map to primitive tokens
- **Component isolation**: Each UI component has its own CSS namespace
- **Responsive design**: Uses CSS custom properties for dynamic sizing

### Content Structure
- **Slide numbering**: Manual slide indexing (1-8) with corresponding `slideTitles` array
- **Expandable content**: Each section can be expanded/collapsed independently
- **Control buttons**: "Expandir Todo" / "Contraer Todo" for batch operations per slide

## Coding Conventions

### When adding new slides:
1. Update `totalSlides` constant in `script.js`
2. Add slide title to `slideTitles` array 
3. Use consistent HTML structure with `slide` class and `slide-content` wrapper
4. Include `slide-controls` div for expand/collapse buttons when using expandable sections

### For expandable sections:
```html
<div class="expandable-section">
    <div class="expandable-header" onclick="toggleSection(this)">
        <h3 class="expandable-title">Title</h3>
        <span class="expand-icon">▼</span>
    </div>
    <div class="expandable-content">
        <div class="expandable-inner">
            <!-- Content here -->
        </div>
    </div>
</div>
```

### CSS Custom Properties Usage
- Always use semantic color tokens (`--color-primary`) over primitive ones (`--color-teal-500`)
- For new components, follow the existing pattern of defining RGB versions for opacity control
- Use existing utility classes (`.detail-grid`, `.mini-stat`, `.highlight-box`) before creating new ones

## Key Files Reference
- `script.js` lines 1-50: Core presentation state and DOM element caching
- `script.js` lines 100-150: Expandable section logic and batch operations
- `styles.css` lines 1-100: CSS custom property definitions and design tokens
- `index.html` lines 60-120: Example of proper expandable section structure

## Accessibility Requirements
- All interactive elements must have proper ARIA attributes
- Keyboard navigation should work for all slide controls
- Focus management during slide transitions
- Screen reader compatibility for expandable content states

## Development Environment
- **Terminal Commands**: Always use PowerShell syntax for any terminal commands
- **Default Shell**: Windows PowerShell v5.1 is the project's default shell
- **Command Joining**: Use semicolon (`;`) for joining commands on a single line in PowerShell
- **Path Separators**: Use backslashes (`\`) for file paths as per Windows convention