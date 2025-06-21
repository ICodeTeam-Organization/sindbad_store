export function getRemainingTimeForOffer(endDateString: string): string {
  const endDate = new Date(endDateString);
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();

  if (diff <= 0) {
    return "";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  let result = "";
  if (days > 0) result += `${days} يوم${days > 1 ? "اً" : ""} `;
  if (hours > 0) result += `${hours} ساعة `;
  if (minutes > 0 && days === 0) result += `${minutes} دقيقة`;

  return result.trim();
} 
export function remmainingTime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let timeString = "";

  if (days > 0) {
    timeString += `${days} يوم${days > 1 ? "" : ""} `;
  }
  if (hours > 0) {
    timeString += `${hours} ساعة${hours > 1 ? "" : ""} `;
  }
  if (minutes > 0) {
    timeString += `${minutes} دقيقة${minutes > 1 ? "" : ""} `;
  }
  if (secs > 0 || timeString === "") {
    timeString += `${secs} ثانية${secs > 1 ? "" : ""}`;
  }

  return timeString.trim();
} 
export function convertToArabicDate(dateString: string) {
  // تحويل النص إلى كائن تاريخ
  const date = new Date(dateString);

  // تعريف أسماء الأيام والشهور بالعربية
  const days = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  // استخراج اليوم والشهر والسنة
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  // تنسيق النص النهائي
  return `${dayName}، ${day} ${monthName} ${year}`;
}