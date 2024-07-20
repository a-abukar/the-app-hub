function fetchPrayerTimes() {
  const location = document.getElementById('location').value.split(',');
  const city = location[0];
  const country = location[1];

  const apiUrl = `/api/prayer-times?city=${city}&country=${country}`;
  console.log('Fetching prayer times from URL:', apiUrl);

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.code === 200) {
        const timings = data.data.timings;
        const gregorianDate = data.data.date.gregorian.date; // Use the gregorian date
        const dateDiv = document.getElementById('date');
        const timesDiv = document.getElementById('times');
        dateDiv.innerHTML = `Prayer Times for ${city}, ${country} on ${gregorianDate}`;
        timesDiv.innerHTML = `
          <div class="time"><i class="fas fa-moon"></i><p>Fajr: ${timings.Fajr}</p></div>
          <div class="time"><i class="fas fa-sun"></i><p>Sunrise: ${timings.Sunrise}</p></div>
          <div class="time"><i class="fas fa-sun"></i><p>Dhuhr: ${timings.Dhuhr}</p></div>
          <div class="time"><i class="fas fa-sun"></i><p>Asr: ${timings.Asr}</p></div>
          <div class="time"><i class="fas fa-sun"></i><p>Maghrib: ${timings.Maghrib}</p></div>
          <div class="time"><i class="fas fa-moon"></i><p>Isha: ${timings.Isha}</p></div>
        `;
      } else {
        console.error('Error fetching prayer times:', data);
      }
    })
    .catch(error => console.error('Error:', error));
}
