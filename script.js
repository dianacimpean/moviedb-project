var apiKey = "a8b96d868accfb62d4a1c7cec3d74994";

function getId() {
    var id=$(this).attr('id');
                console.log(id);
    
//    get: "get/movie/" + id
//     $('#casting-inform').val(detailREsult.cast);
}

function truncateText(selector, maxLength) {
                    var element = document.querySelector(selector),
                        truncated = element.innerText;
    
                    if (truncated.length > maxLength) {
                        truncated = truncated.substr(0,maxLength) + '...';
                    }
                    return truncated;
                }

function searchByYear() { 
    
    $.ajax({
           method: "GET",
           url: "https://api.themoviedb.org/3/discover/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&include_adult=false&include_video=false&page=1&year=" + $('#byYear').val(),
           dataType: 'text',
           contentType: "application/json",
           success: function(result){
           let movieResults = {data:JSON.parse(result),trigger:'Data'};
                
               $('#results').empty();
               
               $("#total_results").append("Total Results: " + movieResults.data.total_results + " movies");
               
               for (var i=0; i< movieResults.data.results.length; i++ ){  
                  
                $("#results").append("<div class='media'> <div class='media-left'> <img class='media-object' style='width:110px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body' id='" + movieResults.data.results[i].id + "'> <h4 class='media-heading'>" + movieResults.data.results[i].title + "</h4> <p class='language'>" + movieResults.data.results[i].original_language + "</p> <p class='release_date'> |  " + movieResults.data.results[i].release_date + "</p> <p class='description'>" + movieResults.data.results[i].overview + "</p> <p class='total_votes'> | Total votes: " + movieResults.data.results[i].vote_count +"</p><p class='vote_average'> Rating: " + movieResults.data.results[i].vote_average + "</p> <button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onClick='getId();'></button> </div> </div> <br>");
                
                document.querySelector('.description').innerText = truncateText('.description', 100);
                
                $("#results").change(movieResults);
                }
               
            },
           error: function (jqXHR, errorText, error) {
                 toastr.error('Network error has occurred please try again!');
           },
    });
}

    

function searchByKeyword() {
    $.ajax({
            method: "GET",
            url: "https://api.themoviedb.org/3/search/movie?api_key=a8b96d868accfb62d4a1c7cec3d74994&language=en-US&query=" + $('#byKeyword').val() + "&page=1&include_adult=false",
            dataType: 'text',
            contentType: "application/json",
            success: function(result){         
            let movieResults = {data:JSON.parse(result),trigger:'Data'};
                
            $('#results').empty();
               
            $("#total_results").append("Total Results: " + movieResults.data.total_results + " movies");
                
            for (var i=0; i< movieResults.data.results.length; i++ ){  
                  
            $("#results").append("<div class='media'> <div class='media-left'> <img class='media-object' style='width:110px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body' id='" + movieResults.data.results[i].id + "'> <h4 class='media-heading'>" + movieResults.data.results[i].title + "</h4> <p class='language'>" + movieResults.data.results[i].original_language + "</p> <p class='release_date'> |  " + movieResults.data.results[i].release_date + "</p> <p class='description'>" + movieResults.data.results[i].overview + "</p> <p class='total_votes'> |  Total votes: " + movieResults.data.results[i].vote_count +"</p><p class='vote_average'> Rating: " + movieResults.data.results[i].vote_average + "</p> <button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onClick='getId();'></button> </div> </div> <br>");
                
                $("#results").change(movieResults);
                }
            },
           error: function (jqXHR, errorText, error) {
                 toastr.error('Network error has occurred please try again!');
           },
    });
}


function searchByGenre() {
    $.ajax({
           method: "GET",
           url: testUrl,
           dataType: 'text',
           contentType: "application/json",
           success: function(result){
           let movieResults = {data:JSON.parse(result),trigger:'Data'};
              for (var i=0; i< movieResults.data.results.length; i++ ){  
                $('#results').empty();
                $("#results").append("<div class='media'> <div class='media-left'> <img class='media-object' style='width:60px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body' id='" + movieResults.data.results[i].id + "'> <h4 class='media-heading'>asta-i titlu:" + movieResults.data.results[i].title + "</h4> <p> " + movieResults.data.results[i].original_language + "</p> <p>" + movieResults.data.results[i].release_date + "</p> <p class='description'>" + movieResults.data.results[i].overview + "</p> <br> <button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onClick='getId();'>Open Modal</button> <p class='vote_average'>" + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");  
                
                $("#results").change(movieResults);
                }
            },
           error: function (jqXHR, errorText, error) {
                 toastr.error('Network error has occurred please try again!');
           },
    });
}
function searchByActor() {
    $.ajax({
           method: "GET",
           url: testUrl,
           dataType: 'text',
           contentType: "application/json",
           success: function(result){
           let movieResults = {data:JSON.parse(result),trigger:'Data'};
              for (var i=0; i< movieResults.data.results.length; i++ ){  
                $('#results').empty();  
                $("#results").append("<div class='media'> <div class='media-left'> <img class='media-object' style='width:60px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body' id='" + movieResults.data.results[i].id + "'> <h4 class='media-heading'>asta-i titlu:" + movieResults.data.results[i].title + "</h4> <p> " + movieResults.data.results[i].original_language + "</p> <p>" + movieResults.data.results[i].release_date + "</p> <p class='description'>" + movieResults.data.results[i].overview + "</p> <br> <button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onClick='getId();'>Open Modal</button> <p class='vote_average'>" + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");  
                
                $("#results").change(movieResults);
                }
            },
           error: function (jqXHR, errorText, error) {
                 toastr.error('Network error has occurred please try again!');
           },
    });
}

function searchByReleaseDate() {
    $.ajax({
           method: "GET",
           url: testUrl,
           dataType: 'text',
           contentType: "application/json",
           success: function(result){
           let movieResults = {data:JSON.parse(result),trigger:'Data'};
              for (var i=0; i< movieResults.data.results.length; i++ ){  
                $('#results').empty();  
                $("#results").append("<div class='media'> <div class='media-left'> <img class='media-object' style='width:60px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body' id='" + movieResults.data.results[i].id + "'> <h4 class='media-heading'>asta-i titlu:" + movieResults.data.results[i].title + "</h4> <p> " + movieResults.data.results[i].original_language + "</p> <p>" + movieResults.data.results[i].release_date + "</p> <p class='description'>" + movieResults.data.results[i].overview + "</p> <br> <button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal' onClick='getId();'>Open Modal</button> <p class='vote_average'>" + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");  
                
                $("#results").change(movieResults);
                }
            },
           error: function (jqXHR, errorText, error) {
                 toastr.error('Network error has occurred please try again!');
           },
    });
}