import { siteConfig } from '../config/siteConfig.js';

/**
 * Format phone number for WhatsApp wa.me link
 * Removes +, spaces, dashes, parentheses
 */
export function cleanPhoneNumber(phone) {
  if (!phone) return "917838966576";
  return phone.replace(/[^0-9]/g, "");
}

/**
 * Generate WhatsApp URL
 */
export function createWhatsAppUrl(message, phone = siteConfig.whatsappNumber) {
  const cleanPhone = cleanPhoneNumber(phone);
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Open WhatsApp link in new tab / app
 */
export function openWhatsApp(message, phone = siteConfig.whatsappNumber) {
  const url = createWhatsAppUrl(message, phone);
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Format cart items and customer details into a professional WhatsApp enquiry message
 */
export function formatCartEnquiryMessage({ items, customer }) {
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  let lines = [
    `🥊 *FIGHTER FORGE — ARENA EQUIPMENT ENQUIRY*`,
    `Date: ${dateStr}`,
    `----------------------------------------`,
    `Hello Fighter Forge, I would like an official factory quotation for the following arena equipment:`,
    ``
  ];

  items.forEach((item, index) => {
    lines.push(`*${index + 1}) ${item.name.toUpperCase()}*`);
    if (item.selectedSize) {
      lines.push(`   • Size: ${item.selectedSize}`);
    }
    if (item.selectedHeight) {
      lines.push(`   • Elevation: ${item.selectedHeight}`);
    } else if (item.elevationType) {
      lines.push(`   • Elevation: ${item.elevationType}`);
    }
    if (item.selectedShape) {
      lines.push(`   • Shape: ${item.selectedShape}`);
    }
    lines.push(`   • Quantity: ${item.quantity || 1}`);
    if (item.priceNumeric && item.priceNumeric > 0) {
      const formattedPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }).format(item.priceNumeric * (item.quantity || 1));
      lines.push(`   • Estimated Value: ${formattedPrice}`);
    } else {
      lines.push(`   • Price: Quote on WhatsApp`);
    }
    lines.push(``);
  });

  lines.push(`----------------------------------------`);
  lines.push(`*CUSTOMER & VENUE DETAILS:*`);
  lines.push(`• Name: ${customer.name || "Not provided"}`);
  lines.push(`• Phone: ${customer.phone || "Not provided"}`);
  lines.push(`• City / Location: ${customer.city || "Not provided"}`);
  if (customer.notes && customer.notes.trim()) {
    lines.push(`• Specific Requirements / Notes: ${customer.notes.trim()}`);
  }
  lines.push(`----------------------------------------`);
  lines.push(`Please share factory pricing, delivery lead time, and installation details.`);
  lines.push(`*BUILT FOR CHAMPIONS.*`);

  return lines.join("\n");
}

/**
 * Format custom build specifications into WhatsApp message
 */
export function formatCustomEnquiryMessage({ customData, customer, uploadedUrls = [] }) {
  const isRing = customData.type === "ring";
  const typeLabel = isRing ? "CUSTOM BOXING RING" : "CUSTOM MMA CAGE";

  let lines = [
    `🔨 *FIGHTER FORGE — CUSTOM BUILD SPECIFICATIONS*`,
    `Equipment: *${typeLabel}*`,
    `----------------------------------------`,
    `Hello Fighter Forge, I want a custom-built arena manufactured to our specifications:`,
    ``
  ];

  if (isRing) {
    lines.push(`*RING SPECIFICATIONS:*`);
    lines.push(`• Elevation Type: ${customData.elevation || "Floor / 1-2 ft / 3 ft Pro"}`);
    lines.push(`• Dimensions / Size: ${customData.size || "Custom"}`);
    lines.push(`• Rope Configuration: ${customData.ropeColors || "Standard"}`);
    lines.push(`• Canvas / Mat Color: ${customData.canvasColor || "Black"}`);
    lines.push(`• Corner Pads Color: ${customData.cornerPadsColor || "Custom"}`);
    lines.push(`• Gym Logo Branding on Mat/Pads: ${customData.branding ? "YES (Logo attached)" : "NO"}`);
    lines.push(`• Quantity: ${customData.quantity || 1}`);
  } else {
    lines.push(`*MMA CAGE SPECIFICATIONS:*`);
    lines.push(`• Cage Geometry: ${customData.shape || "Octagon"}`);
    lines.push(`• Diameter / Footprint: ${customData.diameter || "20 ft Diameter"}`);
    lines.push(`• Elevation Type: ${customData.elevation || "Floor-Level / Elevated"}`);
    lines.push(`• Fence Height: ${customData.fenceHeight || "6 ft Standard"}`);
    lines.push(`• Number of Doors: ${customData.doors || "1 Door"}`);
    lines.push(`• Padding & Post Bumpers: ${customData.paddingColor || "Black"}`);
    lines.push(`• Mat Color & Center Logo: ${customData.branding ? "YES (Logo attached)" : "NO"}`);
    lines.push(`• Steps / Stairs Included: ${customData.stairs ? "YES" : "NO"}`);
    lines.push(`• Quantity: ${customData.quantity || 1}`);
  }

  if (customData.additionalNotes && customData.additionalNotes.trim()) {
    lines.push(``);
    lines.push(`*ADDITIONAL GYM / VENUE NOTES:*`);
    lines.push(`${customData.additionalNotes.trim()}`);
  }

  if (uploadedUrls && uploadedUrls.length > 0) {
    lines.push(``);
    lines.push(`*ATTACHED REFERENCE PHOTOS & LOGO LINKS:*`);
    uploadedUrls.forEach((url, i) => {
      lines.push(`• Photo ${i + 1}: ${url}`);
    });
  }

  lines.push(``);
  lines.push(`----------------------------------------`);
  lines.push(`*CLIENT CONTACT:*`);
  lines.push(`• Name: ${customer.name || "Not provided"}`);
  lines.push(`• Phone: ${customer.phone || "Not provided"}`);
  lines.push(`• City / State: ${customer.city || "Not provided"}`);
  lines.push(`----------------------------------------`);
  lines.push(`Please review these specs and send an engineered quote on WhatsApp.`);
  lines.push(`*DISCIPLINE BUILDS CHAMPIONS.*`);

  return lines.join("\n");
}

/**
 * Standard greeting for floating WhatsApp button
 */
export function getFloatingWhatsAppGreeting() {
  return `Hello Fighter Forge, I'm looking for a premium Boxing Ring / MMA Cage for my gym/event. Please share catalog, sizing advice, and pricing details.`;
}

/**
 * Gear idea message
 */
export function formatGearIdeaMessage({ gearCategory, name, phone, city, idea }) {
  return [
    `🥊 *FIGHTER FORGE — GEAR LOCKER COMMUNITY IDEA*`,
    `----------------------------------------`,
    `Hello Fighter Forge Team, I have a combat gear suggestion for your upcoming SKUs:`,
    ``,
    `• Gear Category: ${gearCategory}`,
    `• Fighter / Coach Name: ${name}`,
    `• Phone: ${phone}`,
    `• City: ${city}`,
    `• Concept / Ideas: ${idea}`,
    `----------------------------------------`,
    `Looking forward to the launch!`
  ].join("\n");
}

/**
 * Format event rental request for WhatsApp (IPBL & Pro MMA events across India)
 */
export function formatEventRentalMessage({ eventName, eventType, city, eventDates, elevation, notes, contactName, phone }) {
  return [
    `🏟️ *FIGHTER FORGE — ARENA RENTAL ENQUIRY (INDIA)*`,
    `----------------------------------------`,
    `Hello Fighter Forge (+91 78389 66576), I want to rent a professional arena for an upcoming combat event:`,
    ``,
    `• Event / Promotion: ${eventName || "IPBL / Fight Night"}`,
    `• Arena Required: ${eventType || "Boxing Ring / MMA Octagon"}`,
    `• Height / Elevation: ${elevation || "3 ft Pro Competition (100 cm)"}`,
    `• Event Location / City: ${city || "Across India"}`,
    `• Event Dates / Days: ${eventDates || "Upcoming"}`,
    `• Contact Person: ${contactName || "Promoter / Matchmaker"}`,
    `• Contact Phone: ${phone || "+91 78389 66576"}`,
    notes ? `• Special Notes: ${notes}` : `• Services: Full arena transport, on-site setup crew, and teardown.`,
    `----------------------------------------`,
    `Please share rental package pricing, transport logistics, and date availability.`,
    `*BUILT FOR CHAMPIONS.*`
  ].join("\n");
}

/**
 * Quick direct greeting for rental inquiries
 */
export function getQuickRentalGreeting(arenaType = "Boxing Ring / MMA Cage") {
  return `Hello Fighter Forge (+91 78389 66576), I want to rent a ${arenaType} for an upcoming combat sports event in India (IPBL / MMA Fight Night). Please share rental packages, pricing, and availability.`;
}
