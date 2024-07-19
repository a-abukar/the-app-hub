const axios = require('axios');

const getPrayerTimes = async (date, city, country) => {
  try {
    const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity/${date}`, {
      params: {
        city: city,
        country: country,
        method: 2 // Calculation method
      }
    });
    console.log(response.data.data.timings);
  } catch (error) {
    console.error('Error fetching prayer times:', error);
  }
};

getPrayerTimes('19-07-2024', 'London', 'United Kingdom');
