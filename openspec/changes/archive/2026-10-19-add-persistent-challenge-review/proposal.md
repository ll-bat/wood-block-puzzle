# Add persistent challenge review

Challenge Mode needs lightweight local progress tracking before a database is introduced. Solved state and a curator-assigned difficulty must survive restarts, drive collection filtering, and remain separate from deterministic generated puzzle artifacts.

This change adds an atomically written sidecar review file, server read/update endpoints, and Challenge UI for difficulty assignment, solved markers, filtered navigation, and post-solve advancement.

