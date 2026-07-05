# Graph Report - internship-platform  (2026-07-05)

## Corpus Check
- 38 files · ~27,418 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 195 nodes · 284 edges · 20 communities (12 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e4c4a0c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_App.tsx|App.tsx]]
- [[_COMMUNITY_Charts.tsx|Charts.tsx]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_AppContext.tsx|AppContext.tsx]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_devDependencies|devDependencies]]
- [[_COMMUNITY_RoadmapPage.tsx|RoadmapPage.tsx]]
- [[_COMMUNITY_React + TypeScript + Vite|React + TypeScript + Vite]]
- [[_COMMUNITY_Breadcrumb.tsx|Breadcrumb.tsx]]
- [[_COMMUNITY_Timeline.tsx|Timeline.tsx]]
- [[_COMMUNITY_EmptyState.tsx|EmptyState.tsx]]
- [[_COMMUNITY_LoadingSkeleton.tsx|LoadingSkeleton.tsx]]
- [[_COMMUNITY_tsconfig.json|tsconfig.json]]
- [[_COMMUNITY_vercel.json|vercel.json]]
- [[_COMMUNITY_App.tsx|App.tsx]]
- [[_COMMUNITY_graphify|graphify.md]]
- [[_COMMUNITY_graphify|graphify.md]]

## God Nodes (most connected - your core abstractions)
1. `useApp()` - 25 edges
2. `compilerOptions` - 18 edges
3. `compilerOptions` - 15 edges
4. `Badge()` - 9 edges
5. `AppContextType` - 8 edges
6. `ProgressBar()` - 6 edges
7. `scripts` - 5 edges
8. `SearchBox()` - 4 edges
9. `React + TypeScript + Vite` - 4 edges
10. `TaskStatusPieChart()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `AppContent()` --calls--> `useApp()`  [EXTRACTED]
  src/App.tsx → src/context/AppContext.tsx
- `LayoutShell()` --calls--> `useApp()`  [EXTRACTED]
  src/components/LayoutShell.tsx → src/context/AppContext.tsx
- `AppContextType` --references--> `Announcement`  [EXTRACTED]
  src/context/AppContext.tsx → src/types/index.ts
- `AppContextType` --references--> `DocRequest`  [EXTRACTED]
  src/context/AppContext.tsx → src/types/index.ts
- `AppContextType` --references--> `Notification`  [EXTRACTED]
  src/context/AppContext.tsx → src/types/index.ts

## Import Cycles
- None detected.

## Communities (20 total, 8 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.18
Nodes (9): Badge(), BadgeProps, BadgeType, Drawer(), DrawerProps, FileUpload(), FileUploadProps, SearchBox() (+1 more)

### Community 1 - "Charts.tsx"
Cohesion: 0.22
Nodes (6): StudentGrowthChart(), TaskStatusPieChart(), TaskStatusPieChartProps, WeeklyProgressChart(), Modal(), ModalProps

### Community 2 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, framer-motion, lucide-react, react, react-dom, react-hook-form, react-router-dom, recharts (+12 more)

### Community 3 - "AppContext.tsx"
Cohesion: 0.15
Nodes (20): AppContext, AppContextType, AppProvider(), initialAnnouncements, initialDocRequests, initialNotifications, initialProjects, initialStudents (+12 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+11 more)

### Community 5 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 6 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/node, @types/react (+5 more)

### Community 7 - "RoadmapPage.tsx"
Cohesion: 0.13
Nodes (10): SkillsRadarChart(), ProgressBar(), ProgressBarProps, TabItem, Tabs(), TabsProps, initialRoadmapData, ResourceItem (+2 more)

### Community 8 - "React + TypeScript + Vite"
Cohesion: 0.40
Nodes (4): Deploying to Vercel, Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

### Community 17 - "App.tsx"
Cohesion: 0.19
Nodes (14): AppContent(), LayoutShell(), LayoutShellProps, useApp(), AdminDashboard(), AnnouncementsPage(), AuthPage(), DocRequestsPage() (+6 more)

## Knowledge Gaps
- **102 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+97 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useApp()` connect `App.tsx` to `App.tsx`, `Charts.tsx`, `AppContext.tsx`, `RoadmapPage.tsx`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `dependencies`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _102 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `RoadmapPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1286549707602339 - nodes in this community are weakly interconnected._