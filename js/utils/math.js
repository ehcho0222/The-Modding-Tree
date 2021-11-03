function exponentSoftcap(value, cap, exponent = 0.5){
	value = new Decimal(value)
	cap = new Decimal(cap)
	exponent = new Decimal(exponent)
	if (value.lte(cap))
	{
		return value
	}
	else
	{
		let exceed = value.div(cap)
		exceed = exceed.pow(exponent)
		return cap.times(exceed)
	}
}

function hardcap(value, cap){
	value = new Decimal(value)
	cap = new Decimal(cap)
	return value.min(cap)
}