export function getSubmitVinErrorText(text, exist) {
	let errorText = ''
	if (exist) {
		errorText = 'Vin with this name already exists'
	} else if (text.length !== 17) {
		errorText = 'Vin`s length should be 17 symbols'
	}

	return errorText
}