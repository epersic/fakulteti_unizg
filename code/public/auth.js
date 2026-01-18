// Provjeri je li korisnik prijavljen i prikaži odgovarajući izbornik
async function setupAuthLinks() {
  const authLink = document.getElementById('auth-link');
  
  try {
    const response = await fetch('/api/profile');
    
    if (response.ok) {
      // Korisnik je prijavljen
      const user = await response.json();
      
      authLink.innerHTML = `
        <span>Prijavljeni ste kao: <strong>${user.name || user.email}</strong></span>
        <a href="/profile.html">Korisnički profil</a>
        <a href="#" id="refresh-btn">Osvježi preslike</a>
        <a href="/logout">Odjava</a>
      `;
      
      // Event listener za osvježavanje podataka
      document.getElementById('refresh-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        await refreshData();
      });
    } else {
      // Korisnik nije prijavljen
      authLink.innerHTML = '<a href="/login">Prijava</a>';
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    authLink.innerHTML = '<a href="/login">Prijava</a>';
  }
}

// Osvježi podatke (export CSV i JSON)
async function refreshData() {
  try {
    const response = await fetch('/api/refresh-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      alert('Podaci su uspješno osvježeni! Nove verzije CSV i JSON datoteka su spremljene.');
    } else {
      alert('Greška pri osvježavanju podataka');
    }
  } catch (error) {
    console.error('Error refreshing data:', error);
    alert('Greška pri osvježavanju podataka');
  }
}

// Pozovi pri učitavanju stranice
document.addEventListener('DOMContentLoaded', setupAuthLinks);
