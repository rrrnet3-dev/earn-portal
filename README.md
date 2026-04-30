md# Earn Portal

**Current Version:** v2.1.0  
**Status:** Production Ready - Step 2 Complete  
**Live URL:** [add-your-vercel-url-here]  
**Last Deploy:** 2026-04-30  

---

## Tech Stack

| Package | Version | Notes |
| --- | --- | --- |
| **Next.js** | 16.2.4 | App Router, RSC |
| **React** | 18.3.1 | Required by Next 16.2.4 |
| **react-icons** | 5.3.0 | 21 rank icons: FaUserGraduate → FaSun |
| **framer-motion** | 11.11.17 | Level-up popup animations |
| **Node** | >=18.17.0 | Vercel runtime |

---

## Features Shipped - v2.1.0

1. **21-Level Rank System**: Intern → Legendary Star. 1 task = 1 level.
2. **Level-up Popup**: Shows current rank + tasks needed for next rank
3. **Header Badge**: Rank icon + Lv.X. Turns gold at Director Lv.18+
4. **Dark Mode**: Toggle with localStorage persistence  
5. **Daily Task Reset**: `performedTaskIds` clear at midnight, lifetime rank persists
6. **20 Task Pages**: `/task/1` to `/task/20` with 4 types: article/video/survey/action

**Git Commit:** `feat: v2.1 - 21-level rank system with Legendary Star`

---

## File Structure
earn-portal/
├── app/
│   ├── page.js              # Dashboard: stats, rank badge, 20 task cards
│   └── task/[id]/page.js    # Dynamic task execution pages
├── package.json             # Dependencies: Next 16.2.4, React 18.3.1
└── README.md                # This file