export interface IRatingCreateApiResponse {
  rating: IRating;
}

export interface IRatingUpdateApiResponse extends IRatingCreateApiResponse {}

export interface IRating {
  id: number;
  ratingsCount: number;
  averageRating: number;
}
