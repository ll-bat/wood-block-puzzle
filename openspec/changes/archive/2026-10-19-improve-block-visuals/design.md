# Design

The visual system uses CSS custom properties and gradients rather than raster textures. This keeps every cube sharp across responsive cell sizes and lets one palette update board wells, occupied cells, tray shapes, drag ghosts, and clear overlays together.

The selected theme is a browser preference stored in local storage; it is not puzzle progress and does not require the server. Clear overlays continue to receive their coordinates from the existing authoritative transition. The animation service rotates through three visual variants, and Challenge Mode adds a small per-cell delay to create a line sweep.

