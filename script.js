// API endpoint that returns paginated movie data
const apiUrl = "https://jsonfakery.com/movies/paginated";

// Store all fetched movies
let movies = [];

// DOM elements
const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Fetch movies from the API and load them into the page
const loadMovies = async () => {
  try {
    // Request movie data
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract movie list from API response
    movies = data.data;

    // Display all movies initially
    renderMovies(movies);
  } catch (err) {
    // Log any fetch or parsing errors
    console.error("Failed to load movies", err);
  }
};

// Load movies immediately when the page starts
loadMovies();

// Handle search button click
searchBtn.addEventListener("click", () => {
  // Prevent Empty Search Input
  if (searchInput.value === "") {
    alert("Please Enter Movie Name")
  }
  // Normalize user search input (case-insensitive + trimmed)
  const query = searchInput.value.toLowerCase().trim();

  // Filter movies where the title includes the search query
  const filtered = movies.filter((movie) =>
    movie.original_title.toLowerCase().includes(query)
  );

  // Re-render the movie grid with filtered results
  renderMovies(filtered);
});

// Renders a list of movies into the movie grid
const renderMovies = (arr) => {
  // Replace movieList content with generated HTML
  movieList.innerHTML = arr
    .map(
      (movie) => `
      <div class="col-md-3 mb-4 column">
        <div class="card movie-card bg-dark text-white shadow">
          <!-- Movie Poster -->
          <img src="${movie.poster_path}" class="card-img-top">

          <div class="card-body">
            <!-- Movie Title -->
            <h5 class="card-title">${movie.original_title}</h5>

            <!-- Movie Rating (fallback to 'N/A' if missing) -->
            <p class="mt-2 small text-secondary">
              Rating: ${movie.popularity ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
    `
    )
    .join(""); // Convert array of HTML strings into a single block
};
