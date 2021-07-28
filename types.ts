export type RootParamList = {
    Movies: undefined;
    Movie: {
        movieId: number;
        movie: Movie;
    };
};

export interface Movie {
    poster_path: string;
    adult?: boolean;
    overview: string;
    release_date: string,
    genre_ids: number[],
    id: number,
    original_title: string,
    original_language?: string,
    title: string,
    backdrop_path?: string,
    popularity?: number,
    vote_count?: number,
    video?: boolean,
    vote_average: number,
    genres?: Genre[]
}

export interface Genre {
    id: number;
    name: string;
}

export interface Credit {
    adult?: boolean,
    gender?: number,
    id: number,
    known_for_department?: string,
    name: string,
    original_name: string,
    popularity?: number,
    profile_path: string,
    cast_id?: number,
    character?: string,
    credit_id: string,
    order?: number
}