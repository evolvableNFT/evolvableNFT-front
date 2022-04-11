export function validFormData(vm) {
  if (!vm) throw new Error('Miss this')

  const merkleRoot = vm.merkleRoot
  const selectedAddress = vm.selectedAddress
  const projName = vm.projName
  const projUrl = vm.projUrl
  const projLogo = vm.projLogo
  const projIntro = vm.projIntro

  const nftname = vm.nftname
  const image = vm.image
  const description = vm.nftDescription
  const dropTotal = vm.dropAmount

  const rules = vm.rules
  const expiresDate = vm.expiresDate

  if (!selectedAddress) {
    throw new Error('Please connect Metamask')
  }

  if (!projName || !projIntro) {
    throw new Error('Project Name and Intro required')
  }

  if (!merkleRoot || dropTotal <= 0) {
    throw new Error('Whitelist file required upload.')
  }

  if (!nftname || !image || !description) {
    throw new Error('NFT name ,image url and NFT description is required.')
  }

  const opensea = vm.opensea

  let attributes = vm.traits && vm.traits.length ? vm.traits : []
  attributes = attributes.filter((t) => t.trait_type && t.value !== '')

  if (opensea && attributes.length === 0) {
    throw new Error(`If your add opensea traits, at least one trait record set.`)
  }

  const data = {
    info: {
      name: projName,
      officalSite: projUrl,
      logoUri: projLogo,
      description: projIntro,
      dropTotal,
      expiresDate,
      rules: rules
    },
    nftname,
    description,
    image,
    merkleRoot,
    attributes: attributes,
    external_url: '',
  }
  console.log('UUUUUUUUUUUUUUUUUUU>>>>>', data)

  return data
}
