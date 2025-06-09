export const config = {
  whatsapp: {
    number: "6282248751765", // Ganti dengan nomor WhatsApp bisnis Anda
    baseUrl: "https://wa.me/",
  },
  business: {
    name: "Car Rental Service",
    email: "info@carrental.com",
    phone: "+62 822-4875-1765",
  }
};

export const createWhatsAppUrl = (message: string) => {
  return `${config.whatsapp.baseUrl}${config.whatsapp.number}?text=${encodeURIComponent(message)}`;
}; 