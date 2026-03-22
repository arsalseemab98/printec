import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";

export interface ContractPDFProps {
  contract_number: string;
  event_date: string | null;
  venue: string | null;
  service_description: string | null;
  total_price: number;
  advance_amount: number;
  balance_amount: number;
  balance_due: string | null;
  travel_cost: number;
  client_name: string;
  client_email: string;
  terms: string[];
  signature_data: string | null;
  signed_at: string | null;
  logoUrl?: string;
}

const ORANGE = "#F7941D";
const DARK = "#0C0C0C";
const DARK_CARD = "#161616";
const WHITE = "#FFFFFF";
const GREY = "#999999";
const LIGHT_GREY = "#CCCCCC";

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(d: string | null) {
  if (!d) return "\u2014";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const s = StyleSheet.create({
  page: { padding: 0, fontFamily: "Helvetica", fontSize: 10, color: WHITE, backgroundColor: DARK },
  accentBar: { height: 4, backgroundColor: ORANGE },
  banner: { backgroundColor: DARK_CARD, padding: "32 48 24 48", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", borderBottomWidth: 3, borderBottomColor: ORANGE },
  logo: { width: 120, height: 48 },
  companyName: { fontSize: 20, fontFamily: "Helvetica-Bold", color: ORANGE, letterSpacing: 2 },
  companyText: { fontSize: 8, color: GREY, marginTop: 2 },
  companyHighlight: { fontSize: 8, color: ORANGE, marginTop: 2 },
  titleSection: { padding: "28 48 20 48", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  title: { fontSize: 28, fontFamily: "Helvetica-Bold", color: WHITE, letterSpacing: 4 },
  meta: { alignItems: "flex-end" as const },
  metaNumber: { fontSize: 12, fontFamily: "Helvetica-Bold", color: ORANGE },
  metaDate: { fontSize: 9, color: GREY, marginTop: 3 },
  divider: { height: 1, backgroundColor: "#222", marginHorizontal: 48 },
  orangeLine: { height: 2, backgroundColor: ORANGE, width: 50, marginLeft: 48 },
  infoRow: { flexDirection: "row", padding: "20 48", gap: 30 },
  infoCol: { flex: 1 },
  sectionLabel: { fontSize: 8, fontFamily: "Helvetica-Bold", color: ORANGE, textTransform: "uppercase" as const, letterSpacing: 3, marginBottom: 8 },
  infoBox: { backgroundColor: DARK_CARD, padding: 14, borderRadius: 4, borderLeftWidth: 3, borderLeftColor: ORANGE },
  infoBold: { fontSize: 11, fontFamily: "Helvetica-Bold", color: WHITE, marginBottom: 3 },
  infoText: { fontSize: 9, color: LIGHT_GREY, marginBottom: 2, lineHeight: 1.5 },
  termsSection: { paddingHorizontal: 48, paddingTop: 16 },
  termRow: { flexDirection: "row", marginBottom: 8 },
  termNum: { width: 24, fontSize: 9, fontFamily: "Helvetica-Bold", color: ORANGE },
  termText: { flex: 1, fontSize: 9, color: LIGHT_GREY, lineHeight: 1.6 },
  sigSection: { padding: "20 48", flexDirection: "row", justifyContent: "space-between" },
  sigCol: { width: "45%" },
  sigLabel: { fontSize: 8, color: GREY, marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: 1 },
  sigName: { fontSize: 11, fontFamily: "Helvetica-Bold", color: WHITE, marginBottom: 4 },
  sigRole: { fontSize: 9, color: GREY },
  sigImage: { width: 150, height: 60, marginBottom: 4 },
  sigLine: { height: 1, backgroundColor: "#444", marginBottom: 4, marginTop: 8 },
  footer: { marginTop: "auto", backgroundColor: DARK_CARD, padding: "16 48", borderTopWidth: 1, borderTopColor: "#222", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  footerBold: { fontSize: 8, fontFamily: "Helvetica-Bold", color: ORANGE, letterSpacing: 1 },
  footerText: { fontSize: 7, color: GREY },
});

export function ContractPDF(props: ContractPDFProps) {
  const { contract_number, event_date, venue, service_description, total_price, advance_amount, balance_amount, balance_due, travel_cost, client_name, client_email, terms, signature_data, signed_at, logoUrl } = props;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.accentBar} />
        <View style={s.banner}>
          {logoUrl ? <Image src={logoUrl} style={s.logo} /> : <Text style={s.companyName}>PRINTEC</Text>}
          <View style={{ alignItems: "flex-end" as const }}>
            <Text style={s.companyHighlight}>Printec Virginia LLC</Text>
            <Text style={s.companyText}>15485 Marsh Overlook Dr</Text>
            <Text style={s.companyText}>Woodbridge, VA 22191</Text>
            <Text style={s.companyText}>(715) 503-5444</Text>
            <Text style={s.companyHighlight}>info@printecwrap.com</Text>
          </View>
        </View>

        <View style={s.titleSection}>
          <View>
            <Text style={s.title}>CLIENT AGREEMENT</Text>
            <View style={s.orangeLine} />
          </View>
          <View style={s.meta}>
            <Text style={s.metaNumber}>{contract_number}</Text>
            <Text style={s.metaDate}>Event: {fmtDate(event_date)}</Text>
          </View>
        </View>

        {venue && (
          <View style={{ paddingHorizontal: 48, marginBottom: 8 }}>
            <Text style={{ fontSize: 9, color: GREY }}>Venue: <Text style={{ color: LIGHT_GREY }}>{venue}</Text></Text>
          </View>
        )}

        <View style={s.divider} />

        <View style={s.infoRow}>
          <View style={s.infoCol}>
            <Text style={s.sectionLabel}>Client</Text>
            <View style={s.infoBox}>
              <Text style={s.infoBold}>{client_name}</Text>
              <Text style={s.infoText}>{client_email}</Text>
            </View>
          </View>
          <View style={s.infoCol}>
            <Text style={s.sectionLabel}>Pricing</Text>
            <View style={s.infoBox}>
              <Text style={s.infoBold}>Total: {fmt(total_price)}</Text>
              <Text style={s.infoText}>Advance: {fmt(advance_amount)}</Text>
              <Text style={s.infoText}>Balance: {fmt(balance_amount)} — {balance_due || "Due on event day"}</Text>
              {travel_cost > 0 && <Text style={s.infoText}>Travel: {fmt(travel_cost)}</Text>}
            </View>
          </View>
        </View>

        <View style={s.termsSection}>
          <Text style={s.sectionLabel}>Terms & Conditions</Text>
          {(terms || []).map((term: string, i: number) => (
            <View key={i} style={s.termRow}>
              <Text style={s.termNum}>{i + 1}.</Text>
              <Text style={s.termText}>{term}</Text>
            </View>
          ))}
        </View>

        <View style={s.sigSection}>
          <View style={s.sigCol}>
            <Text style={s.sectionLabel}>Client</Text>
            <Text style={s.sigName}>{client_name}</Text>
            {signature_data ? <Image src={signature_data} style={s.sigImage} /> : <View style={s.sigLine} />}
            <Text style={s.sigLabel}>Signature</Text>
            {signed_at && <Text style={s.sigRole}>Date: {fmtDate(signed_at)}</Text>}
          </View>
          <View style={s.sigCol}>
            <Text style={s.sectionLabel}>Provider</Text>
            <Text style={s.sigName}>Printec Virginia LLC</Text>
            <Text style={s.sigRole}>Muhammad Azhar</Text>
            <Text style={s.sigRole}>CEO / Founder</Text>
          </View>
        </View>

        <View style={s.footer}>
          <View>
            <Text style={s.footerBold}>PRINTEC VIRGINIA LLC</Text>
            <Text style={s.footerText}>From Vision to Vinyl</Text>
          </View>
          <View style={{ alignItems: "flex-end" as const }}>
            <Text style={s.footerText}>15485 Marsh Overlook Dr, Woodbridge, VA 22191</Text>
            <Text style={s.footerText}>(715) 503-5444 | printecwrap.com</Text>
          </View>
        </View>
        <View style={s.accentBar} />
      </Page>
    </Document>
  );
}
