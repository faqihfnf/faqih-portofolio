import React, { FC } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import useLang from "@/hooks/useLang";

interface SwitchTranslationProps {}

const SwitchTranslation: FC<SwitchTranslationProps> = ({}) => {
  const { changeLanguage, lang } = useLang();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:bg-transparent dark:hover:bg-transparent cursor-pointer hover:text-indigo-500">
        <Languages className="" size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 mt-3">
        <DropdownMenuLabel>{t("select-lang")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => changeLanguage("id")} className={lang === "id" ? " text-indigo-500 cursor-pointer" : "cursor-pointer"}>
          Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")} className={lang === "en" ? " text-indigo-500 cursor-pointer" : "cursor-pointer"}>
          Inggris
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchTranslation;
