declare namespace Global {
  export type TextRecordKey = 'email' | 'url' | 'avatar' | 'description' | 'notice' | 'keywords' | 'com.github' | 'com.twitter' | 'com.facebook' | 'com.linkedin'

  export type MediaItem = any

  export interface NftThum {
      id:number;
      image_url: string;
      position: number;
    }

  export interface HomeData {
    apps: NftThum[];
    avatars: NftThum[];
    collections: NftThum[];
    domains: NftThum[];
    galaxy_credentials: NftThum[];
    mirror_blogs: NftThum[];
    poaps: NftThum[];
  }
}
