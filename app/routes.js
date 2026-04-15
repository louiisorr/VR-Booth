//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// AGE GATE
router.post('/eligibility-age', function (req, res) {
  const ageRaw = req.session.data['age']
  const age = Number(ageRaw)

  if (!ageRaw || Number.isNaN(age)) {
    return res.redirect('/eligibility-age')
  }

  if (age < 13) {
    return res.redirect('/not-eligible')
  }

  if (age <= 15) {
    req.session.data.adultRequired = 'yes'
  } else {
    req.session.data.adultRequired = 'no'
  }

  return res.redirect('/access-needs')
})

// ACCESS NEEDS
router.post('/access-needs', function (req, res) {
  return res.redirect('/choose-library')
})

// CHOOSE LIBRARY
router.post('/choose-library', function (req, res) {
  return res.redirect('/choose-date')
})

// CHOOSE DATE
router.post('/choose-date', function (req, res) {
  return res.redirect('/choose-time')
})

// CHOOSE TIME
router.post('/choose-time', function (req, res) {
  return res.redirect('/contact-details')
})

// CONTACT DETAILS
router.post('/contact-details', function (req, res) {
  return res.redirect('/check-answers')
})

// CHECK ANSWERS — confirm and go to confirmation
router.post('/check-answers', function (req, res) {
  return res.redirect('/confirmation')
})
