# Industry Brief: Agentic Skills Trees for Tutr

## Executive takeaway
Agentic Skills Trees (implemented as **typed skill DAGs**, not strict trees) are moving from research concept to operating model for production AI agents. For Tutr, the best decision is to adopt a **curated, auditable skill library + planner/router + verifier loop** rather than relying on self-generated skills early.

---

## 1) Key trends shaping this sector

1. **From monolithic prompts to modular skills**
   - Leading teams now package capabilities as reusable skills (instructions + code + metadata + tests), then select skills at runtime.
   - This improves maintainability, reuse, and governance compared with large, brittle prompt chains.

2. **“Skills tree” is becoming a graph problem**
   - Real deployments use DAG-like dependencies (shared low-level skills used by many high-level workflows).
   - Dependency-aware retrieval is outperforming naive semantic retrieval and full-library loading.

3. **Curated skills outperform self-generated skills in realistic settings**
   - Controlled evaluations show curated skills can materially improve outcomes.
   - Gains degrade when retrieval is noisy, libraries are oversized, or skills are low-quality.

4. **Security is now first-class**
   - Skill marketplaces create software supply-chain and behavior-level risks.
   - Permissioning, sandboxing, provenance, and deterministic verification are becoming mandatory.

5. **Evaluation is broadening beyond task success**
   - Mature teams track transfer, sample efficiency, robustness, interpretability, and safety—not just pass/fail.

---

## 2) Market structure and competitive landscape

### A. Infrastructure layer
- Orchestration frameworks (graph/workflow runtimes), memory stores, tool execution runtimes, eval systems.
- Differentiation: reliability, observability, policy controls, latency, and cost controls.

### B. Skill/library layer
- Internal/private skill registries and emerging public marketplaces.
- Differentiation: quality curation, dependency metadata, trust scoring, signed artifacts.

### C. Application layer
- Vertical agent systems (education, enterprise ops, software engineering, support, web automation).
- Differentiation: domain-specific skill quality and compliance-aware workflows.

### D. Governance layer
- Skill audit, provenance, policy enforcement, red-teaming, and continuous verification.
- Becoming a procurement requirement for enterprise deployments.

---

## 3) Risks for Tutr

1. **Skill sprawl**: too many overlapping skills increase routing errors and latency.
2. **Noisy retrieval**: wrong skill selection can silently degrade outcomes.
3. **Weak contracts**: unclear preconditions/postconditions create brittle composition.
4. **Security exposure**: malicious or vulnerable external skills/tool integrations.
5. **Evaluation blind spots**: good demos, poor robustness under real student/teacher workflows.
6. **Cost blowups**: full-library context loading increases token and inference costs.

---

## 4) Opportunities for Tutr

1. **Pedagogy-specific skill moat**
   - Build high-quality tutoring workflows as reusable skills: diagnose misconception, generate hint ladder, rubric-aligned feedback, intervention escalation.

2. **Consistency and compliance**
   - Safety contracts + verifier checks per skill can enforce educational policy and tone consistently.

3. **Faster product iteration**
   - Skills are versioned modules: ship targeted improvements without retraining the whole system.

4. **Cross-surface reuse**
   - Same core skills can power chat tutor, lesson planning assistant, grading copilot, and parent summaries.

5. **Trust as differentiator**
   - Transparent skill traces and deterministic checks improve teacher/admin confidence.

---

## 5) How to apply this to Tutr’s current stack (practical rollout)

## Phase 0 (Week 1–2): Baseline and scope
- Pick 3–5 high-value workflows (e.g., homework help, formative quiz feedback, lesson plan generation).
- Define deterministic or rubric-based verifiers for each workflow.
- Record baseline metrics with current stack:
  - task success,
  - policy violations,
  - average latency,
  - cost per session,
  - human override rate.

## Phase 1 (Week 2–4): Skill schema + seed library
Implement a **skill spec** for every skill:
- `name`
- `intent`
- `inputs`
- `preconditions`
- `procedure` (prompt/code/tool steps)
- `postconditions`
- `termination`
- `verifier`
- `safety_contract`
- `dependencies`
- `owner`, `version`, `last_reviewed`

Start with ~20 curated skills across:
- perception/parsing (student input normalization, context extraction)
- planning (subgoal sequencing)
- tutoring actions (hint generation, misconception diagnosis)
- verification (rubric conformance, citation checks)
- recovery (retry/escalate/handoff)

## Phase 2 (Week 4–6): Router and dependency-aware retrieval
- Add a planner/router that selects **small, dependency-resolved skill bundles**.
- Avoid full-library loading.
- Use typed edges (`prerequisite`, `composition`, `safety_gate`, `fallback`).

## Phase 3 (Week 6–8): Monitoring and safety gates
- Add per-skill execution traces and outcome tags.
- Enforce permission tiers for tool-using skills.
- Add fail-safe behaviors:
  - retry with narrower scope,
  - switch to fallback skill,
  - escalate to human.

## Phase 4 (Week 8+): Continuous evaluation and growth
- Weekly regression suite on held-out scenarios.
- Add skills only with passing verifier + security checks.
- Track degradation as library grows; prune redundant/low-signal skills.

---

## 6) Recommended architecture pattern for Tutr

**Control plane**
- Skill registry (versioned metadata, tests, owners)
- Policy engine (permissioning, trust tiers)
- Evaluation service (offline + online)

**Runtime plane**
- Session state + memory
- Planner/router (dependency-aware selection)
- Skill executor (LLM + tool calls)
- Verifier/reflection loop

**Data plane**
- Interaction logs
- Skill performance telemetry
- Error taxonomy and red-team incidents

---

## 7) Decision-ready next steps (what to do this month)

1. Approve a **90-day pilot** on 2 tutoring workflows.
2. Stand up a minimal skill registry and schema.
3. Curate first 20 skills manually (no autonomous skill authoring yet).
4. Launch dependency-aware router with strict context budget limits.
5. Enforce required verifier + safety contract for every production skill.
6. Review pilot by: learning outcome proxy, reliability, safety, latency, and cost.

---

## Source-backed takeaways (from your provided report context)
- Curated skill libraries generally outperform no-skill baselines, but gains are sensitive to retrieval quality and library curation.
- Self-generated skills are currently less reliable on average without refinement pipelines.
- Dependency-aware retrieval/graph approaches are better aligned to real-world skill libraries than flat loading.
- Security and provenance must be treated as core architecture components, not add-ons.
- The most robust implementation target is a **versioned, graph-structured, safety-audited capability layer**.

