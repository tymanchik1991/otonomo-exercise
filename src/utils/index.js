export function getSubmitVinErrorText(text, exist) {
  let errorText = ''
  if (exist) {
    errorText = 'Vin with this name already exists'
  } else if (text.length !== 17) {
    errorText = 'Vin`s length should be 17 symbols'
  }

  return errorText
}

export const eventColors = [
  '#d42713', // red
  '#45c3e8', //blue
  '#8317e6', //violet
  '#7ec3aa', //green(dark)
  '#b9bf7a', //yellow(dark)
  '#1c2db1', // dark blue
  '#96dc72', // salad green
]
