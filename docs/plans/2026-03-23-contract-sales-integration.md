# Contract-Sales Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Connect contract signing/completion to dashboard sales metrics and add explicit status management with manual override.

**Architecture:** Add explicit `status` and `completed_at` columns to the contracts table. Update the send/sign API routes to set status automatically. Update the dashboard to query both inquiries and contracts for metrics. Add a status dropdown on the contract detail page header.

**Tech Stack:** Next.js 16 (App Router), Supabase (PostgreSQL), TypeScript, React

---

### Task 1: Database Migration — Add `status` and `completed_at` columns

**Files:**
- Modify: Supabase database via MCP or SQL

**Step 1: Add columns to contracts table**

Run this SQL on Supabase:

```sql
-- Add explicit status column with default
ALTER TABLE contracts ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Pending';

-- Add completed_at timestamp
ALTER TABLE contracts ADD COLUMN IF NOT EXISTS completed_at timestamptz;

-- Migrate existing contracts: set status from timestamps
UPDATE contracts SET status = 'Signed' WHERE signed_at IS NOT NULL;
UPDATE contracts SET status = 'Sent' WHERE sent_at IS NOT NULL AND signed_at IS NULL;
-- Remaining rows keep 'Pending' default
```

**Step 2: Verify migration**

Run: `SELECT id, contract_number, status, sent_at, signed_at, completed_at FROM contracts;`
Expected: All existing contracts have correct status matching their timestamps.

---

### Task 2: Update Contract API — POST (create) sets default status

**Files:**
- Modify: `src/app/api/admin/contracts/route.ts`

**Step 1: No change needed for POST**

The default value `'Pending'` is handled by the database column default. No code change required.

**Step 2: Commit**

```bash
git commit -m "chore: task 2 verified — POST uses DB default status"
```

---

### Task 3: Update Contract API — PUT allows status changes

**Files:**
- Modify: `src/app/api/admin/contracts/[id]/route.ts`

**Step 1: Add `status` and `completed_at` to allowed fields**

In the `allowed` array (line 32-44), add `"status"` and `"completed_at"`:

```typescript
const allowed = [
  "inquiry_id",
  "event_date",
  "venue",
  "service_description",
  "total_price",
  "advance_amount",
  "balance_amount",
  "balance_due",
  "travel_cost",
  "client_name",
  "client_email",
  "terms",
  "status",
  "completed_at",
];
```

**Step 2: Add logic to auto-set `completed_at` when status changes to Completed**

After the allowed fields loop, before the update query, add:

```typescript
// Auto-set completed_at when status changes to Completed
if (updates.status === "Completed" && !updates.completed_at) {
  updates.completed_at = new Date().toISOString();
}
// Clear completed_at if status changes away from Completed
if (updates.status && updates.status !== "Completed") {
  updates.completed_at = null;
}
```

**Step 3: Verify** — Test PUT with `{ "status": "Signed" }` body, confirm it updates.

**Step 4: Commit**

```bash
git add src/app/api/admin/contracts/[id]/route.ts
git commit -m "feat: allow status and completed_at updates on contracts"
```

---

### Task 4: Update Send Route — Auto-set status to 'Sent'

**Files:**
- Modify: `src/app/api/admin/contracts/[id]/send/route.ts`

**Step 1: Update the sent_at update to also set status**

Change line 123-127 from:
```typescript
.update({ sent_at: new Date().toISOString() })
```
to:
```typescript
.update({ sent_at: new Date().toISOString(), status: "Sent" })
```

**Step 2: Commit**

```bash
git add src/app/api/admin/contracts/[id]/send/route.ts
git commit -m "feat: auto-set contract status to Sent when sending"
```

---

### Task 5: Update Sign Route — Auto-set status to 'Signed'

**Files:**
- Modify: `src/app/api/contracts/[id]/sign/route.ts`

**Step 1: Update the signature update to also set status**

Change lines 72-75 from:
```typescript
.update({
  signature_data: body.signature_data,
  signed_at: signedAt,
})
```
to:
```typescript
.update({
  signature_data: body.signature_data,
  signed_at: signedAt,
  status: "Signed",
})
```

**Step 2: Commit**

```bash
git add src/app/api/contracts/[id]/sign/route.ts
git commit -m "feat: auto-set contract status to Signed on customer signature"
```

---

### Task 6: Update Dashboard — Include contracts in sales metrics

**Files:**
- Modify: `src/app/admin/page.tsx`

**Step 1: Add Contract interface and fetch**

After the existing `Inquiry` interface (line 20-29), add:

```typescript
interface ContractMetric {
  id: string;
  total_price: number;
  status: string;
  signed_at: string | null;
  completed_at: string | null;
  created_at: string;
}
```

**Step 2: Add contracts state and fetch**

In the component, add state:
```typescript
const [contracts, setContracts] = useState<ContractMetric[]>([]);
```

In the useEffect, add:
```typescript
async function fetchContracts() {
  const res = await fetch("/api/admin/contracts");
  const data = await res.json();
  if (Array.isArray(data)) setContracts(data);
}
fetchContracts();
```

**Step 3: Add filteredContracts memo**

After `filteredInquiries` memo, add a `filteredContracts` memo with the same date logic but using the appropriate date field:
- For Signed contracts: filter by `signed_at`
- For Completed contracts: filter by `completed_at`
- For "All Time": return all contracts

```typescript
const filteredContracts = useMemo(() => {
  if (filter === "All Time") return contracts;

  let startDate: Date;
  let endDate: Date;

  if (filter === "This Month") {
    const now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  } else if (filter === "Last Month") {
    const now = new Date();
    startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
  } else {
    startDate = new Date(selectedMonth.year, selectedMonth.month, 1);
    endDate = new Date(selectedMonth.year, selectedMonth.month + 1, 0, 23, 59, 59);
  }

  return contracts.filter((c) => {
    // Use the most relevant date for filtering
    const dateStr = c.completed_at || c.signed_at || c.created_at;
    const d = new Date(dateStr);
    return d >= startDate && d <= endDate;
  });
}, [contracts, filter, selectedMonth]);
```

**Step 4: Update metrics calculation**

Replace the existing `metrics` useMemo to include contracts:

```typescript
const metrics = useMemo(() => {
  const booked = filteredInquiries.filter((i) => i.status === "Booked");
  const completed = filteredInquiries.filter((i) => i.status === "Completed");
  const newInq = filteredInquiries.filter((i) => i.status === "New");

  const signedContracts = filteredContracts.filter((c) => c.status === "Signed");
  const completedContracts = filteredContracts.filter((c) => c.status === "Completed");

  const inquiryBooked = booked.reduce((sum, i) => sum + (i.booked_price || 0), 0);
  const contractBooked = signedContracts.reduce((sum, c) => sum + (c.total_price || 0), 0);
  const bookedPipeline = inquiryBooked + contractBooked;

  const inquiryCompleted = completed.reduce((sum, i) => sum + (i.completed_price || 0), 0);
  const contractCompleted = completedContracts.reduce((sum, c) => sum + (c.total_price || 0), 0);
  const completedRevenue = inquiryCompleted + contractCompleted;

  const totalCompletedCount = completed.length + completedContracts.length;
  const averageOrder = totalCompletedCount > 0 ? completedRevenue / totalCompletedCount : 0;

  return { bookedPipeline, completedRevenue, averageOrder, newCount: newInq.length, totalCount: filteredInquiries.length };
}, [filteredInquiries, filteredContracts]);
```

**Step 5: Verify** — Check dashboard shows combined metrics. Run dev server, check `/admin`.

**Step 6: Commit**

```bash
git add src/app/admin/page.tsx
git commit -m "feat: dashboard sales metrics include contract revenue"
```

---

### Task 7: Update Contract List Page — New filter tabs and status-based filtering

**Files:**
- Modify: `src/app/admin/contracts/page.tsx`

**Step 1: Update FilterTab type and tabs array**

Change:
```typescript
type FilterTab = "all" | "pending" | "sent" | "signed";
```
to:
```typescript
type FilterTab = "all" | "pending" | "sent" | "signed" | "completed" | "cancelled";
```

Update the `tabs` array:
```typescript
const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "sent", label: "Sent" },
  { key: "signed", label: "Signed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];
```

**Step 2: Update filter logic to use explicit status**

Replace the `filtered` logic:
```typescript
const filtered = contracts.filter((c) => {
  if (filter === "all") return true;
  return c.status.toLowerCase() === filter;
});
```

Note: Need to handle case — the DB stores "Pending", "Sent", "Signed", "Completed", "Cancelled" with capital first letter. The filter tab keys are lowercase. So compare `c.status.toLowerCase()`.

For "cancelled" tab: `c.status === "Cancelled"` maps to `filter === "cancelled"`. This works with `.toLowerCase()`.

**Step 3: Update getStatusBadge to use explicit status**

Replace the entire `getStatusBadge` function:
```typescript
const CONTRACT_STATUS_COLORS: Record<string, string> = {
  Pending: "#eab308",
  Sent: "#3b82f6",
  Signed: "#22c55e",
  Completed: "#F7941D",
  Cancelled: "#ef4444",
};

function getStatusBadge(contract: Contract) {
  const color = CONTRACT_STATUS_COLORS[contract.status] || "#888";
  let label = contract.status;
  if (contract.status === "Signed" && contract.signed_at) {
    label = `Signed ${formatDate(contract.signed_at)}`;
  } else if (contract.status === "Sent" && contract.sent_at) {
    label = `Sent ${formatDate(contract.sent_at)}`;
  }
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.2rem 0.6rem",
        borderRadius: "4px",
        background: `${color}20`,
        color: color,
        fontSize: "12px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
```

**Step 4: Verify** — Check all 6 filter tabs work correctly.

**Step 5: Commit**

```bash
git add src/app/admin/contracts/page.tsx
git commit -m "feat: contract list uses explicit status with Completed/Cancelled tabs"
```

---

### Task 8: Update Contract Detail Page — Status dropdown in header

**Files:**
- Modify: `src/app/admin/contracts/[id]/page.tsx`

**Step 1: Add status constants and handler**

After the existing state declarations, add:

```typescript
const [updatingStatus, setUpdatingStatus] = useState(false);

const CONTRACT_STATUSES = ["Pending", "Sent", "Signed", "Completed", "Cancelled"] as const;
const CONTRACT_STATUS_COLORS: Record<string, string> = {
  Pending: "#eab308",
  Sent: "#3b82f6",
  Signed: "#22c55e",
  Completed: "#F7941D",
  Cancelled: "#ef4444",
};

async function handleStatusChange(newStatus: string) {
  if (!contract) return;
  if (newStatus === contract.status) return;

  // Confirm destructive actions
  if (newStatus === "Completed" && !confirm("Mark this contract as completed? This will add it to Completed Revenue on the dashboard.")) return;
  if (newStatus === "Cancelled" && !confirm("Cancel this contract? This will remove it from sales metrics.")) return;

  setUpdatingStatus(true);
  try {
    const res = await fetch(`/api/admin/contracts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const data = await res.json();
      setContract(data);
    }
  } catch {
    // silent
  } finally {
    setUpdatingStatus(false);
  }
}
```

**Step 2: Replace getStatusBadge with status dropdown**

Replace the `getStatusBadge()` function and its call in the header with a `<select>` dropdown:

```tsx
function renderStatusDropdown() {
  if (!contract) return null;
  const color = CONTRACT_STATUS_COLORS[contract.status] || "#888";
  return (
    <select
      value={contract.status}
      onChange={(e) => handleStatusChange(e.target.value)}
      disabled={updatingStatus}
      style={{
        padding: "0.3rem 0.75rem",
        borderRadius: "4px",
        background: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
        fontSize: "13px",
        fontWeight: 600,
        cursor: updatingStatus ? "wait" : "pointer",
        outline: "none",
        appearance: "auto",
        opacity: updatingStatus ? 0.6 : 1,
      }}
    >
      {CONTRACT_STATUSES.map((s) => (
        <option key={s} value={s} style={{ background: "#111", color: "#fff" }}>
          {s}
        </option>
      ))}
    </select>
  );
}
```

In the header JSX, replace `{getStatusBadge()}` with `{renderStatusDropdown()}`.

**Step 3: Update isSigned logic**

The `isSigned` variable is used to conditionally show/hide buttons. Update it to account for new statuses:

```typescript
const isSigned = contract.status === "Signed" || contract.status === "Completed";
const isCancelled = contract.status === "Cancelled";
```

Use `isCancelled` to hide the "Send to Customer" button as well. The edit button should still work for all non-signed statuses unless cancelled.

**Step 4: Verify** — Check dropdown appears, changes status, confirms on Completed/Cancelled.

**Step 5: Commit**

```bash
git add src/app/admin/contracts/[id]/page.tsx
git commit -m "feat: status dropdown on contract detail page header"
```

---

### Task 9: Update CLAUDE.md, TDD.md, DEVLOG.md

**Files:**
- Modify: `CLAUDE.md` — Add `completed_at` to contracts table schema, update contract statuses description
- Modify: `TDD.md` — Add contract status verification rows
- Modify: `DEVLOG.md` — Add new entry for 2026-03-23

**Step 1: Update all three docs**

**DEVLOG.md** entry:
```markdown
## 2026-03-23 — Contract-Sales Integration

### What was done
- Added explicit `status` column to contracts table (Pending/Sent/Signed/Completed/Cancelled)
- Added `completed_at` column for tracking when contracts are completed
- Migrated existing contracts: status set from sent_at/signed_at timestamps
- Dashboard sales metrics now include contract revenue:
  - Booked Pipeline: inquiry booked_price + contract total_price (status=Signed)
  - Completed Revenue: inquiry completed_price + contract total_price (status=Completed)
  - Average Order: calculated across both completed inquiries and contracts
- Contract list page: 6 filter tabs (All/Pending/Sent/Signed/Completed/Cancelled)
- Contract detail page: status dropdown in header (replaces static badge)
- Auto-transitions: sending → Sent, signing → Signed
- Manual override: admin can change status via dropdown at any time
- Confirmation prompts on Completed and Cancelled status changes

### Decisions
- Contracts and inquiries remain independent (no auto-sync)
- Both contribute to dashboard sales metrics independently
- Contract total_price is the value used for sales metrics
```

**Step 2: Commit all docs + code**

```bash
git add CLAUDE.md TDD.md DEVLOG.md
git commit -m "docs: update CLAUDE.md, TDD.md, DEVLOG.md with contract-sales integration"
```

---

## Verification Checklist

After all tasks are complete:

1. **Database**: Run `SELECT status, completed_at FROM contracts LIMIT 5` — verify columns exist
2. **Create contract**: POST creates with status=Pending
3. **Send contract**: Status auto-changes to Sent
4. **Sign contract**: Status auto-changes to Signed
5. **Dashboard**: Booked Pipeline includes Signed contracts, Completed Revenue includes Completed contracts
6. **Contract list**: All 6 filter tabs work
7. **Contract detail**: Status dropdown changes status, confirms on Completed/Cancelled
8. **Date filter**: Dashboard date filter applies to both inquiries and contracts
9. **Build**: `npx next build` passes without errors
