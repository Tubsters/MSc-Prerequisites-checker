(() => {
  "use strict";

  /********************
   * CONFIG
   ********************/
  const EXT = {
    ns: "dtu-msc-access-checker",
    panelId: "dtu-msc-access-panel",
    cacheTtlMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    fetchConcurrency: 4,
  };

  // All prerequisite pages (from your list)
  const PROGRAMS = [
    {
      id: "applied-chemistry",
      name: "Applied Chemistry",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/applied-chemistry/prerequisites",
    },
    {
      id: "architectural-engineering",
      name: "Architectural Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/architectural-engineering/prerequisites",
    },
    {
      id: "autonomous-systems",
      name: "Autonomous Systems",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/autonomous-systems/prerequisites",
    },
    {
      id: "bioinformatics",
      name: "Bioinformatics",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/bioinformatics/prerequisites",
    },
    {
      id: "biomaterial-engineering-for-medicine",
      name: "Biomaterial Engineering for Medicine",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/biomaterial-engineering-for-medicine/prerequisites",
    },
    {
      id: "biomedical-engineering",
      name: "Biomedical Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/biomedical-engineering/prerequisites",
    },
    {
      id: "biotechnology",
      name: "Biotechnology",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/biotechnology/prerequisites",
    },
    {
      id: "business-analytics",
      name: "Business Analytics",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/business-analytics/prerequisites",
    },
    {
      id: "chemical-and-biochemical-engineering",
      name: "Chemical and Biochemical Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/chemical-and-biochemical-engineering/prerequisites",
    },
    {
      id: "civil-engineering",
      name: "Civil Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/civil-engineering/prerequisites",
    },
    {
      id: "communication-technologies-and-system-design",
      name: "Communication Technologies and System Design",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/communication-technologies-and-system-design/prerequisites",
    },
    {
      id: "computer-science-and-engineering",
      name: "Computer Science and Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/computer-science-and-engineering/prerequisites",
    },
    {
      id: "design-and-innovation",
      name: "Design and Innovation",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/design-and-innovation/prerequisites",
    },
    {
      id: "earth-and-space-physics-and-engineering",
      name: "Earth and Space Physics and Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/earth-and-space-physics-and-engineering/prerequisites",
    },
    {
      id: "electrical-engineering",
      name: "Electrical Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/electrical-engineering/prerequisites",
    },
    {
      id: "engineering-acoustics",
      name: "Engineering Acoustics",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/engineering-acoustics/prerequisites",
    },
    {
      id: "engineering-light",
      name: "Engineering Light",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/engineering-light/prerequisites",
    },
    {
      id: "engineering-physics",
      name: "Engineering Physics",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/engineering-physics/prerequisites",
    },
    {
      id: "environmental-engineering",
      name: "Environmental Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/environmental-engineering/prerequisites",
    },
    {
      id: "food-technology",
      name: "Food Technology",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/food-technology/prerequisites",
    },
    {
      id: "human-centered-artificial-intelligence",
      name: "Human-Centered Artificial Intelligence",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/human-centered-artificial-intelligence/prerequisites",
    },
    {
      id: "industrial-engineering-and-management",
      name: "Industrial Engineering and Management",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/industrial-engineering-and-management/prerequisites",
    },
    {
      id: "materials-and-manufacturing-engineering",
      name: "Materials and Manufacturing Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/materials-and-manufacturing-engineering/prerequisites",
    },
    {
      id: "mathematical-modelling-and-computation",
      name: "Mathematical Modelling and Computation",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/mathematical-modelling-and-computation/prerequisites",
    },
    {
      id: "mechanical-engineering",
      name: "Mechanical Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/mechanical-engineering/prerequisites",
    },
    {
      id: "ocean-engineering",
      name: "Ocean Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/ocean-engineering/prerequisites",
    },
    {
      id: "pharmaceutical-design-and-engineering",
      name: "Pharmaceutical Design and Engineering",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/pharmaceutical-design-and-engineering/prerequisites",
    },
    {
      id: "sustainable-energy-systems",
      name: "Sustainable Energy Systems",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/sustainable-energy-systems/prerequisites",
    },
    {
      id: "sustainable-energy-technologies",
      name: "Sustainable Energy Technologies",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/sustainable-energy-technologies/prerequisites",
    },
    {
      id: "sustainable-fisheries-and-aquaculture",
      name: "Sustainable Fisheries and Aquaculture",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/sustainable-fisheries-and-aquaculture/prerequisites",
    },
    {
      id: "technology-entrepreneurship",
      name: "Technology Entrepreneurship",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/technology-entrepreneurship/prerequisites",
    },
    {
      id: "wind-energy",
      name: "Wind Energy",
      url: "https://www.dtu.dk/english/education/graduate/msc-programmes/wind-energy/prerequisites",
    },
  ];

  /********************
   * STORAGE HELPERS
   ********************/
  const storageGet = (key) =>
    new Promise((resolve) =>
      chrome.storage.local.get([key], (res) => resolve(res[key])),
    );

  const storageSet = (obj) =>
    new Promise((resolve) => chrome.storage.local.set(obj, resolve));

  /********************
   * STUDY PLANNER COURSE EXTRACTION
   ********************/
  function extractStudentCourseCodes() {
    const text = document.body?.innerText || "";
    const matches = text.match(/\b\d{5}\b/g) || [];
    return Array.from(new Set(matches)).sort();
  }

  /********************
   * PREREQ PARSING (BEST EFFORT)
   ********************/
  function normalizeSpace(s) {
    return (s || "").replace(/\s+/g, " ").trim();
  }

  function findContextText(el) {
    const parts = [];
    let sib = el.previousElementSibling;
    let steps = 0;
    while (sib && steps < 5) {
      const tag = sib.tagName.toLowerCase();
      if (["h1", "h2", "h3", "h4", "p", "strong"].includes(tag)) {
        parts.push(normalizeSpace(sib.innerText));
      }
      sib = sib.previousElementSibling;
      steps++;
    }

    const parent = el.parentElement;
    if (parent) {
      const heading = parent.querySelector("h2,h3,h4");
      if (heading) parts.push(normalizeSpace(heading.innerText));
    }

    return normalizeSpace(parts.reverse().join(" • "));
  }

  function extractCodesAndEctsFromElement(el) {
    const codeToEcts = new Map();

    if (el.tagName.toLowerCase() === "table") {
      const rows = el.querySelectorAll("tr");
      rows.forEach((tr) => {
        const rowText = normalizeSpace(tr.innerText);
        const codes = rowText.match(/\b\d{5}\b/g) || [];
        if (!codes.length) return;

        const ectsMatch = rowText.match(
          /\b(\d+(?:\.\d+)?)\s*(?:ects|point|points)\b/i,
        );
        const ects = ectsMatch ? Number(ectsMatch[1]) : null;

        codes.forEach((c) => {
          if (!codeToEcts.has(c)) codeToEcts.set(c, ects);
          else if (codeToEcts.get(c) == null && ects != null)
            codeToEcts.set(c, ects);
        });
      });

      return codeToEcts;
    }

    const blockText = normalizeSpace(el.innerText);
    const codes = blockText.match(/\b\d{5}\b/g) || [];
    if (!codes.length) return codeToEcts;

    const items = el.querySelectorAll("li");
    if (items.length) {
      items.forEach((li) => {
        const t = normalizeSpace(li.innerText);
        const liCodes = t.match(/\b\d{5}\b/g) || [];
        if (!liCodes.length) return;

        const ectsMatch = t.match(
          /\b(\d+(?:\.\d+)?)\s*(?:ects|point|points)\b/i,
        );
        const ects = ectsMatch ? Number(ectsMatch[1]) : null;

        liCodes.forEach((c) => {
          if (!codeToEcts.has(c)) codeToEcts.set(c, ects);
          else if (codeToEcts.get(c) == null && ects != null)
            codeToEcts.set(c, ects);
        });
      });
      return codeToEcts;
    }

    codes.forEach((c) => {
      if (!codeToEcts.has(c)) codeToEcts.set(c, null);
    });
    return codeToEcts;
  }

  function classifyBlock(contextText) {
    const ctx = (contextText || "").toLowerCase();

    const isRecommended =
      ctx.includes("recommended") ||
      ctx.includes("we recommend") ||
      ctx.includes("it is recommended");

    const pickMatch =
      ctx.match(/\b(?:at\s+least|minimum)\s+(\d+)\s+(?:out\s+of|of)\b/) ||
      ctx.match(/\bchoose\s+(\d+)\s+(?:out\s+of|of)\b/) ||
      ctx.match(/\b(\d+)\s+out\s+of\b/);

    const ectsMatch = ctx.match(
      /\bat\s+least\s+(\d+(?:\.\d+)?)\s*(?:ects|point|points)\b/,
    );

    const looksMandatory =
      ctx.includes("subject to having completed") ||
      ctx.includes("must have completed") ||
      ctx.includes("mandatory") ||
      ctx.includes("required") ||
      ctx.includes("have completed the following course") ||
      ctx.includes("completed the following course");

    if (isRecommended) return { type: "recommended" };

    if (pickMatch) {
      const n = Number(pickMatch[1]);
      if (Number.isFinite(n) && n > 0) return { type: "pick_n_of", n };
    }

    if (ectsMatch) {
      const ects = Number(ectsMatch[1]);
      if (Number.isFinite(ects) && ects > 0) return { type: "min_ects", ects };
    }

    if (looksMandatory) return { type: "mandatory" };

    return { type: "other" };
  }

  function parsePrereqPage(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const main = doc.querySelector("main") || doc.body;

    const blocks = Array.from(main.querySelectorAll("ul,ol,table"));
    const requirementBlocks = [];
    const allCodes = new Set();

    for (const el of blocks) {
      const codeToEcts = extractCodesAndEctsFromElement(el);
      if (!codeToEcts.size) continue;

      const contextText = findContextText(el);
      const cls = classifyBlock(contextText);

      const codes = Array.from(codeToEcts.keys());
      codes.forEach((c) => allCodes.add(c));

      requirementBlocks.push({
        contextText,
        type: cls.type,
        n: cls.n ?? null,
        ects: cls.ects ?? null,
        items: codes.map((code) => ({ code, ects: codeToEcts.get(code) })),
      });
    }

    if (!requirementBlocks.length) {
      const text = normalizeSpace(main.innerText);
      const cutoffIndex = text.toLowerCase().indexOf("recommended");
      const scanText = cutoffIndex > 0 ? text.slice(0, cutoffIndex) : text;
      const codes = Array.from(
        new Set(scanText.match(/\b\d{5}\b/g) || []),
      ).sort();
      codes.forEach((c) => allCodes.add(c));
      requirementBlocks.push({
        contextText: "Fallback scan (unclassified)",
        type: "other",
        n: null,
        ects: null,
        items: codes.map((code) => ({ code, ects: null })),
      });
    }

    return {
      parsedAt: Date.now(),
      blocks: requirementBlocks,
      allCodes: Array.from(allCodes).sort(),
    };
  }

  /********************
   * EVALUATION
   ********************/
  function satisfiesCode(code, studentSet) {
    return studentSet.has(code);
  }

  function sumEcts(items, studentSet) {
    let total = 0;
    for (const it of items) {
      if (satisfiesCode(it.code, studentSet)) {
        total +=
          typeof it.ects === "number" && Number.isFinite(it.ects) ? it.ects : 5;
      }
    }
    return total;
  }

  function evaluateProgram(prereq, studentCodes) {
    const studentSet = new Set(studentCodes);

    const results = prereq.blocks.map((b) => {
      const items = b.items || [];
      const codes = items.map((x) => x.code);

      if (b.type === "mandatory") {
        const missing = codes.filter((c) => !satisfiesCode(c, studentSet));
        return {
          ...b,
          ok: missing.length === 0,
          missing,
          satisfied: codes.filter((c) => satisfiesCode(c, studentSet)),
        };
      }

      if (b.type === "pick_n_of" && b.n) {
        const satisfied = codes.filter((c) => satisfiesCode(c, studentSet));
        const missing = codes.filter((c) => !satisfiesCode(c, studentSet));
        return {
          ...b,
          ok: satisfied.length >= b.n,
          satisfied,
          missing,
          needed: Math.max(0, b.n - satisfied.length),
        };
      }

      if (b.type === "min_ects" && b.ects) {
        const ectsDone = sumEcts(items, studentSet);
        const ok = ectsDone >= b.ects;
        const satisfied = codes.filter((c) => satisfiesCode(c, studentSet));
        const missing = codes.filter((c) => !satisfiesCode(c, studentSet));
        return { ...b, ok, ectsDone, satisfied, missing };
      }

      const satisfied = codes.filter((c) => satisfiesCode(c, studentSet));
      const missing = codes.filter((c) => !satisfiesCode(c, studentSet));
      return { ...b, ok: null, satisfied, missing };
    });

    const gating = results.filter((r) =>
      ["mandatory", "pick_n_of", "min_ects"].includes(r.type),
    );
    const overallOk = gating.length ? gating.every((r) => r.ok === true) : null;

    let missingCount = 0;
    for (const r of gating) {
      if (Array.isArray(r.missing)) missingCount += r.missing.length;
      if (typeof r.needed === "number") missingCount += r.needed;
      if (r.type === "min_ects" && r.ok === false)
        missingCount += Math.max(1, (r.missing || []).length);
    }

    return { overallOk, missingCount, results };
  }

  /********************
   * FETCH + CACHE
   ********************/
  async function loadProgramPrereqs(program) {
    const cacheKey = `${EXT.ns}:prereq:${program.id}`;
    const cached = await storageGet(cacheKey);

    if (
      cached &&
      cached.fetchedAt &&
      cached.data &&
      Date.now() - cached.fetchedAt < EXT.cacheTtlMs
    ) {
      return cached.data;
    }

    const res = await fetch(program.url, { method: "GET" });
    if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
    const html = await res.text();

    const parsed = parsePrereqPage(html);
    await storageSet({
      [cacheKey]: { fetchedAt: Date.now(), data: parsed },
    });

    return parsed;
  }

  async function runWithConcurrency(tasks, limit) {
    const results = new Array(tasks.length);
    let i = 0;

    async function worker() {
      while (i < tasks.length) {
        const idx = i++;
        try {
          results[idx] = await tasks[idx]();
        } catch (e) {
          results[idx] = { __error: String(e?.message || e) };
        }
      }
    }

    const workers = Array.from({ length: Math.max(1, limit) }, worker);
    await Promise.all(workers);
    return results;
  }

  /********************
   * UI
   ********************/
  function ensurePanel() {
    if (document.getElementById(EXT.panelId)) return;

    const uiKey = `${EXT.ns}:ui`;

    const style = document.createElement("style");
    style.textContent = `
#${EXT.panelId} {
  position: fixed;
  top: 12px;
  right: 12px;
  width: 420px;
  max-height: calc(100vh - 24px);
  overflow: auto;
  z-index: 2147483647;
  background: #111;
  color: #fff;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,.35);
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}
#${EXT.panelId} * { box-sizing: border-box; }
#${EXT.panelId} header {
  padding: 12px 12px 8px 12px;
  border-bottom: 1px solid #2a2a2a;
  position: sticky;
  top: 0;
  background: #111;
}
#${EXT.panelId} h2 {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .2px;
}
#${EXT.panelId} .meta {
  margin-top: 6px;
  font-size: 12px;
  opacity: .85;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
#${EXT.panelId} button {
  background: #1f1f1f;
  color: #fff;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 12px;
}
#${EXT.panelId} button:hover { background: #2a2a2a; }
#${EXT.panelId} .body { padding: 10px 12px 12px 12px; }
#${EXT.panelId} .note {
  font-size: 12px;
  line-height: 1.35;
  opacity: .85;
  margin: 0 0 10px 0;
}
#${EXT.panelId} .prog {
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  background: #151515;
}
#${EXT.panelId} .row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: baseline;
}
#${EXT.panelId} .title {
  font-weight: 700;
  font-size: 13px;
  margin: 0;
}
#${EXT.panelId} .status {
  font-size: 12px;
  opacity: .9;
  white-space: nowrap;
}
#${EXT.panelId} .small {
  font-size: 12px;
  opacity: .85;
  margin-top: 6px;
  line-height: 1.35;
}
#${EXT.panelId} .codes {
  margin-top: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  opacity: .9;
  white-space: normal;
  word-break: break-word;
}
#${EXT.panelId} a { color: #8ab4f8; text-decoration: none; }
#${EXT.panelId} a:hover { text-decoration: underline; }
#${EXT.panelId} details { margin-top: 6px; }
#${EXT.panelId} summary { cursor: pointer; font-size: 12px; opacity: .95; }

/* Collapsed/minimized state */
#${EXT.panelId}.collapsed {
  width: 260px;
  max-height: unset;
  overflow: hidden;
}
#${EXT.panelId}.collapsed .body { display: none; }
#${EXT.panelId}.collapsed header { border-bottom: 0; }
#${EXT.panelId}.collapsed .meta { display: none; }
    `;
    document.documentElement.appendChild(style);

    const panel = document.createElement("div");
    panel.id = EXT.panelId;
    panel.innerHTML = `
<header>
  <div class="row">
    <h2>DTU MSc Access Checker (Beta)</h2>
    <div>
      <button id="${EXT.ns}-refresh">Refresh</button>
      <button id="${EXT.ns}-min" title="Minimize">–</button>
      <button id="${EXT.ns}-close" title="Hide panel">✕</button>
    </div>
  </div>
  <div class="meta">
    <span id="${EXT.ns}-coursecount">Courses: …</span>
    <span id="${EXT.ns}-progress">Progress: …</span>
  </div>
</header>
<div class="body">
  <p class="note">
    This compares course codes from your Study Planner to DTU prerequisite pages and highlights missing codes.
    Some DTU rules (legal right admission, equivalents, special conditions) may require manual confirmation.
  </p>
  <div id="${EXT.ns}-list"></div>
</div>
    `;
    document.documentElement.appendChild(panel);

    function setCollapsed(collapsed) {
      panel.classList.toggle("collapsed", collapsed);
      const minBtn = panel.querySelector(`#${EXT.ns}-min`);
      if (minBtn) minBtn.textContent = collapsed ? "▸" : "–";
    }

    // Restore persisted UI state
    storageGet(uiKey).then((ui) => {
      if (ui && ui.collapsed === true) setCollapsed(true);
    });

    panel.querySelector(`#${EXT.ns}-min`)?.addEventListener("click", () => {
      const collapsed = !panel.classList.contains("collapsed");
      setCollapsed(collapsed);
      storageSet({ [uiKey]: { collapsed, updatedAt: Date.now() } });
    });

    panel.querySelector(`#${EXT.ns}-close`)?.addEventListener("click", () => {
      panel.remove();
    });

    panel.querySelector(`#${EXT.ns}-refresh`)?.addEventListener("click", () => {
      void refreshAll();
    });
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function renderPrograms(studentCodes, programOutputs) {
    const list = document.getElementById(`${EXT.ns}-list`);
    if (!list) return;

    const rows = programOutputs
      .map((out, idx) => ({ program: PROGRAMS[idx], out }))
      .sort((a, b) => {
        const ao = a.out?.overallOk;
        const bo = b.out?.overallOk;
        const aRank = ao === true ? 0 : ao === null ? 1 : 2;
        const bRank = bo === true ? 0 : bo === null ? 1 : 2;
        if (aRank !== bRank) return aRank - bRank;
        const am = a.out?.missingCount ?? 9999;
        const bm = b.out?.missingCount ?? 9999;
        if (am !== bm) return am - bm;
        return a.program.name.localeCompare(b.program.name);
      });

    list.innerHTML = "";

    for (const { program, out } of rows) {
      const box = document.createElement("div");
      box.className = "prog";

      if (out?.__error) {
        box.innerHTML = `
          <div class="row">
            <div class="title">${program.name}</div>
            <div class="status">⚠️ error</div>
          </div>
          <div class="small">Couldn’t fetch/parse prerequisites: ${out.__error}</div>
          <div class="small"><a href="${program.url}" target="_blank" rel="noreferrer">Open prerequisites</a></div>
        `;
        list.appendChild(box);
        continue;
      }

      const overallOk = out?.overallOk;
      const status =
        overallOk === true
          ? "✅ meets extracted prereqs"
          : overallOk === false
            ? "❌ missing extracted prereqs"
            : "🟨 unknown (unclassified rules)";

      const gating = (out?.results || []).filter((r) =>
        ["mandatory", "pick_n_of", "min_ects"].includes(r.type),
      );
      const missingCodes = [];
      for (const r of gating) {
        if (Array.isArray(r.missing)) missingCodes.push(...r.missing);
      }
      const uniqMissing = Array.from(new Set(missingCodes)).sort();

      const detailsHtml = (out?.results || [])
        .map((r) => {
          const ctx = r.contextText ? r.contextText : "(no context)";
          if (r.type === "mandatory") {
            return `
            <div class="small"><b>Mandatory</b> — ${ctx}<br/>
              OK: ${r.ok ? "yes" : "no"} • missing: ${r.missing?.length || 0}
            </div>
          `;
          }
          if (r.type === "pick_n_of") {
            return `
            <div class="small"><b>Pick ${r.n}</b> — ${ctx}<br/>
              OK: ${r.ok ? "yes" : "no"} • satisfied: ${r.satisfied?.length || 0} • needed: ${r.needed ?? "?"}
            </div>
          `;
          }
          if (r.type === "min_ects") {
            return `
            <div class="small"><b>Min ${r.ects} ECTS</b> — ${ctx}<br/>
              OK: ${r.ok ? "yes" : "no"} • counted: ${typeof r.ectsDone === "number" ? r.ectsDone : "?"}
            </div>
          `;
          }
          if (r.type === "recommended") {
            return `
            <div class="small"><b>Recommended</b> — ${ctx}<br/>
              satisfied: ${r.satisfied?.length || 0} • missing: ${r.missing?.length || 0}
            </div>
          `;
          }
          return `
          <div class="small"><b>Other</b> — ${ctx}<br/>
            satisfied: ${r.satisfied?.length || 0} • missing: ${r.missing?.length || 0}
          </div>
        `;
        })
        .join("");

      box.innerHTML = `
        <div class="row">
          <div class="title">${program.name}</div>
          <div class="status">${status}</div>
        </div>
        <div class="small">
          <a href="${program.url}" target="_blank" rel="noreferrer">Open prerequisites</a>
        </div>
        ${
          uniqMissing.length
            ? `<div class="small"><b>Missing course codes (from extracted gating blocks):</b></div>
               <div class="codes">${uniqMissing.join(", ")}</div>`
            : `<div class="small"><b>Missing course codes:</b> none detected (from extracted gating blocks)</div>`
        }
        <details>
          <summary>Show parsed requirement blocks</summary>
          ${detailsHtml}
        </details>
      `;

      list.appendChild(box);
    }
  }

  /********************
   * MAIN FLOW
   ********************/
  let refreshTimer = null;

  function debounceRefresh() {
    if (refreshTimer) clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => void refreshAll(), 800);
  }

  async function refreshAll() {
    ensurePanel();

    const studentCodes = extractStudentCourseCodes();
    setText(`${EXT.ns}-coursecount`, `Courses: ${studentCodes.length}`);

    await storageSet({
      [`${EXT.ns}:studentCourses`]: {
        updatedAt: Date.now(),
        href: location.href,
        codes: studentCodes,
      },
    });

    setText(`${EXT.ns}-progress`, `Progress: fetching…`);

    const tasks = PROGRAMS.map((p, idx) => async () => {
      setText(`${EXT.ns}-progress`, `Progress: ${idx + 1}/${PROGRAMS.length}`);
      const prereq = await loadProgramPrereqs(p);
      return evaluateProgram(prereq, studentCodes);
    });

    const outputs = await runWithConcurrency(tasks, EXT.fetchConcurrency);
    setText(
      `${EXT.ns}-progress`,
      `Progress: done (${PROGRAMS.length}/${PROGRAMS.length})`,
    );

    renderPrograms(studentCodes, outputs);
  }

  /********************
   * INIT
   ********************/
  ensurePanel();
  void refreshAll();

  const mo = new MutationObserver(() => debounceRefresh());
  mo.observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) debounceRefresh();
  });
})();
