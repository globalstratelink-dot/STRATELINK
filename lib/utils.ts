import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Liste des pays avec leurs codes téléphoniques
export const countries = [
  { name: "France", code: "FR", phoneCode: "+33" },
  { name: "United States", code: "US", phoneCode: "+1" },
  { name: "United Kingdom", code: "GB", phoneCode: "+44" },
  { name: "Germany", code: "DE", phoneCode: "+49" },
  { name: "Italy", code: "IT", phoneCode: "+39" },
  { name: "Spain", code: "ES", phoneCode: "+34" },
  { name: "Netherlands", code: "NL", phoneCode: "+31" },
  { name: "Belgium", code: "BE", phoneCode: "+32" },
  { name: "Switzerland", code: "CH", phoneCode: "+41" },
  { name: "Canada", code: "CA", phoneCode: "+1" },
  { name: "Australia", code: "AU", phoneCode: "+61" },
  { name: "Japan", code: "JP", phoneCode: "+81" },
  { name: "China", code: "CN", phoneCode: "+86" },
  { name: "India", code: "IN", phoneCode: "+91" },
  { name: "Brazil", code: "BR", phoneCode: "+55" },
  { name: "Mexico", code: "MX", phoneCode: "+52" },
  { name: "Argentina", code: "AR", phoneCode: "+54" },
  { name: "South Africa", code: "ZA", phoneCode: "+27" },
  { name: "Egypt", code: "EG", phoneCode: "+20" },
  { name: "Morocco", code: "MA", phoneCode: "+212" },
  { name: "Algeria", code: "DZ", phoneCode: "+213" },
  { name: "Tunisia", code: "TN", phoneCode: "+216" },
  { name: "Turkey", code: "TR", phoneCode: "+90" },
  { name: "Russia", code: "RU", phoneCode: "+7" },
  { name: "South Korea", code: "KR", phoneCode: "+82" },
  { name: "Singapore", code: "SG", phoneCode: "+65" },
  { name: "Thailand", code: "TH", phoneCode: "+66" },
  { name: "Malaysia", code: "MY", phoneCode: "+60" },
  { name: "Indonesia", code: "ID", phoneCode: "+62" },
  { name: "Philippines", code: "PH", phoneCode: "+63" },
  { name: "Vietnam", code: "VN", phoneCode: "+84" },
  { name: "United Arab Emirates", code: "AE", phoneCode: "+971" },
  { name: "Saudi Arabia", code: "SA", phoneCode: "+966" },
  { name: "Qatar", code: "QA", phoneCode: "+974" },
  { name: "Kuwait", code: "KW", phoneCode: "+965" },
  { name: "Bahrain", code: "BH", phoneCode: "+973" },
  { name: "Oman", code: "OM", phoneCode: "+968" },
  { name: "Jordan", code: "JO", phoneCode: "+962" },
  { name: "Lebanon", code: "LB", phoneCode: "+961" },
  { name: "Israel", code: "IL", phoneCode: "+972" },
  { name: "Nigeria", code: "NG", phoneCode: "+234" },
  { name: "Kenya", code: "KE", phoneCode: "+254" },
  { name: "Ghana", code: "GH", phoneCode: "+233" },
  { name: "Senegal", code: "SN", phoneCode: "+221" },
  { name: "Ivory Coast", code: "CI", phoneCode: "+225" },
  { name: "Cameroon", code: "CM", phoneCode: "+237" },
  { name: "Ethiopia", code: "ET", phoneCode: "+251" },
  { name: "Tanzania", code: "TZ", phoneCode: "+255" },
  { name: "Uganda", code: "UG", phoneCode: "+256" },
  { name: "Rwanda", code: "RW", phoneCode: "+250" },
  { name: "Other", code: "OTHER", phoneCode: "+" }
]

// Fonction pour obtenir le code téléphonique d'un pays
export function getPhoneCode(countryCode: string): string {
  const country = countries.find(c => c.code === countryCode)
  return country ? country.phoneCode : "+"
}

// Fonction pour obtenir le nom du pays
export function getCountryName(countryCode: string): string {
  const country = countries.find(c => c.code === countryCode)
  return country ? country.name : "Unknown"
}
