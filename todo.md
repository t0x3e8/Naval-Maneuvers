# Naval Maneuvers - Todo List

## Priority 1: Critical Bugs (MUST FIX IMMEDIATELY)

### 1. Fix Player Property Access Bug in game.js
- **File**: `src/client/GameEngine/game.js:50`
- **Issue**: Accessing `Player.playerId` instead of `player.playerId`
- **Impact**: Game initialization will fail
- **Estimated Time**: 15 minutes

### 2. Fix Non-existent getPlayerId() Method Calls
- **File**: `src/client/GameEngine/game.js:63, 69`
- **Issue**: Calling `player.getPlayerId()` method that doesn't exist
- **Impact**: Runtime errors during game setup
- **Estimated Time**: 15 minutes

### 3. Fix Router Usage in GameSetup.vue
- **File**: `src/client/views/GameSetup.vue:36`
- **Issue**: Using `useRoute()` instead of `useRouter()` for navigation
- **Impact**: Navigation to game board will fail
- **Estimated Time**: 10 minutes

### 4. Fix Bootstrap Vue Components Usage
- **File**: `src/client/views/GameSetup.vue`
- **Issue**: Using `<b-container>`, `<b-row>`, `<b-col>` without Bootstrap Vue installed
- **Impact**: Components won't render, UI will be broken
- **Estimated Time**: 1 hour
- **Options**:
  - Install Bootstrap Vue 3
  - Replace with standard Bootstrap classes and HTML elements

### 5. Fix Invalid State Reference in playerStore.js
- **File**: `src/client/stores/playerStore.js:26`
- **Issue**: Referencing non-existent `state.player` property
- **Impact**: Player store actions will fail
- **Estimated Time**: 30 minutes

### 6. Fix Missing Import in dataService.js
- **File**: `src/client/services/dataService.js:4`
- **Issue**: Imports missing `./index.js` file
- **Impact**: Application will crash on startup
- **Estimated Time**: 30 minutes

---

## Priority 2: Security & Critical Improvements

### 7. Fix NPM Security Vulnerabilities
- **Issue**: 43 vulnerabilities (1 critical, 12 high, 21 moderate)
- **Packages Affected**: axios, body-parser, Babel packages
- **Action**: Run `npm audit fix` and test thoroughly
- **Estimated Time**: 2-3 hours

### 8. Implement Proper Logging System
- **Issue**: 15 instances of `console.log` for debugging
- **Files**: Multiple (game.js, GameSetup.vue, playerStore.js, etc.)
- **Action**: Replace with proper logging library (winston, pino, or custom logger)
- **Estimated Time**: 2-3 hours

### 9. Optimize Async Operations
- **Issue**: Using `await` in loops (inefficient)
- **Files**: Multiple service files
- **Action**: Replace with `Promise.all()` where appropriate
- **Estimated Time**: 1-2 hours

---

## Priority 3: Testing (Currently 0% coverage for UI layer)

### 10. Add Vue Component Tests
- **Components to Test**:
  - GameSetup.vue
  - GameBoard.vue
  - PortBoard.vue
  - Other components
- **Framework**: Vue Test Utils + Vitest/Jest
- **Estimated Time**: 10-15 hours

### 11. Add Pinia Store Tests
- **Stores to Test**:
  - playerStore.js
  - gameStore.js (if exists)
- **Estimated Time**: 3-5 hours

### 12. Add Service Layer Tests
- **Services to Test**:
  - dataService.js
  - gameService.js
  - Other services
- **Estimated Time**: 5-8 hours

---

## Priority 4: Documentation & Configuration

### 13. Update package.json Metadata
- **Issues**:
  - Name is placeholder ("naval-maneuvers")
  - Description is placeholder
  - Missing author, license, repository info
- **Estimated Time**: 30 minutes

### 14. Create ARCHITECTURE.md
- **Content**: Document system architecture, component relationships, data flow
- **Estimated Time**: 2-3 hours

### 15. Create DEVELOPMENT.md
- **Content**: Setup instructions, development workflow, testing guidelines
- **Estimated Time**: 1-2 hours

### 16. Create DEPLOYMENT.md
- **Content**: Build process, environment configuration, deployment steps
- **Estimated Time**: 1-2 hours

### 17. Enhance README.md
- **Additions**: Screenshots, detailed game rules, contribution guidelines
- **Estimated Time**: 2-3 hours

---

## Priority 5: Refactoring & Optimization

### 18. Remove Hardcoded Mock Data
- **Files**: Multiple service files
- **Action**: Make mock data configurable via environment variables
- **Estimated Time**: 2-3 hours

### 19. Implement Proper Authentication
- **Issue**: Authentication is currently disabled/hardcoded
- **Action**: Implement real auth system or make it properly configurable
- **Estimated Time**: 4-6 hours

### 20. Remove TODOs and Complete Implementations
- **Issue**: Multiple TODO comments and incomplete features
- **Action**: Identify, prioritize, and complete TODO items
- **Estimated Time**: 4-6 hours

### 21. Clean Up Commented Code
- **Issue**: Multiple blocks of commented-out code
- **Action**: Remove or properly document commented code
- **Estimated Time**: 1-2 hours

### 22. Optimize Bundle Size
- **Current Size**: 1.41 MB
- **Action**: Code splitting, lazy loading, dependency optimization
- **Estimated Time**: 2-4 hours

---

## Summary

**Total Estimated Time**: 48-71 hours

**Immediate Blockers (Priority 1)**: ~3 hours
**Critical Issues (Priority 2)**: ~6-8 hours
**Testing (Priority 3)**: ~18-28 hours
**Documentation (Priority 4)**: ~7-11 hours
**Refactoring (Priority 5)**: ~13-21 hours

---

## Progress Tracking

- [ ] Priority 1 (6 tasks)
- [ ] Priority 2 (3 tasks)
- [ ] Priority 3 (3 tasks)
- [ ] Priority 4 (5 tasks)
- [ ] Priority 5 (5 tasks)

**Last Updated**: 2025-11-18
