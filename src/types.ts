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