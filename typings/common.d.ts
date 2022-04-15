declare namespace Global {
export type TextRecordKey = 'email' | 'url' | 'avatar' | 'description' | 'notice' | 'keywords' | 'com.github' | 'com.twitter' | 'com.facebook' | 'com.linkedin'

export interface MediaItem {
    name: string;
    recordKey: TextRecordKey;
    color: string;
    suffix: string;
    icon: any;
    value?: string
  }

  export interface AddressConfig {
    name: string,
    color: string,
    background: string,
    icon: any,
    value: string
  }

  export interface AddressMap {
    [k: string]: string
  }

  export interface NftItem {
    name:string
    contract: string;
    blockchain: string;
    title: string;
    image: string;
    tokenId: string;
    description?: string;
  }
}
