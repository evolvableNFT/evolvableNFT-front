export const compressAddress = (address) => {
  if (!address) return address
  let _add = address.toString()
  const len = _add.length
  return len > 10 ? `${_add.slice(0, 5)}...${_add.slice(len - 4)}` : _add
}
