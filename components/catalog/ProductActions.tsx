"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, FileText } from "lucide-react";
import Modal from "@/components/ui/Modal";
import LeadForm from "@/components/forms/LeadForm";
import CallbackForm from "@/components/forms/CallbackForm";

interface ProductActionsProps {
  productId: string;
  productName: string;
  locale: string;
}

export default function ProductActions({ productId, productName, locale }: ProductActionsProps) {
  const t = useTranslations("product");
  const tLead = useTranslations("lead_form");
  const tCallback = useTranslations("callback_form");
  const [leadOpen, setLeadOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
        <button onClick={() => setLeadOpen(true)} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FileText size={16} />
          {t("request_cta")}
        </button>
        <button onClick={() => setCallbackOpen(true)} className="btn-outline" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Phone size={16} />
          {t("callback_cta")}
        </button>
      </div>

      <Modal open={leadOpen} onClose={() => setLeadOpen(false)} title={tLead("title")}>
        <LeadForm productId={productId} productName={productName} onSuccess={() => setLeadOpen(false)} />
      </Modal>

      <Modal open={callbackOpen} onClose={() => setCallbackOpen(false)} title={tCallback("title")}>
        <CallbackForm onSuccess={() => setCallbackOpen(false)} />
      </Modal>
    </>
  );
}
