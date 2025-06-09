import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { createWhatsAppUrl } from "@/lib/config";

export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  pricePerDay: number;
  seats: number;
  transmission: "Manual" | "Automatic";
  fuelType: "Bensin" | "Diesel" | "Listrik" | "Hybrid";
  year: number;
  available: boolean;
}

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  // Icon berdasarkan tipe bahan bakar
  const getFuelIcon = (fuelType: string) => {
    switch (fuelType) {
      case "Bensin":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "Diesel":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
      case "Listrik":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "Hybrid":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-secondary-100 hover:border-primary-200 w-full group h-full flex flex-col">
      <div className="relative h-32 sm:h-48 md:h-56 w-full overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover transform transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        
        {/* Brand dan tahun badge */}
        <div className="absolute top-1.5 sm:top-3 left-1.5 sm:left-3 bg-white/90 backdrop-blur-sm px-1.5 sm:px-3 py-0.5 sm:py-1 rounded text-xs font-medium shadow-sm">
          <span className="hidden sm:inline">{car.brand} • {car.year}</span>
          <span className="sm:hidden text-xs">{car.year}</span>
        </div>
        
        {/* Badge ketersediaan di pojok kanan atas */}
        <div className={`absolute top-1.5 sm:top-3 right-1.5 sm:right-3 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold ${
          car.available 
            ? 'bg-green-500 text-white shadow-sm shadow-green-500/30' 
            : 'bg-secondary-700/80 text-white backdrop-blur-sm'
        }`}>
          <span className="hidden sm:inline">{car.available ? 'Tersedia' : 'Tidak Tersedia'}</span>
          <span className="sm:hidden text-xs">{car.available ? '✓' : '✕'}</span>
        </div>
        
        {/* Gradient overlay untuk tidak tersedia */}
        {!car.available && (
          <div className="absolute inset-0 bg-secondary-900/50 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-secondary-900/80 text-white px-4 py-2 rounded-lg text-lg font-bold backdrop-blur-sm">
              Tidak Tersedia
            </span>
          </div>
        )}
      </div>
      
      <div className="p-2 sm:p-4 md:p-5 flex flex-col flex-grow">
        <h3 className="text-xs sm:text-lg md:text-xl font-bold text-secondary-900 mb-1 sm:mb-2 group-hover:text-primary-600 transition-colors leading-tight">
          {car.name}
        </h3>
        
        <div className="flex items-center mb-2 sm:mb-3">
          <div className={`inline-flex items-center ${
            car.transmission === "Automatic" 
              ? 'bg-primary-50 text-primary-700' 
              : 'bg-secondary-100 text-secondary-700'
            } px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium`}>
            <span className="hidden sm:inline">{car.transmission}</span>
            <span className="sm:hidden">{car.transmission === "Automatic" ? "AT" : "MT"}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-1 mb-2 sm:mb-4">
          <div className="flex items-center text-secondary-700 bg-secondary-50 px-1.5 sm:px-2.5 py-0.5 sm:py-1.5 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs font-medium">{car.seats}</span>
          </div>
          <div className="flex items-center text-secondary-700 bg-secondary-50 px-1.5 sm:px-2.5 py-0.5 sm:py-1.5 rounded-md">
            <div className="h-2.5 w-2.5 sm:h-4 sm:w-4 mr-0.5 sm:mr-1">
              {getFuelIcon(car.fuelType)}
            </div>
            <span className="text-xs font-medium hidden sm:inline">{car.fuelType}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-2 sm:pt-4 border-t border-secondary-100">
          <div className="mb-1.5 sm:mb-3">
            <span className="text-sm sm:text-xl md:text-2xl font-bold text-secondary-900">{formatPrice(car.pricePerDay)}</span>
            <span className="text-secondary-500 text-xs"> / hari</span>
          </div>
          
          <button
            onClick={() => {
              if (car.available) {
                const message = `Halo! Saya tertarik dengan mobil ${car.name} ${car.year}.

Mobil: ${car.name} (${car.brand})
Harga: ${formatPrice(car.pricePerDay)}/hari
Kapasitas: ${car.seats} orang
Transmisi: ${car.transmission}
Bahan Bakar: ${car.fuelType}

Mohon informasi ketersediaan dan proses bookingnya. Terima kasih!`;

                window.open(createWhatsAppUrl(message), '_blank');
              }
            }}
            className={`w-full inline-flex items-center justify-center relative overflow-hidden ${
              car.available 
                ? "bg-primary-600 hover:bg-primary-700 text-white group/btn cursor-pointer" 
                : "bg-secondary-200 text-secondary-500 cursor-not-allowed"
            } py-1.5 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl font-medium shadow-md transition-all duration-300`}
            disabled={!car.available}
          >
            {car.available && (
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-primary-500/40 via-white/40 to-primary-500/0 
                transform -skew-x-12 group-hover/btn:animate-shine z-0"></span>
            )}
            <span className="relative z-10 text-white pointer-events-none flex items-center justify-center">
              {car.available ? (
                <>
                  <svg className="h-2.5 w-2.5 sm:h-4 sm:w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                  </svg>
                  <span className="text-xs">Chat</span>
                </>
              ) : (
                <span className="text-xs">Tidak Tersedia</span>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
} 