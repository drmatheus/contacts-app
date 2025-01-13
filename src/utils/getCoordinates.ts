const fetchCoordinates = async (address: string) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );
  const data = await response.json();
  if (data.results.length > 0) {
    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  }
  throw new Error('Endereço não encontrado.');
};

export default fetchCoordinates;
