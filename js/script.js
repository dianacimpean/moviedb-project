var apiKey = "a8b96d868accfb62d4a1c7cec3d74994";

$('#spinner').hide();

function getDetails(idLink) {
    var id = $(idLink).attr('data-value');
    console.log(id);
    
     $('#spinner').show();
     $.ajax({
            method: "GET",
            url: "https://api.themoviedb.org/3/movie/" + id + "?api_key=a8b96d868accfb62d4a1c7cec3d74994&language=en-US",
            dataType: 'text',
            contentType: "application/json",
            success: function(result){         
            let movieDetails = {data:JSON.parse(result),trigger:'Data'};
                
            $('#spinner').hide();
                
            $('#modal-title').empty();
            $('#lang').empty();
            $('#release').empty();
            $('#descript').empty();
            $('#budget').empty();
            $('#revenue').empty();
            $('#genres').empty();
                
            $('#modal-title').append("Movie title: " + movieDetails.data.title);
            $('#lang').append("Language: " + movieDetails.data.original_language);    
            $('#release').append("Release date: " + movieDetails.data.release_date);   
            $('#descript').append("Description: " + movieDetails.data.overview);
            $('#budget').append("Budget: " + movieDetails.data.budget + " $");
            $('#revenue').append("Revenue: " + movieDetails.data.revenue + " $");
                if (movieDetails.data.genres.length > 0) {
                    
                for (var i = 0; i <= movieDetails.data.genres.length - 1; i++ ){
                    if (i === movieDetails.data.genres.length - 1) {
                        $("#genres").append(movieDetails.data.genres[i].name); 
                    } else {
                   $("#genres").append(movieDetails.data.genres[i].name + ", ");
                    }
                }
                } else {
                    $("#genres").append(movieDetails.data.genres.name);
                }
            },
           error: function (jqXHR, errorText, error) {
                 toastr.error('Network error has occurred, please try again!');
           },
    });
}

function searchByYear(pageIndex) { 
    if ($('#byTitle').val() != "") {
        alert("Doar una dintre casute terbuie sa fie completata!");
    } else {
    if (pageIndex === undefined) {
        var pageIndex = 1;
    }

    $('#spinner').show();
    $.ajax({
           method: "GET",
           url: "https://api.themoviedb.org/3/discover/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&include_adult=false&include_video=false&year=" + $('#byYear').val() + "&page=" + pageIndex,
           dataType: 'text',
           contentType: "application/json",
           success: function(result){
           let movieResults = {data:JSON.parse(result),trigger:'Data'};
           if (movieResults.data.page === 1) {
            $('#previous').attr('disabled', 'disabled');
           } else {
            $('#previous').removeAttr('disabled');   
           }
               $('#spinner').hide();
               $('#results').empty();
               $('#total_results').empty();
               $('#total_pages').empty();
               $('#current_page').empty();
               $('#total_pages').append("Total Pages: " + movieResults.data.total_pages + " pages");
               $('#total_results').append("Total Results: " + movieResults.data.total_results + " movies");
               $('#current_page').append("Current page: " + movieResults.data.page);
               for (var i=0; i< movieResults.data.results.length; i++ ){  
                    var shortDescription = jQuery.trim(movieResults.data.results[i].overview).substring(0, 100).trim(this) + "..."
                    $('#results').append("<div class='media' onClick='getDetails(this);' data-value='" + movieResults.data.results[i].id + "'data-toggle='modal' data-target='#myModal'> <div class='media-left'> <img class='media-object' style='width:110px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body'> <h4 class='media-heading'>" + movieResults.data.results[i].title + "</h4> <p class='language'>" + movieResults.data.results[i].original_language + "</p> <p class='release_date'> |  " + movieResults.data.results[i].release_date + "</p> <p class='description'>" + shortDescription + "</p> <p class='total_votes'> |  Total votes: " + movieResults.data.results[i].vote_count +"</p><p class='vote_average'> Rating: " + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");
                    $('#results').change(movieResults);
                }
            },
           error: function (jqXHR, errorText, error) {
                 toastr.error('Network error has occurred, please try again!');
           },
    });
}
}

function searchByTitle(pageIndex) {
    if ($('#byYear').val() != "") {
        alert("Doar una dintre casute terbuie sa fie completata!");
    } else {
    if (pageIndex === undefined) {
        var pageIndex = 1;
    }

    var title = $('#byTitle').val();
    $('#spinner').show();
    $.ajax({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&language=en-US&query=" + title + "&page=" + pageIndex + "&include_adult=false",
        dataType: 'text',
        contentType: "application/json",
        success: function(result){         
        let movieResults = {data:JSON.parse(result),trigger:'Data'};
            $('#spinner').hide();   
            $('#results').empty();
            $("#total_results").empty();
            $("#total_pages").empty();
            $("#total_results").append("Total Results: " + movieResults.data.total_results + " movies");
            $('#total_pages').append("Total Pages: " + movieResults.data.total_pages + " pages");
            
            for (var i=0; i< movieResults.data.results.length; i++ ){  
                
                // var movie = movieResults.data.results[i];
                
                var shortDescription = jQuery.trim(movieResults.data.results[i].overview).substring(0, 100).trim(this) + "..."
                
                $('#results').append("<div class='media' onClick='getDetails(this);' data-value='" + movieResults.data.results[i].id + "'data-toggle='modal' data-target='#myModal'> <div class='media-left'> <img class='media-object' style='width:110px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body'> <h4 class='media-heading'>" + movieResults.data.results[i].title + "</h4> <p class='language'>" + movieResults.data.results[i].original_language + "</p> <p class='release_date'> |  " + movieResults.data.results[i].release_date + "</p> <p class='description'>" + shortDescription + "</p> <p class='total_votes'> |  Total votes: " + movieResults.data.results[i].vote_count +"</p><p class='vote_average'> Rating: " + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");
                
                $("#results").change(movieResults);
                }
            },
        error: function (jqXHR, errorText, error) {
                 toastr.error('Network error has occurred please try again!');
        },
    });
}
}

var currentpage = function (movieResults) {
    var cpage = movieResults.data.results.page;
    if (cpage === 1) {
        $('#previous').die();
    }
    if (cpage === movieResults.data.results.total_pages) {
        $('#next').die();
    }
};


var lastpage = function (movieResults) {
    $.ajax({
            url: 'https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=309e4791c7c42b9d394e8d7a9abcedb2',
            method: 'GET'
        }
    ).done(function (movieResults) {
        $("#total_pages").html(movieResults.total_pages);
    });
};

var totalmovies = function (movieResults) {
    var year = $('#byYear').val();
    var title = $('#byTitle').val();
    $.ajax({
            // url: 'https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=309e4791c7c42b9d394e8d7a9abcedb2',
            url: "https://api.themoviedb.org/3/discover/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&include_adult=false&include_video=false&year=" + year,
            method: 'GET'
        }
    ).done(function (movieResults) {
        $("#nrmovies").html(movieResults.total_results);
    });
};
var loadPage = function (pageIndex) {
    var index;
    if (pageIndex)
        index = pageIndex;
    else
        index = 2;
        var year = $('#byYear').val();
        var title = $('#byTitle').val();
    if (year) {
    $.ajax(
        {
            url: "https://api.themoviedb.org/3/discover/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&include_adult=false&include_video=false&year=" + $('#byYear').val() + "&page=" + index,
            // url: 'https://api.themoviedb.org/3/discover/movie?api_key=309e4791c7c42b9d394e8d7a9abcedb2&page=' + pageIndex,
            method: 'GET'
        }
    ).done(loadPagination);
    } else if(title) {
        $.ajax(
            {
                url: "https://api.themoviedb.org/3/search/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&language=en-US&query=" + title + "&page=" + pageIndex + "&include_adult=false",
                method: 'GET'
            }
        ).done(loadPagination);
    }
};

var loadPagination = function (movieResults) {
    totalmovies(movieResults);
    var year = $('#byYear').val();
    var title = $('#byTitle').val();
    if (movieResults.page > 1) {
        $('#previous').attr('data-page', movieResults.page - 1);
        $('#previous').removeAttr('disabled');
        if ( year != "" && title == "")        {
            searchByYear(movieResults.page);
        } else if (year == "" && title != "") {
            searchByTitle(movieResults.page);
        } else {
            alert("Please fill only one field!");
        }
    } else {
        $('#previous').attr('disabled', 'disabled');
        if ( year != "" && title == "")        {
            searchByYear(movieResults.page);
        } else if (year == "" && title != "") {
            searchByTitle(movieResults.page);
        } else {
            alert("Please fill only one field!");
        }
    }

    if (movieResults.page === movieResults.total_pages)
        $('#next').attr('disabled', 'disabled');
    else{
        $('#next').attr('data-page', movieResults.page + 1);
        $('#next').removeAttr('disabled');
    }
};

var handlePaginationItemClicked = function (element) {
    var selectedPage = $(element).attr('data-page');
    loadPage(selectedPage);
};

// loadPage();
// loadResults();

//function switchPage(valueLink) { 
//    var pagea = $(valueLink).attr('value');
//
//    $('#spinner').show();
//    
//    $("#call_ajax").on("click", function(event){
//     event.preventDefault();
//    
//    $.ajax({
//           method: "GET",
//           url: "https://api.themoviedb.org/3/discover/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&include_adult=false&include_video=false&page=" + pagea + "&year=" + $('#byYear').val(),
//           dataType: 'text',
//           contentType: "application/json",
//           success: function(result){
//               
//           let movieResults = {data:JSON.parse(result),trigger:'Data'};
//               
//               $('#spinner').hide();
//               $('#results').empty();
//               $('#total_results').empty();
//               $('#total_pages').empty();
//               
//               $('#total_results').append("Total Results: " + movieResults.data.total_results + " movies");
//               $('#total_pages').append("Total Pages: " + movieResults.data.total_pages + " pages");
//               
//               for (var i=0; i< movieResults.data.results.length; i++ ){  
//                
//                   var shortDescription = jQuery.trim(movieResults.data.results[i].overview).substring(0, 100).trim(this) + "..."
//                
//                $('#results').append("<div class='media' onClick='getDetails(this);' data-value='" + movieResults.data.results[i].id + "'data-toggle='modal' data-target='#myModal'> <div class='media-left'> <img class='media-object' style='width:110px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body'> <h4 class='media-heading'>" + movieResults.data.results[i].title + "</h4> <p class='language'>" + movieResults.data.results[i].original_language + "</p> <p class='release_date'> |  " + movieResults.data.results[i].release_date + "</p> <p class='description'>" + shortDescription + "</p> <p class='total_votes'> |  Total votes: " + movieResults.data.results[i].vote_count +"</p><p class='vote_average'> Rating: " + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");
//                
//                $('#results').change(movieResults);
//                }
//            },
//           error: function (jqXHR, errorText, error) {
//           },
//    });
//  });
//}

