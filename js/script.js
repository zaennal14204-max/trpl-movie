const apiKey = '131a0187';

function searchMovie() {
  $('#movie-list').html('');

  $.ajax({
    url: 'https://www.omdbapi.com/',
    type: 'get',
    dataType: 'json',
    data: {
      apikey: apiKey,
      s: $('#search-input').val()
    },
    success: function(result) {
      if (result.Response === "True") {
        let movies = result.Search;

        $.each(movies, function(i, data) {
          $('#movie-list').append(`
            <div class="col-md-3">
              <div class="card mb-4">
                <img src="${data.Poster}" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${data.Title}</h5>
                  <p>${data.Year}</p>
                  <a href="#" 
                     class="btn btn-primary see-detail" 
                     data-id="${data.imdbID}" 
                     data-toggle="modal" 
                     data-target="#movieDetailModal">
                     See Detail
                  </a>
                </div>
              </div>
            </div>
          `);
        });

      } else {
        $('#movie-list').html('<h3>Movie not found</h3>');
      }
    },
    error: function() {
      $('#movie-list').html('<h3>Error mengambil data</h3>');
    }
  });
}

// tombol klik
$('#button-search').on('click', function() {
  searchMovie();
});

// tekan enter
$('#search-input').on('keyup', function(e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

// DETAIL MOVIE
$(document).on('click', '.see-detail', function(e) {
  e.preventDefault(); 

  const imdbID = $(this).data('id');

  $.ajax({
    url: 'https://www.omdbapi.com/',
    type: 'get',
    dataType: 'json',
    data: {
      apikey: apiKey,
      i: imdbID
    },
    success: function(m) {
      if (m.Response === "True") {
        $('#movie-detail').html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="${m.Poster}" class="img-fluid">
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${m.Title}</h4></li>
                  <li class="list-group-item">Year: ${m.Year}</li>
                  <li class="list-group-item">Genre: ${m.Genre}</li>
                  <li class="list-group-item">Director: ${m.Director}</li>
                  <li class="list-group-item">Actors: ${m.Actors}</li>
                  <li class="list-group-item">Plot: ${m.Plot}</li>
                </ul>
              </div>
            </div>
          </div>
        `);
      } else {
        $('#movie-detail').html('<h5>Detail tidak ditemukan</h5>');
      }
    },
    error: function() {
      $('#movie-detail').html('<h5>Gagal mengambil detail</h5>');
    }
  });
});
