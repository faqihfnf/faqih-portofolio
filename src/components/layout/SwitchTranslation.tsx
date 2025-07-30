import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import useLang from "@/hooks/useLang";

interface SwitchTranslationProps {}

const SwitchTranslation: FC<SwitchTranslationProps> = ({}) => {
  const { changeLanguage, lang } = useLang();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={`hover:bg-transparent dark:hover:bg-transparent cursor-pointer hover:text-indigo-500`}>
        <Button variant="ghost" size="icon" className="font-semibold">
          <Globe className="font-semibold" size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("select-lang")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => changeLanguage("id")}
          className={
            lang === "id" ? " text-indigo-500 cursor-pointer" : "cursor-pointer"
          }>
          Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage("en")}
          className={
            lang === "en" ? " text-indigo-500 cursor-pointer" : "cursor-pointer"
          }>
          Inggris
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SwitchTranslation;
