const UID = {
  short: () => {
    let firstPart = ((Math.random() * 46656) | 0).toString(36)
    let secondPart = ((Math.random() * 46656) | 0).toString(36)
    firstPart = ('000' + firstPart).slice(-3)
    secondPart = ('000' + secondPart).slice(-3)
    return firstPart + secondPart
  },
  v4: () => {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }
}

export default UID
