
const objectToArray = (obj) => {
  const arr = []
  for (const x in obj) { arr.push(obj[x]) } // eslint-disable-line
  return arr
}

export default objectToArray