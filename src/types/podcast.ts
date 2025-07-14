export interface PodcastEpisode {
  id: string;
  title: string;
  image: string;
  spotifyUrl: string;
  episodeNumber?: number;
  show: string;
}

export interface PodcastDisplay {
  title?: string;
  description?: string;
  episodes: PodcastEpisode[];
} 