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

//function truncateNumber(selector, maxLength) {
//                    var element = document.querySelector(selector),
//                        truncated = element.innerText;
//
//                    if (truncated.length > maxLength) {
//                        truncated = truncated.substr(0,maxLength) + ' ...'+ " >";
//                    }
//                    return truncated;
//                }

function searchByYear() { 
    
    $('#spinner').show();
    $.ajax({
           method: "GET",
           url: "https://api.themoviedb.org/3/discover/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&include_adult=false&include_video=false&page=1&year=" + $('#byYear').val() + "&page=1",
           dataType: 'text',
           contentType: "application/json",
           success: function(result){
           let movieResults = {data:JSON.parse(result),trigger:'Data'};
               $('#spinner').hide();
               $('#results').empty();
               $('#total_results').empty();
               $('#total_pages').empty();
               
               $('#total_results').append("Total Results: " + movieResults.data.total_results + " movies");
               
               for (var i=0; i< movieResults.data.results.length; i++ ){  
                
                   var shortDescription = jQuery.trim(movieResults.data.results[i].overview).substring(0, 100).trim(this) + "..."
                
                $('#results').append("<div class='media' onClick='getDetails(this);' data-value='" + movieResults.data.results[i].id + "'data-toggle='modal' data-target='#myModal'> <div class='media-left'> <img class='media-object' style='width:110px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body'> <h4 class='media-heading'>" + movieResults.data.results[i].title + "</h4> <p class='language'>" + movieResults.data.results[i].original_language + "</p> <p class='release_date'> |  " + movieResults.data.results[i].release_date + "</p> <p class='description'>" + shortDescription + "</p> <p class='total_votes'> |  Total votes: " + movieResults.data.results[i].vote_count +"</p><p class='vote_average'> Rating: " + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");
                   
                $('#results').change(movieResults);
                }
               
               for( var i=1; i <= movieResults.data.total_pages; i++){
                   $('#pageNumbers').append("<a href=''><span id='pageNr' value=" + i + " onClick='switchPage(this);'>" + i + "</span></a> ");
//         document.querySelector('#pageNumbers').innerText = truncateNumber('#pageNumbers', 4);
               }
               
            },
           error: function (jqXHR, errorText, error) {
                 toastr.error('Network error has occurred, please try again!');
           },
    });
}

function switchPage(valueLink) { 
    var pagea = $(valueLink).attr('value');

    $('#spinner').show();
    $.ajax({
           method: "GET",
           url: "https://api.themoviedb.org/3/discover/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&include_adult=false&include_video=false&page=" + pagea + "&year=" + $('#byYear').val(),
           dataType: 'text',
           contentType: "application/json",
           success: function(result){
               
           let movieResults = {data:JSON.parse(result),trigger:'Data'};
               
               $('#spinner').hide();
               $('#results').empty();
               $('#total_results').empty();
               $('#total_pages').empty();
               
               $('#total_results').append("Total Results: " + movieResults.data.total_results + " movies");
               
               for (var i=0; i< movieResults.data.results.length; i++ ){  
                
                   var shortDescription = jQuery.trim(movieResults.data.results[i].overview).substring(0, 100).trim(this) + "..."
                
                $('#results').append("<div class='media' onClick='getDetails(this);' data-value='" + movieResults.data.results[i].id + "'data-toggle='modal' data-target='#myModal'> <div class='media-left'> <img class='media-object' style='width:110px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body'> <h4 class='media-heading'>" + movieResults.data.results[i].title + "</h4> <p class='language'>" + movieResults.data.results[i].original_language + "</p> <p class='release_date'> |  " + movieResults.data.results[i].release_date + "</p> <p class='description'>" + shortDescription + "</p> <p class='total_votes'> |  Total votes: " + movieResults.data.results[i].vote_count +"</p><p class='vote_average'> Rating: " + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");
                
                $('#results').change(movieResults);
                }
            },
           error: function (jqXHR, errorText, error) {
           },
    });
}


function searchByTitle() {
    
    $('#spinner').show();
    $.ajax({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&language=en-US&query=" + $('#byTitle').val() + "&page=1&include_adult=false",
        dataType: 'text',
        contentType: "application/json",
        success: function(result){         
        let movieResults = {data:JSON.parse(result),trigger:'Data'};
            $('#spinner').hide();   
            $('#results').empty();
            $("#total_results").empty();
            $("#total_pages").empty();
            $("#total_results").append("Total Results: " + movieResults.data.total_results + " movies");
                
            for (var i=0; i< movieResults.data.results.length; i++ ){  
                  
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
