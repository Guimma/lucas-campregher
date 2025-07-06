export interface PodcastEpisode {
  id: string;
  embedUrl: string;
}

export interface PodcastDisplay {
  title?: string;
  description?: string;
  episodes: PodcastEpisode[];
} 