Test Coverage:

Method	Endpoint	Test
POST	/auth	Generate token
GET	/booking	Get all bookings
POST	/booking	Create booking
GET	/booking/:id	Get booking by ID
PUT	/booking/:id	Full update
PATCH	/booking/:id	Partial update
DELETE	/booking/:id	Delete booking
GET	/booking/:id	Verify 404 after delete
Run with:

npx playwright test restful-booker.api.spec.ts