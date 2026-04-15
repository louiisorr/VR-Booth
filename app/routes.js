//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// AGE GATE
router.post('/eligibility-age', function (req, res) {
	const ageRaw = req.session.data.age
	const age = Number(ageRaw)

	// Optional: handle blank / non-numeric input
	if (!ageRaw || Number.isNaN(age)) {
		return res.redirect('/eligibility-age') // or render with an error message
	}

	// Rule 1: under 13 -> not eligible
	if (age < 13) {
		return res.redirect('/not-eligible')
	}

	// Rule 2: 13 to 15 -> allow booking, but flag adult required for later
	if (age <= 15) {
		req.session.data.adultRequired = 'yes'
	} else {
		req.session.data.adultRequired = 'no'
	}

	// continue journey
	return res.redirect('/access-needs')
})
