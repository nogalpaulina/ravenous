const apiKey = 'h0NmSwp7zAO2UpsJJteqAlNdnGumrvNUeAQk0taLRMeF8yHrGIQNQqWKxfu8Sjiuz7p-Y4opIW8NndXzlsplMYB5dgObVbJukbGrRpjciMaCHZTSqHxmSF51VdJlW3Yx';

const Yelp = {
	search(term, location, sortBy) {
    	return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
			headers: {
				Authorization: `Bearer ${apiKey}`
			}
		}).then(response => {
		// Convert the returned response to JSON
      		return response.json();
  		// Retrieve the list of businesses from the converted JSON response
    	}).then(jsonResponse => {
			if (jsonResponse.businesses) {
				return jsonResponse.businesses.map(business => ({
					id: business.id,
					imageSrc: business.image_url,
					name: business.name,
					address: business.location.address1,
					city: business.location.city,
					state: business.location.state,
					zipCode: business.location.zip_code,
					category: business.categories[0].title,
					rating: business.rating,
					reviewCount: business.review_count
				}));
			}
		});
	}
};

export default Yelp;
