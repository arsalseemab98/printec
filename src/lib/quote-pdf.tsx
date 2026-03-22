import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

/* ── Types ── */
export interface QuotePDFProps {
  quote_number: string;
  items: { description: string; price: number }[];
  total: number;
  notes: string | null;
  created_at: string;
  logoUrl?: string;
  customer: {
    name: string;
    email: string;
    phone: string | null;
    service: string | null;
  };
}

/* ── Colors ── */
const ORANGE = "#F7941D";
const DARK = "#0C0C0C";
const DARK_CARD = "#161616";
const DARK_BORDER = "#222222";
const WHITE = "#FFFFFF";
const GREY = "#999999";
const LIGHT_GREY = "#CCCCCC";

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
    padding: 0,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: WHITE,
    backgroundColor: DARK,
  },

  /* ── Top Banner ── */
  banner: {
    backgroundColor: DARK_CARD,
    padding: "36 48 28 48",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 3,
    borderBottomColor: ORANGE,
  },
  logo: {
    width: 140,
    height: 56,
  },
  companyName: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: ORANGE,
    letterSpacing: 3,
  },
  companyInfo: {
    alignItems: "flex-end" as const,
  },
  companyText: {
    fontSize: 8,
    color: GREY,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  companyHighlight: {
    fontSize: 8,
    color: ORANGE,
    marginBottom: 2,
    letterSpacing: 0.5,
  },

  /* ── Quote Title Section ── */
  titleSection: {
    padding: "32 48 24 48",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  quoteTitle: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
    letterSpacing: 6,
  },
  quoteMeta: {
    alignItems: "flex-end" as const,
  },
  quoteNumber: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: ORANGE,
    letterSpacing: 1,
  },
  quoteDate: {
    fontSize: 9,
    color: GREY,
    marginTop: 4,
  },

  /* ── Divider ── */
  divider: {
    height: 1,
    backgroundColor: DARK_BORDER,
    marginHorizontal: 48,
  },
  orangeDivider: {
    height: 2,
    backgroundColor: ORANGE,
    width: 60,
    marginLeft: 48,
    marginTop: 0,
  },

  /* ── Customer & Prepared By ── */
  infoRow: {
    flexDirection: "row",
    padding: "24 48",
    gap: 40,
  },
  infoCol: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: ORANGE,
    textTransform: "uppercase" as const,
    letterSpacing: 3,
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: DARK_CARD,
    padding: 16,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: ORANGE,
  },
  infoText: {
    fontSize: 10,
    color: LIGHT_GREY,
    marginBottom: 3,
    lineHeight: 1.5,
  },
  infoBold: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
    marginBottom: 4,
  },

  /* ── Table ── */
  tableSection: {
    paddingHorizontal: 48,
    paddingTop: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: ORANGE,
    padding: "10 16",
    borderRadius: 3,
    marginBottom: 2,
  },
  tableHeaderText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: DARK,
    textTransform: "uppercase" as const,
    letterSpacing: 1.5,
  },
  tableRow: {
    flexDirection: "row",
    padding: "12 16",
    borderBottomWidth: 1,
    borderBottomColor: DARK_BORDER,
  },
  tableRowAlt: {
    backgroundColor: DARK_CARD,
  },
  colNum: { width: "8%" },
  colDesc: { width: "64%" },
  colPrice: { width: "28%", textAlign: "right" as const },
  itemNum: {
    fontSize: 9,
    color: GREY,
  },
  itemDesc: {
    fontSize: 10,
    color: LIGHT_GREY,
  },
  itemPrice: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
  },

  /* ── Total ── */
  totalSection: {
    paddingHorizontal: 48,
    marginTop: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: DARK_CARD,
    padding: "14 20",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: ORANGE,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: GREY,
    letterSpacing: 2,
    textTransform: "uppercase" as const,
    marginRight: 24,
  },
  totalValue: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: ORANGE,
  },

  /* ── Notes ── */
  notesSection: {
    marginHorizontal: 48,
    marginTop: 20,
    padding: 16,
    backgroundColor: DARK_CARD,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: DARK_BORDER,
  },
  notesText: {
    fontSize: 9,
    color: GREY,
    lineHeight: 1.7,
  },

  /* ── Footer ── */
  footer: {
    marginTop: "auto",
    backgroundColor: DARK_CARD,
    padding: "20 48",
    borderTopWidth: 1,
    borderTopColor: DARK_BORDER,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {},
  footerText: {
    fontSize: 8,
    color: GREY,
    letterSpacing: 0.5,
  },
  footerBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: ORANGE,
    letterSpacing: 1,
  },
  footerRight: {
    alignItems: "flex-end" as const,
  },
  footerValidity: {
    fontSize: 7,
    color: GREY,
    marginTop: 4,
  },

  /* ── Accent Bar ── */
  accentBar: {
    height: 4,
    backgroundColor: ORANGE,
  },
});

/* ── Document ── */
export function QuotePDF(props: QuotePDFProps) {
  const { quote_number, items, total, notes, created_at, customer, logoUrl } = props;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* ── Orange accent bar at top ── */}
        <View style={s.accentBar} />

        {/* ── Header with Logo ── */}
        <View style={s.banner}>
          {logoUrl ? (
            <Image src={logoUrl} style={s.logo} />
          ) : (
            <Text style={s.companyName}>PRINTEC CORP</Text>
          )}
          <View style={s.companyInfo}>
            <Text style={s.companyHighlight}>PRINTEC CORP</Text>
            <Text style={s.companyText}>1234 Commerce Drive</Text>
            <Text style={s.companyText}>Virginia Beach, VA 23456</Text>
            <Text style={s.companyText}>(555) 123-4567</Text>
            <Text style={s.companyHighlight}>info@printecwrap.com</Text>
            <Text style={s.companyText}>printecwrap.com</Text>
          </View>
        </View>

        {/* ── Quote Title ── */}
        <View style={s.titleSection}>
          <View>
            <Text style={s.quoteTitle}>QUOTE</Text>
            <View style={s.orangeDivider} />
          </View>
          <View style={s.quoteMeta}>
            <Text style={s.quoteNumber}>{quote_number}</Text>
            <Text style={s.quoteDate}>{fmtDate(created_at)}</Text>
          </View>
        </View>

        <View style={s.divider} />

        {/* ── Customer & Prepared By ── */}
        <View style={s.infoRow}>
          <View style={s.infoCol}>
            <Text style={s.sectionLabel}>Prepared For</Text>
            <View style={s.infoBox}>
              <Text style={s.infoBold}>{customer.name}</Text>
              <Text style={s.infoText}>{customer.email}</Text>
              {customer.phone && <Text style={s.infoText}>{customer.phone}</Text>}
              {customer.service && (
                <Text style={s.infoText}>Service: {customer.service}</Text>
              )}
            </View>
          </View>
          <View style={s.infoCol}>
            <Text style={s.sectionLabel}>Prepared By</Text>
            <View style={s.infoBox}>
              <Text style={s.infoBold}>Printec Corp</Text>
              <Text style={s.infoText}>Signs, Wraps & Graphics</Text>
              <Text style={s.infoText}>Virginia Beach, VA</Text>
              <Text style={s.infoText}>info@printecwrap.com</Text>
            </View>
          </View>
        </View>

        {/* ── Items Table ── */}
        <View style={s.tableSection}>
          <Text style={s.sectionLabel}>Services & Pricing</Text>
          <View style={s.tableHeader}>
            <Text style={[s.tableHeaderText, s.colNum]}>#</Text>
            <Text style={[s.tableHeaderText, s.colDesc]}>Description</Text>
            <Text style={[s.tableHeaderText, s.colPrice]}>Amount</Text>
          </View>
          {items.map((item, i) => (
            <View
              key={i}
              style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}
            >
              <Text style={[s.itemNum, s.colNum]}>{String(i + 1).padStart(2, "0")}</Text>
              <Text style={[s.itemDesc, s.colDesc]}>{item.description}</Text>
              <Text style={[s.itemPrice, s.colPrice]}>{fmt(item.price)}</Text>
            </View>
          ))}
        </View>

        {/* ── Total ── */}
        <View style={s.totalSection}>
          <View style={s.totalRow}>
            <Text style={s.totalLabel}>Total</Text>
            <Text style={s.totalValue}>{fmt(total)}</Text>
          </View>
        </View>

        {/* ── Notes ── */}
        {notes ? (
          <View style={s.notesSection}>
            <Text style={s.sectionLabel}>Terms & Notes</Text>
            <Text style={s.notesText}>{notes}</Text>
          </View>
        ) : null}

        {/* ── Footer ── */}
        <View style={s.footer}>
          <View style={s.footerLeft}>
            <Text style={s.footerBold}>PRINTEC CORP</Text>
            <Text style={s.footerText}>From Vision to Vinyl</Text>
          </View>
          <View style={s.footerRight}>
            <Text style={s.footerBold}>Thank you for choosing Printec!</Text>
            <Text style={s.footerValidity}>
              This quote is valid for 30 days from {fmtDate(created_at)}.
            </Text>
          </View>
        </View>

        {/* ── Bottom accent bar ── */}
        <View style={s.accentBar} />
      </Page>
    </Document>
  );
}
