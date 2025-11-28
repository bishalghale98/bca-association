export function getInitials(name?: string | null) {
  if (!name) return "U"; 

  const parts = name.trim().split(" ");

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase(); // B
  }

  // For 2+ names → Bishal Ghale → BG
  const first = parts[0].charAt(0).toUpperCase();
  const last = parts[parts.length - 1].charAt(0).toUpperCase();

  return `${first}${last}`;
}
