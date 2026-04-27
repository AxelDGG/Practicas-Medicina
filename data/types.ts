export type LocaleString = { es: string; en: string };

export type Question = {
  id: string;
  topic: string;
  prompt: LocaleString;
  options: LocaleString[]; // exactly 4
  answerIndex: number;
  explanation: LocaleString;
};
