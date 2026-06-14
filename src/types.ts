export interface FloorPlan {
  id: string;
  name: string;
  stories: number;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  sqftActual: number;
  sqftAcore: number; // A/C area
  price: string;
  description: string;
  features: string[];
  exteriorImageUrl: string;
  floorPlanImageUrl: string;
}

export interface Amenity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  iconName: string;
}

export interface SitePlot {
  id: string;
  number: string;
  status: 'Available' | 'Reserved' | 'Sold';
  lotSizeAcres: number;
  type: 'Executive' | 'Signature' | 'Equestrian Estate';
  cornerLot: boolean;
}

export interface InquireFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  bookAppointment: boolean;
  message: string;
}
