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