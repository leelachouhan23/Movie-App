const API_KEY = '04c35731a5ee918f014970082a0088b1'; // Replace with your TMDb API key
const movieGrid = document.getElementById('movieGrid');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const toggleTheme = document.getElementById('toggleTheme');
const loader = document.getElementById('loader');
const modal = document.getElementById('movieModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalOverview = document.getElementById('modalOverview');
const closeModal = document.querySelector('.close');

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

async function fetchMovies(category = 'popular') {
    showLoader(); // Show loader
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`);
        if (!response.ok) { // Check for HTTP errors
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        hideLoader(); // Hide loader
        displayMovies(data.results);
    } catch (error) {
        hideLoader(); // Hide loader even if there's an error
        console.error('Error fetching movies:', error);
        alert('Error fetching movies. Please try again later.');
    }
}

function displayMovies(movies) {
    movieGrid.innerHTML = ''; // Clear previous results
    if (movies.length === 0) {
        movieGrid.innerHTML = '<p>No movies found.</p>';
        return;
    }
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        movieCard.addEventListener('click', () => openModal(movie)); // Open modal on click
        movieGrid.appendChild(movieCard);
    });
}

function openModal(movie) {
    modal.style.display = 'flex'; // Center modal
    modalImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    modalTitle.innerText = movie.title;
    modalOverview.innerText = movie.overview;
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

searchButton.addEventListener('click', async () => {
    const query = searchInput.value;
    showLoader(); // Show loader
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
        if (!response.ok) { // Check for HTTP errors
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        hideLoader(); // Hide loader
        displayMovies(data.results);
    } catch (error) {
        hideLoader(); // Hide loader even if there's an error
        console.error('Error searching movies:', error);
        alert('Error searching movies. Please try again later.');
    }
});

// Toggle dark/light mode
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('light'); // Toggle light class
});

// Fetch popular movies on load
fetchMovies();
