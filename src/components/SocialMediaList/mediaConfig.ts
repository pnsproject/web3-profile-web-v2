import twitter from '@/components/SocialMediaList/assets/twitter.svg'
import facebook from '@/components/SocialMediaList/assets/facebook.svg'
import linkedin from '@/components/SocialMediaList/assets/linkedIn.svg'
import github from '@/components/SocialMediaList/assets/github.svg'
import mail from '@/components/SocialMediaList/assets/mail.svg'

export const mediaList: Global.MediaItem[] = [
  {
    name: 'twitter',
    recordKey: 'com.twitter',
    color: '#1DA1F2',
    suffix: '@Twitter',
    icon: twitter
  },
  {
    name: 'facebook',
    recordKey: 'com.facebook',
    color: '#286BD3',
    suffix: '@FaceBook',
    icon: facebook
  },
  {
    name: 'linkedin',
    recordKey: 'com.linkedin',
    color: '#0A66C2',
    suffix: '@Linkedin',
    icon: linkedin
  },
  {
    name: 'github',
    recordKey: 'com.github',
    color: '#000000',
    suffix: '@Github',
    icon: github
  },
  {
    name: 'mail',
    recordKey: 'email',
    color: '#F83673',
    suffix: '',
    icon: mail
  }
]
