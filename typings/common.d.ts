declare namespace Global {
  import { IconType } from '@/views/Home/components/WalletAddress/icons'

  export type TextRecordKey = 'email' | 'url' | 'avatar' | 'description' | 'notice' | 'keywords' | 'com.github' | 'com.twitter' | 'com.facebook' | 'com.linkedin'

  export type MediaItem = any

  export interface NftThum {
      id:number;
      image_url: string;
      position: number;
    }

  export interface TextRecords {
      key: TextRecordKey;
      value: string;
  }

  export interface Addr {
    key: IconType;
    value: string;
  }

  export interface DomainDetail {
        addrs: Addr[],
        cname: string,
        content: string,
        contentType: string,
        label: string,
        name: string,
        owner: string,
        textRecords: TextRecords[]
    }

  export interface HomeData {
    apps: App[];
    avatars: NftThum[];
    collections: CollectionsList;
    domains: NftThum[];
    galaxy_credentials: GalaxyCredentials[];
    mirror_blogs: Blog[];
    poaps: Poap[];
  }

  export interface App {
    id: number;
    icon: string;
    website_name: string;
    website_url: string;
  }

  export interface Poap {
    id: number;
    content: string;
    image: string;
    published_at: string;
    title: string;
    url?:string
  }

  export interface GalaxyCredentials {
    id: number;
    name: string;
  }

  export type CollectionsList = {name: string, nft_assets:NftThum[]}[]

  export interface Blog {
    title: string;
    external_link: string;
    id: number;
    image_url: string;
    published_at: string;
    read_cost_time: number
  }

  export interface NftItem  {
    chain_id: number;
    contract: any;
    external_url: string;
    id: number;
    image_url: string
    token_id:string
  }
}
