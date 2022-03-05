
const datetime2String = (datetime: Date) => {
  return datetime.toLocaleDateString().replaceAll('/', '-') + ' ' + datetime.toLocaleTimeString('en-US', { hour12: false })
}

export default datetime2String
