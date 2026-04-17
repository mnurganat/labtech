import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyAoViWrtVm45ZNU0Wj04Qe33Vk7wVc_-Kc",
  projectId: "maulsharif-landing",
});
const db = getFirestore(app);

const brands = [
  { id: "philips",   name: "Philips",             country: "Нидерланды", flag: "🇳🇱", order: 1,  specialties: ["УЗИ", "МРТ", "КТ", "Мониторинг"] },
  { id: "siemens",   name: "Siemens Healthineers", country: "Германия",   flag: "🇩🇪", order: 2,  specialties: ["МРТ", "КТ", "Рентген", "Лаборатория"] },
  { id: "ge",        name: "GE HealthCare",        country: "США",        flag: "🇺🇸", order: 3,  specialties: ["УЗИ", "МРТ", "КТ", "Диагностика"] },
  { id: "samsung",   name: "Samsung Medison",      country: "Южная Корея",flag: "🇰🇷", order: 4,  specialties: ["УЗИ"] },
  { id: "canon",     name: "Canon Medical",        country: "Япония",     flag: "🇯🇵", order: 5,  specialties: ["КТ", "МРТ", "Рентген", "УЗИ"] },
  { id: "schiller",  name: "Schiller",             country: "Швейцария",  flag: "🇨🇭", order: 6,  specialties: ["Кардиология", "Диагностика"] },
  { id: "sysmex",    name: "Sysmex",               country: "Япония",     flag: "🇯🇵", order: 7,  specialties: ["Лаборатория", "Гематология"] },
  { id: "beckman",   name: "Beckman Coulter",      country: "США",        flag: "🇺🇸", order: 8,  specialties: ["Лаборатория", "Биохимия"] },
  { id: "esaote",    name: "Esaote",               country: "Италия",     flag: "🇮🇹", order: 9,  specialties: ["УЗИ", "МРТ"] },
  { id: "mindray",   name: "Mindray",              country: "Китай",      flag: "🇨🇳", order: 10, specialties: ["УЗИ", "Мониторинг", "Лаборатория"] },
  { id: "toshiba",   name: "Toshiba (Canon)",      country: "Япония",     flag: "🇯🇵", order: 11, specialties: ["КТ", "МРТ", "УЗИ"] },
  { id: "drager",    name: "Dräger",               country: "Германия",   flag: "🇩🇪", order: 12, specialties: ["Реанимация", "Анестезия"] },
];

const batch = writeBatch(db);
for (const b of brands) batch.set(doc(db, "brands", b.id), b);
await batch.commit();
console.log(`✓ ${brands.length} brands updated`);
process.exit(0);
