import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

/* ── Types ── */
export interface QuotePDFProps {
  quote_number: string;
  items: { description: string; price: number }[];
  total: number;
  notes: string | null;
  created_at: string;
  customer: {
    name: string;
    email: string;
    phone: string | null;
    service: string | null;
  };
}

/* ── Helpers ── */
function fmt(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Styles ── */
const s = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#222",
    backgroundColor: "#fff",
  },
  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#F7941D",
  },
  companyName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#F7941D",
    letterSpacing: 2,
  },
  companyDetail: {
    fontSize: 9,
    color: "#555",
    marginTop: 2,
  },
  /* Quote title */
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  quoteTitle: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: "#111",
    letterSpacing: 3,
  },
  quoteNumber: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#F7941D",
  },
  quoteDate: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
  },
  /* Customer */
  sectionLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#F7941D",
    textTransform: "uppercase" as const,
    letterSpacing: 2,
    marginBottom: 8,
  },
  customerBox: {
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 4,
    marginBottom: 24,
  },
  customerLine: {
    fontSize: 10,
    color: "#333",
    marginBottom: 3,
  },
  /* Table */
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#111",
    padding: "8 12",
    borderRadius: 2,
  },
  tableHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: "#fff",
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
  tableRow: {
    flexDirection: "row",
    padding: "10 12",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableRowAlt: {
    backgroundColor: "#fafafa",
  },
  colNum: { width: "8%" },
  colDesc: { width: "68%" },
  colPrice: { width: "24%", textAlign: "right" as const },
  /* Total */
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#F7941D",
  },
  totalLabel: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#111",
    marginRight: 24,
  },
  totalValue: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#F7941D",
  },
  /* Notes */
  notesBox: {
    marginTop: 28,
    padding: 14,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
  notesText: {
    fontSize: 10,
    color: "#444",
    lineHeight: 1.6,
  },
  /* Footer */
  footer: {
    marginTop: "auto",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    textAlign: "center" as const,
  },
  footerText: {
    fontSize: 9,
    color: "#888",
  },
  footerBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#F7941D",
  },
});

/* ── Document ── */
export function QuotePDF(props: QuotePDFProps) {
  const { quote_number, items, total, notes, created_at, customer } = props;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* ── Header ── */}
        <View style={s.header}>
          <View>
            <Text style={s.companyName}>PRINTEC CORP</Text>
            <Text style={s.companyDetail}>1234 Commerce Drive</Text>
            <Text style={s.companyDetail}>Virginia Beach, VA 23456</Text>
          </View>
          <View style={{ alignItems: "flex-end" as const }}>
            <Text style={s.companyDetail}>(555) 123-4567</Text>
            <Text style={s.companyDetail}>info@printecwrap.com</Text>
            <Text style={s.companyDetail}>printecwrap.com</Text>
          </View>
        </View>

        {/* ── Title row ── */}
        <View style={s.titleRow}>
          <Text style={s.quoteTitle}>QUOTE</Text>
          <View style={{ alignItems: "flex-end" as const }}>
            <Text style={s.quoteNumber}>{quote_number}</Text>
            <Text style={s.quoteDate}>{fmtDate(created_at)}</Text>
          </View>
        </View>

        {/* ── Customer info ── */}
        <Text style={s.sectionLabel}>Customer</Text>
        <View style={s.customerBox}>
          <Text style={s.customerLine}>{customer.name}</Text>
          <Text style={s.customerLine}>{customer.email}</Text>
          {customer.phone && (
            <Text style={s.customerLine}>{customer.phone}</Text>
          )}
          {customer.service && (
            <Text style={s.customerLine}>
              Service requested: {customer.service}
            </Text>
          )}
        </View>

        {/* ── Items table ── */}
        <Text style={s.sectionLabel}>Line Items</Text>
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderText, s.colNum]}>#</Text>
          <Text style={[s.tableHeaderText, s.colDesc]}>Description</Text>
          <Text style={[s.tableHeaderText, s.colPrice]}>Price</Text>
        </View>
        {items.map((item, i) => (
          <View
            key={i}
            style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}
          >
            <Text style={s.colNum}>{i + 1}</Text>
            <Text style={s.colDesc}>{item.description}</Text>
            <Text style={s.colPrice}>{fmt(item.price)}</Text>
          </View>
        ))}

        {/* ── Total ── */}
        <View style={s.totalRow}>
          <Text style={s.totalLabel}>Total</Text>
          <Text style={s.totalValue}>{fmt(total)}</Text>
        </View>

        {/* ── Notes ── */}
        {notes ? (
          <View style={s.notesBox}>
            <Text style={s.sectionLabel}>Notes</Text>
            <Text style={s.notesText}>{notes}</Text>
          </View>
        ) : null}

        {/* ── Footer ── */}
        <View style={s.footer}>
          <Text style={s.footerBold}>
            Thank you for choosing Printec Corp!
          </Text>
          <Text style={s.footerText}>
            This quote is valid for 30 days from the date above.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
