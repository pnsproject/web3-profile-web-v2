import { request, gql } from 'graphql-request'

async function queryDomainByWalletAddress (address: string) {
  const query = gql`
   query MyQuery($account: String) {
      domains (where: {owner: $account}) {
        id
        name
        owner {
          id
        }
        parent {
          id
        }
        registrations {
          expiryDate
        }
      }
  }
`
  const variables = {
    account: address
  }

  const customGql = 'https://pns-graph.ddns.so/subgraphs/name/graphprotocol/pns'
  const resp: any = await request(customGql, query, variables)

  const all = resp.domains.map((item:any) => {
    return {
      id: item.id,
      name: item.name,
      owner: item.owner.id,
      parent: item.parent.id,
      expiration: item.registrations.length ? Number(item.registrations[item.registrations.length - 1].expiryDate) * 1000 : 0
    }
  })

  return all.filter((item: any) => {
    return item.owner !== '0x0000000000000000000000000000000000000000'
  })
}

export default queryDomainByWalletAddress
