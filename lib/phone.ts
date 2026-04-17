/** Strip all non-digit characters from a phone string */
export function toDialable(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

const WA_NUMBER = "77018794776";

const WA_MESSAGES: Record<string, string> = {
  ru: "Привет, я хотел узнать насчет наличия товаров",
  kz: "Сәлем, тауарлардың бар-жоғын білгім келеді",
  en: "Hello, I'd like to ask about product availability",
};

export function whatsappLink(locale = "ru"): string {
  const text = encodeURIComponent(WA_MESSAGES[locale] ?? WA_MESSAGES.ru);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}
