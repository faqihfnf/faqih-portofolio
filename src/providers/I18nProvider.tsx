"use client";
import i18n from "@/lib/i18n";
import React, { FC, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

interface I18nProviderProps {
  children: ReactNode;
}

const I18nProvider: FC<I18nProviderProps> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n} defaultNS={"translation"}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;
