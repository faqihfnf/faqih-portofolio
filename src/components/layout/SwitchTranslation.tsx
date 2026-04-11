import useLang from "@/hooks/useLang";

export default function SwitchTranslation() {
  const { changeLanguage, lang } = useLang();

  return (
    <button onClick={() => changeLanguage(lang === "id" ? "en" : "id")} className=" font-semibold hover:text-indigo-500 transition-colors cursor-pointer px-2">
      {lang === "id" ? "ID" : "EN"}
    </button>
  );
}
