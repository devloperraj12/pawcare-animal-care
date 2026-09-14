export type ScreenName = 'home' | 'search' | 'profile' | 'ai-report';

export type ServiceCategory = 'Vet' | 'Ambulance' | 'Emergency' | 'Boarding' | 'NGO / Rescue';

export type AnimalType = 'Dog' | 'Cat' | 'Bird' | 'Rabbit' | 'Cow' | 'All Animals';

export interface Provider {
  id: string;
  name: string;
  type: 'Vet' | 'Ambulance' | 'NGO / Rescue' | 'Boarding';
  rating: number;
  reviews: number;
  verified: boolean;
  verifiedDaysAgo: number;
  distanceKm: number;
  openNow: boolean;
  hours: string;
  area: string;
  address: string;
  phone: string;
  services: string[];
  animals: AnimalType[];
  emergency: boolean;
  isEmergencyPriority?: boolean;
  yearsActive: number;
  about: string;
}

export interface AISummary {
  animalName: string;
  species: string;
  breed: string;
  reportType: string;
  dateOfReport: string;
  keyFindings: string[];
  medications: { name: string; dosage: string; duration: string }[];
  followUp: string;
  questionsToAsk: string[];
}
