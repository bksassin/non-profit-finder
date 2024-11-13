export interface Nonprofit {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  coverImageUrl: string;
  location: string;
  tags: string[];
  websiteUrl: string;
  ein: string;
  profileUrl: string;
  slug: string;
  source: 'everyorg' | 'globalgiving';
}

export interface NonprofitApiResponse {
  results: Nonprofit[];
  hasMore: boolean;
  total: number;
}

export interface Category {
  name: string;
  icon: string;
  terms: string[];
}

export interface GlobalGivingImageLink {
  url: string;
  size?: string;
}

export interface GlobalGivingOrganization {
  name: string;
  logoUrl?: string;
  image?: {
    imagelink: GlobalGivingImageLink[];
  };
}

export interface GlobalGivingProject {
  id: number;
  title: string;
  summary: string;
  organization: GlobalGivingOrganization;
  image?: {
    imagelink: GlobalGivingImageLink[];
  };
  imageGallerySize: number;
  country: string;
  themes?: {
    theme: string | string[];
  };
  contactUrl?: string;
  projectLink: string;
}