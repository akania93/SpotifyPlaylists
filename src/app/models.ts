export interface Album {
    name: string,
    images: any[],
    tracks: Track[]
}
export interface Playlist {
    id?: number,
    name: string,
    description: string,
    color: string,
    favourite: boolean,
    category: string,
    tracks: Track[]
}
export interface Track {
    id?: number,
    name: string,
    external_id: string,
    duration_ms: number,
    external_url_spotify: string,
    preview_url: string,
    artists: Artist[]
}
export interface Artist {
    id?: number,
    name: string,
    external_url_spotify: string
}