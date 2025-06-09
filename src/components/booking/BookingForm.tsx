"use client";

import { useState } from "react";
import { motion } from "@/lib/motion";
import { createWhatsAppUrl } from "@/lib/config";

interface BookingFormProps {
  carId?: string;
  initialPickupDate?: string;
  initialReturnDate?: string;
  initialLocation?: string;
}

export default function BookingForm({
  carId,
  initialPickupDate,
  initialReturnDate,
  initialLocation,
}: BookingFormProps) {
  const [pickupDate, setPickupDate] = useState(initialPickupDate || "");
  const [returnDate, setReturnDate] = useState(initialReturnDate || "");
  const [pickupLocation, setPickupLocation] = useState(initialLocation || "");
  const [returnLocation, setReturnLocation] = useState(initialLocation || "");
  const [sameLocation, setSameLocation] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create detailed WhatsApp message
    const message = `Halo! Saya ingin melakukan booking mobil dengan detail sebagai berikut:

Tanggal Pengambilan: ${pickupDate ? new Date(pickupDate).toLocaleDateString("id-ID") : 'Belum dipilih'}
Tanggal Pengembalian: ${returnDate ? new Date(returnDate).toLocaleDateString("id-ID") : 'Belum dipilih'}
Lokasi Pengambilan: ${pickupLocation || 'Belum dipilih'}
Lokasi Pengembalian: ${sameLocation ? pickupLocation || 'Belum dipilih' : returnLocation || 'Belum dipilih'}

${carId ? `ID Mobil: ${carId}` : ''}

Mohon konfirmasi ketersediaan dan proses selanjutnya. Terima kasih!`;

    // Open WhatsApp in new tab
    window.open(createWhatsAppUrl(message), '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <h3 className="text-2xl font-bold mb-6">Pesan Mobil Sekarang</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pickup Date */}
          <div>
            <label htmlFor="pickup-date" className="block text-sm font-medium text-secondary-700 mb-2">
              Tanggal Pengambilan
            </label>
            <input
              type="date"
              id="pickup-date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          {/* Return Date */}
          <div>
            <label htmlFor="return-date" className="block text-sm font-medium text-secondary-700 mb-2">
              Tanggal Pengembalian
            </label>
            <input
              type="date"
              id="return-date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          {/* Pickup Location */}
          <div>
            <label htmlFor="pickup-location" className="block text-sm font-medium text-secondary-700 mb-2">
              Lokasi Pengambilan
            </label>
            <select
              id="pickup-location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value="">Pilih lokasi</option>
              <option value="jakarta">Jakarta</option>
              <option value="bandung">Bandung</option>
              <option value="surabaya">Surabaya</option>
              <option value="yogyakarta">Yogyakarta</option>
              <option value="bali">Bali</option>
            </select>
          </div>
          
          {/* Return Location */}
          <div>
            <label htmlFor="return-location" className="block text-sm font-medium text-secondary-700 mb-2">
              Lokasi Pengembalian
            </label>
            {sameLocation ? (
              <div className="text-secondary-700 px-4 py-3">Sama dengan lokasi pengambilan</div>
            ) : (
              <select
                id="return-location"
                value={returnLocation}
                onChange={(e) => setReturnLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Pilih lokasi</option>
                <option value="jakarta">Jakarta</option>
                <option value="bandung">Bandung</option>
                <option value="surabaya">Surabaya</option>
                <option value="yogyakarta">Yogyakarta</option>
                <option value="bali">Bali</option>
              </select>
            )}
            
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                id="same-location"
                checked={sameLocation}
                onChange={(e) => setSameLocation(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              />
              <label htmlFor="same-location" className="ml-2 block text-sm text-secondary-700">
                Lokasi pengembalian sama dengan pengambilan
              </label>
            </div>
          </div>
        </div>
        
        {/* Additional Options */}
        <div className="mt-8">
          <h4 className="text-lg font-medium mb-4">Opsi Tambahan</h4>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="driver"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              />
              <label htmlFor="driver" className="ml-2 block text-sm text-secondary-700">
                Sewa dengan sopir (+Rp 300.000/hari)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="insurance"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              />
              <label htmlFor="insurance" className="ml-2 block text-sm text-secondary-700">
                Asuransi tambahan (+Rp 150.000/hari)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="child-seat"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
              />
              <label htmlFor="child-seat" className="ml-2 block text-sm text-secondary-700">
                Kursi anak (+Rp 50.000/hari)
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
            </svg>
            Chat via WhatsApp
          </button>
        </div>
      </form>
    </motion.div>
  );
} 