# UX & Interaction Quality Checklist: Real Interactive Geographic Map (003-real-map-explore)

**Purpose**: Reviewer-owned requirements-quality gate evaluating user experience, touch ergonomics, cartography legibility, bottom drawer sheet behaviors, and accessibility.  
**Created**: 2026-10-30  
**Feature**: [specs/003-real-map-explore/spec.md](file:///d:/DGIY/foodlink-2/specs/003-real-map-explore/spec.md)  
**Target Audience**: PR Reviewer / QA Reviewer Gate  

**Note**: This checklist tests the **quality, completeness, and clarity of the requirements themselves** ("Unit Tests for English"), not the code execution.  
**Review Ownership**: Mark an item `[x]` only when review determines that the requirement quality criterion is met and unambiguous in the specification artifacts.

---

## 1. Cartography & Map Interaction Requirements Quality

- [ ] CHK001 Are minimum and maximum zoom bounds explicitly quantified in the requirements? [Clarity, Spec §3.FR-002]
- [ ] CHK002 Does the spec specify whether map touch interactions (drag/pinch) prevent page scroll on mobile viewports? [Completeness, Spec §3.FR-009]
- [ ] CHK003 Are transition duration and easing curves defined for camera panning during recenter and locate actions? [Clarity, Spec §2.US1/AC3]
- [ ] CHK004 Is the initial visible geographic bounding box defined beyond a single coordinate center? [Clarity, Spec §3.FR-002]

---

## 2. Store Pin & Visual Hierarchy Requirements Quality

- [ ] CHK005 Are exact dimensions and touch hit-target sizes specified for custom HTML markers on mobile touchscreens? [Completeness, Spec §3.FR-003]
- [ ] CHK006 Is the visual distinction between selected, unselected, and hovered pin states clearly quantified? [Clarity, Spec §2.US3/AC1]
- [ ] CHK007 Does the spec define behavior when multiple pins overlap at lower zoom levels (e.g. clustering vs. z-index prioritization)? [Gap, Edge Case Coverage]
- [ ] CHK008 Are color contrast ratios defined for the discount badge text against Urgency Orange (`#FF8A3D`)? [Non-Functional: Accessibility, Spec §3.FR-003]

---

## 3. Bottom Store Drawer & Sheet Ergonomics Quality

- [ ] CHK009 Are drawer presentation states (minimized peek, expanded, dismissed) explicitly specified with heights or percentages? [Clarity, Spec §3.FR-008]
- [ ] CHK010 Does the spec define whether tapping the map background or backdrop dismisses the bottom drawer? [Completeness, Spec §2.US3]
- [ ] CHK011 Is the transition continuity from the drawer's "Rescue Deal" button into the checkout flow unambiguously specified? [Consistency, Spec §2.US3/AC2]
- [ ] CHK012 Does the spec define fallback UI behavior if a store's listing title or address overflows the drawer card container? [Edge Cases, Spec §4]

---

## 4. User Location & Navigation Controls Quality

- [ ] CHK013 Are the pulse frequency and animation radius quantified for the user location marker? [Clarity, Spec §3.FR-004]
- [ ] CHK014 Does the spec explicitly define how the UI informs the user when browser geolocation is denied or times out? [Coverage, Spec §3.FR-007]
- [ ] CHK015 Are accessibility aria-labels and keyboard navigation defined for floating zoom (+ / -) and locate controls? [Non-Functional: Accessibility, Gap]
- [ ] CHK016 Is the visual state of the Locate Me button defined while GPS lookup is actively in progress? [Clarity, Spec §3.FR-007]

---

## 5. Search & Category Filtering Requirements Quality

- [ ] CHK017 Does the spec define whether search filtering performs instant client-side filtering or debounced text matching? [Clarity, Spec §3.FR-005]
- [ ] CHK018 Is empty-state messaging specified when no partner stores match the active search query or category filter? [Completeness, Spec §3.FR-006]
- [ ] CHK019 Does the spec state whether active category filters automatically deselect or close an already-opened bottom drawer? [Consistency, Spec §3.FR-006]

---

## Review Notes

- Mark items `[x]` only after review confirms the requirement-quality criterion is satisfied.
- Leave items unchecked (`[ ]`) when requirements require clarification, specification updates, or reviewer evaluation.
- `/speckit-implement` reads checklist checkbox states as a gate and does not modify markers.

