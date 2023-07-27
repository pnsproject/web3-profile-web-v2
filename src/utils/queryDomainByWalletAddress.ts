import { request, gql } from 'graphql-request'

async function queryDomainByWalletAddress (address: string) {
  const query = gql`
        query MyQuery {
            domains(where: {owner: {id_eq: "${address}"}, parent: {id_eq: "0x3fce7d1364a893e213bc4212792b517ffc88f5b13b86c8ef9c8d390c3a1370ce"}}) {
                owner {
                  id
                }
                labelName
                labelhash
                name
                id
                createdAt
                parent {
                  id
                  labelName
                  labelhash
                  name
                  registrations {
                    expiryDate
                  }
                }
                registrations {
                  expiryDate
                }
            }
        }
    `
  const customGql = 'https://pnsgraph-api.pns.link/graphql'
  const resp: any = await request(customGql, query)

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
