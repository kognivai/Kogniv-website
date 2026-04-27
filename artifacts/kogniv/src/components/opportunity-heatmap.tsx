import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Tier = "p0" | "high" | "medium" | "low";

interface Workflow {
  name: string;
  score: number;
  sn: boolean;
}

const ROWS: { domain: string; workflows: Workflow[] }[] = [
  {
    domain: "ITSM",
    workflows: [
      { name: "Incident Mgmt",  score: 9.1, sn: true  },
      { name: "Change Mgmt",    score: 8.7, sn: true  },
      { name: "Problem Mgmt",   score: 7.2, sn: true  },
      { name: "Asset Mgmt",     score: 6.8, sn: true  },
      { name: "Svc Catalog",    score: 8.4, sn: true  },
    ],
  },
  {
    domain: "HR",
    workflows: [
      { name: "HR Onboarding",  score: 8.8, sn: false },
      { name: "HR Offboarding", score: 7.2, sn: true  },
      { name: "Leave Approval", score: 5.1, sn: false },
      { name: "Performance",    score: 4.2, sn: false },
      { name: "Payroll",        score: 3.9, sn: false },
    ],
  },
  {
    domain: "CSM",
    workflows: [
      { name: "Case Routing",   score: 8.5, sn: true  },
      { name: "Knowledge",      score: 5.9, sn: true  },
      { name: "Survey",         score: 4.8, sn: false },
      { name: "Escalation",     score: 7.8, sn: true  },
      { name: "Chat to Case",   score: 8.1, sn: true  },
    ],
  },
  {
    domain: "Proc.",
    workflows: [
      { name: "Vendor Appr.",   score: 7.4, sn: false },
      { name: "PO Process",     score: 6.2, sn: false },
      { name: "Contract",       score: 5.0, sn: false },
      { name: "Invoice",        score: 6.7, sn: false },
      { name: "Audit Trail",    score: 3.2, sn: false },
    ],
  },
  {
    domain: "ITOM",
    workflows: [
      { name: "Patch Mgmt",     score: 3.8, sn: false },
      { name: "Config Base.",   score: 4.1, sn: true  },
      { name: "Alert Corr.",    score: 7.9, sn: true  },
      { name: "Capacity",       score: 5.6, sn: true  },
      { name: "CMDB Sync",      score: 6.4, sn: true  },
    ],
  },
];

function getTier(score: number): Tier {
  if (score >= 8.5) return "p0";
  if (score >= 6.5) return "high";
  if (score >= 4.0) return "medium";
  return "low";
}

function tierStyle(tier: Tier) {
  switch (tier) {
    case "p0":
      return {
        bg: "bg-[#0d1554]",
        border: "border-[#1e2d80]",
        text: "text-white",
        label: "text-blue-300/80",
      };
    case "high":
      return {
        bg: "bg-[#2040c8]",
        border: "border-[#3050d8]",
        text: "text-white",
        label: "text-blue-200/80",
      };
    case "medium":
      return {
        bg: "bg-[#4a7ce8]",
        border: "border-[#5a8cf0]",
        text: "text-white",
        label: "text-blue-100/80",
      };
    case "low":
      return {
        bg: "bg-[#a8e6c0]",
        border: "border-[#80d0a0]",
        text: "text-[#1a4030]",
        label: "text-[#1a4030]/70",
      };
  }
}

const TIER_DESCRIPTIONS: Record<
  string,
  { priority: string; platform: string; saving: string; payback: string; description: string }
> = {
  "Incident Mgmt":  { priority: "P0 Quick Win", platform: "NOW Assist + Predictive Intelligence", saving: "$649K", payback: "3 wks", description: "14 nodes → 9 nodes. 72% auto-processed. Routing time < 45 sec via PI classification + GenAI Summarise." },
  "Change Mgmt":    { priority: "P0 Quick Win", platform: "NOW Assist + PI Risk Scoring",          saving: "$412K", payback: "4 wks", description: "8 nodes → 5 nodes. 62% of standard changes auto-approved. CAB bypassed for pre-classified requests." },
  "HR Onboarding":  { priority: "P0 Quick Win", platform: "Copilot + AI Builder",                  saving: "$280K", payback: "9 wks", description: "9 nodes → 6 nodes. 78% automated. Day-1 ready in < 2 hours via M365 + AD + Workday integration." },
  "Case Routing":   { priority: "P0 Quick Win", platform: "NOW Assist + AI Search",                 saving: "$310K", payback: "6 wks", description: "Intelligent routing with NLU/NLP. 85% first-contact resolution. Adaptive card dispatch to agents." },
  "Chat to Case":   { priority: "High Value",   platform: "NOW Assist Virtual Agent",               saving: "$240K", payback: "8 wks", description: "Conversational AI deflects 30% before case creation. Seamless escalation with full context transfer." },
  "Svc Catalog":    { priority: "High Value",   platform: "NOW Assist + Virtual Agent",             saving: "$190K", payback: "10 wks", description: "Natural language fulfillment. 68% of catalog requests handled without human touch." },
  "Alert Corr.":    { priority: "High Value",   platform: "AIOps + Event Correlation",              saving: "$380K", payback: "5 wks", description: "Noise reduction 84%. Auto-closes duplicate alerts. P1 incidents created only for real anomalies." },
  "Escalation":     { priority: "High Value",   platform: "NOW Assist Predictive Intelligence",     saving: "$165K", payback: "11 wks", description: "Predict escalation risk at intake. Re-route proactively before SLA breach." },
  "HR Offboarding": { priority: "High Value",   platform: "NOW Assist + Power Automate",            saving: "$145K", payback: "12 wks", description: "8-step offboarding compressed to 3 automated phases. Access revocation in < 30 min." },
  "Vendor Appr.":   { priority: "High Value",   platform: "Power Automate + AI Builder",            saving: "$210K", payback: "7 wks",  description: "Multi-tier approval collapsed. AI pre-qualifies vendors. Avg cycle time 6 days → 18 hours." },
  "Invoice":        { priority: "High Value",   platform: "Power Automate + AI Builder",            saving: "$175K", payback: "9 wks",  description: "OCR + AI extracts invoice data. 3-way match automated. Exception handling only for outliers." },
  "Asset Mgmt":     { priority: "High Value",   platform: "NOW Assist ITAM",                        saving: "$135K", payback: "14 wks", description: "Auto-discovery syncs CMDB. License reconciliation automated quarterly. Shadow IT flagged instantly." },
  "Problem Mgmt":   { priority: "High Value",   platform: "NOW Assist + GenAI RCA",                saving: "$120K", payback: "15 wks", description: "Root cause analysis AI-assisted. Known error DB updated automatically from resolved incidents." },
  "CMDB Sync":      { priority: "Medium",       platform: "NOW Assist Discovery",                   saving: "$90K",  payback: "18 wks", description: "Scheduled reconciliation replaced with event-driven CI updates. Stale CIs auto-flagged." },
  "Knowledge":      { priority: "Medium",       platform: "NOW Assist GenAI",                       saving: "$85K",  payback: "16 wks", description: "GenAI drafts articles from resolved incidents. Approval workflow shortened to one click." },
  "PO Process":     { priority: "Medium",       platform: "Power Automate",                         saving: "$95K",  payback: "17 wks", description: "Purchase requisitions auto-routed by value threshold. 70% approved without human review." },
  "Capacity":       { priority: "Medium",       platform: "AIOps + Predictive Analytics",           saving: "$110K", payback: "15 wks", description: "Capacity forecasts 30-day rolling. Auto-provision triggers at 80% threshold." },
  "Leave Approval": { priority: "Medium",       platform: "Power Automate",                         saving: "$60K",  payback: "20 wks", description: "Policy-based auto-approval for <5-day requests. Manager notified only for exceptions." },
  "Payroll":        { priority: "Low",          platform: "AI Builder",                             saving: "$45K",  payback: "24 wks", description: "Variance flagging automated. Payroll exceptions surface to HR ops only when threshold breached." },
  "Patch Mgmt":     { priority: "Low",          platform: "NOW Assist + Orchestration",             saving: "$50K",  payback: "22 wks", description: "Low-risk patches auto-deployed in maintenance windows. Manual approval only for critical systems." },
  "Performance":    { priority: "Low",          platform: "Power Automate",                         saving: "$35K",  payback: "28 wks", description: "Review scheduling automated. Reminder sequences sent via Teams. Score aggregation computed." },
  "Survey":         { priority: "Medium",       platform: "NOW Assist",                             saving: "$30K",  payback: "26 wks", description: "Auto-triggered post-resolution. Sentiment analysis routes negative feedback to team leads." },
  "Config Base.":   { priority: "Medium",       platform: "NOW Assist Discovery",                   saving: "$75K",  payback: "19 wks", description: "Configuration drift detected automatically. Change requests auto-generated for unauthorized changes." },
  "Contract":       { priority: "Medium",       platform: "AI Builder + Power Automate",            saving: "$80K",  payback: "18 wks", description: "Renewal reminders automated 90/60/30 days. AI extracts key clauses for review." },
  "Audit Trail":    { priority: "Low",          platform: "NOW Assist GRC",                         saving: "$40K",  payback: "25 wks", description: "Audit evidence auto-collected from change records. Compliance reporting generated on schedule." },
};

export function OpportunityHeatmap() {
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);

  const selectedWorkflow =
    selected !== null
      ? ROWS[selected.row].workflows[selected.col]
      : null;
  const selectedDetail =
    selectedWorkflow ? TIER_DESCRIPTIONS[selectedWorkflow.name] ?? null : null;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <span className="text-xs font-bold tracking-[0.16em] uppercase text-muted-foreground/60">
          OPPORTUNITY HEATMAP BY DOMAIN
        </span>
        <span className="text-xs text-muted-foreground/40">— click any cell to see workflows</span>
      </div>

      {/* Domain labels + Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[620px]">
          {ROWS.map((row, ri) => (
            <div key={ri} className="flex items-stretch gap-2 mb-2">
              {/* Domain label */}
              <div className="w-[44px] flex-shrink-0 flex items-center justify-end pr-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50 rotate-0">
                  {row.domain}
                </span>
              </div>

              {/* Workflow tiles */}
              {row.workflows.map((wf, ci) => {
                const tier = getTier(wf.score);
                const styles = tierStyle(tier);
                const isSelected = selected?.row === ri && selected?.col === ci;

                return (
                  <motion.button
                    key={ci}
                    onClick={() =>
                      setSelected(isSelected ? null : { row: ri, col: ci })
                    }
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      flex-1 relative rounded-xl border-2 p-3 text-left
                      transition-all duration-200 cursor-pointer min-h-[88px]
                      flex flex-col justify-between
                      ${styles.bg} ${styles.border} ${styles.text}
                      ${isSelected ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""}
                    `}
                  >
                    {/* Score */}
                    <div className={`text-2xl font-bold leading-none tracking-tight`}>
                      {wf.score.toFixed(1)}
                    </div>

                    {/* Name */}
                    <div className="mt-auto">
                      <div className={`text-[11px] font-medium leading-tight ${styles.label}`}>
                        {wf.name}
                      </div>
                      {/* SN badge */}
                      {wf.sn && (
                        <div className="mt-1.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 border border-white/30">
                          <span className="text-[8px] font-bold text-white leading-none">SN</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Expanded workflow detail */}
      <AnimatePresence>
        {selectedWorkflow && selectedDetail && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 rounded-2xl border border-primary/30 bg-primary/5 relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-border flex items-center justify-center hover:bg-border/80 transition-colors"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>

              <div className="flex flex-wrap items-start gap-6">
                <div>
                  <div className="text-xs font-bold text-primary/60 uppercase tracking-[0.14em] mb-1">Workflow</div>
                  <div className="text-xl font-bold">{selectedWorkflow.name}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary/60 uppercase tracking-[0.14em] mb-1">KAFE Score</div>
                  <div className="text-xl font-bold text-primary">{selectedWorkflow.score.toFixed(1)}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary/60 uppercase tracking-[0.14em] mb-1">Priority</div>
                  <div className="text-sm font-semibold">{selectedDetail.priority}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary/60 uppercase tracking-[0.14em] mb-1">Platform</div>
                  <div className="text-sm font-semibold">{selectedDetail.platform}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary/60 uppercase tracking-[0.14em] mb-1">Est. Annual Saving</div>
                  <div className="text-xl font-bold text-primary">{selectedDetail.saving}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary/60 uppercase tracking-[0.14em] mb-1">Payback</div>
                  <div className="text-xl font-bold">{selectedDetail.payback}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{selectedDetail.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        {[
          { color: "bg-[#a8e6c0] border-[#80d0a0]", label: "Low (<4)" },
          { color: "bg-[#4a7ce8] border-[#5a8cf0]", label: "Medium (4–6.5)" },
          { color: "bg-[#2040c8] border-[#3050d8]", label: "High (6.5–8.5)" },
          { color: "bg-[#0d1554] border-[#1e2d80]", label: "P0 Quick Win (8.5+)" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-md border ${color}`} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">SN</span>
          </div>
          <span className="text-xs text-muted-foreground">NOW Assist recommended</span>
        </div>
      </div>
    </div>
  );
}
