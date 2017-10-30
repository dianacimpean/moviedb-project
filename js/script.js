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

function truncateText(selector, maxLength) {
                    var element = document.querySelector(selector),
                        truncated = element.innerText;

                    if (truncated.length > maxLength) {
                        truncated = truncated.substr(0,maxLength) + '...';
                    }
                    return truncated;
                }

function truncateNumber(selector, maxLength) {
                    var element = document.querySelector(selector),
                        truncated = element.innerText;

                    if (truncated.length > maxLength) {
                        truncated = truncated.substr(0,maxLength) + '...' + maxLength + ">";
                    }
                    return truncated;
                }

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
                
                $('#results').append("<div class='media' onClick='getDetails(this);' data-value='" + movieResults.data.results[i].id + "'data-toggle='modal' data-target='#myModal'> <div class='media-left'> <img class='media-object' style='width:110px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body'> <h4 class='media-heading'>" + movieResults.data.results[i].title + "</h4> <p class='language'>" + movieResults.data.results[i].original_language + "</p> <p class='release_date'> |  " + movieResults.data.results[i].release_date + "</p> <p class='description'>" + movieResults.data.results[i].overview + "</p> <p class='total_votes'> |  Total votes: " + movieResults.data.results[i].vote_count +"</p><p class='vote_average'> Rating: " + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");
                                               
                document.querySelector('.description').innerText = truncateText('.description', 100);
                
                $('#results').change(movieResults);
                }
               
               for( var i=1; i <= movieResults.data.total_pages; i++){
                   $('#pageNumbers').append("<a href=''><span id='pageNr' value=" + i + " onClick='switchPage(this);'>" + i + "</span></a> ");
                   document.querySelector('#pageNumbers').innerText = truncateNumber('#pageNumbers', 4);
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
                
                $('#results').append("<div class='media' onClick='getDetails(this);' data-value='" + movieResults.data.results[i].id + "'data-toggle='modal' data-target='#myModal'> <div class='media-left'> <img class='media-object' style='width:110px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body'> <h4 class='media-heading'>" + movieResults.data.results[i].title + "</h4> <p class='language'>" + movieResults.data.results[i].original_language + "</p> <p class='release_date'> |  " + movieResults.data.results[i].release_date + "</p> <p class='description'>" + movieResults.data.results[i].overview + "</p> <p class='total_votes'> |  Total votes: " + movieResults.data.results[i].vote_count +"</p><p class='vote_average'> Rating: " + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");
                                               
                document.querySelector('.description').innerText = truncateText('.description', 100);
                
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
                  
                $("#results").append("<div class='media' onClick='getDetails(this);' data-value='" + movieResults.data.results[i].id + "'data-toggle='modal' data-target='#myModal'> <div class='media-left'> <img class='media-object' style='width:110px' src='http://image.tmdb.org/t/p/w92/" + movieResults.data.results[i].poster_path + "'/> </div><div class='media-body'> <h4 class='media-heading'>" + movieResults.data.results[i].title + "</h4> <p class='language'>" + movieResults.data.results[i].original_language + "</p> <p class='release_date'> |  " + movieResults.data.results[i].release_date + "</p> <p class='description'>" + movieResults.data.results[i].overview + "</p> <p class='total_votes'> |  Total votes: " + movieResults.data.results[i].vote_count +"</p><p class='vote_average'> Rating: " + movieResults.data.results[i].vote_average + "</p> </div> </div> <br>");
                
                document.querySelector('.description').innerText = truncateText('.description', 100);
                
                $("#results").change(movieResults);
                }
            },
        error: function (jqXHR, errorText, error) {
                 toastr.error('Network error has occurred please try again!');
        },
    });
}


/*
 * jQuery Pagination
 * Author: Austin Wulf (@austinwulf)
 *
 * Call the paginate method on an array
 * of elements. Accepts # of items per page
 * as an argument. Defaults to 5.
 *
 * Example:
 *     $(selector).paginate(3);
 *
 * Released under the MIT License.
 *
 * v 1.0
 */
//
//(function($){
//    
//    var paginate = {
//        startPos: function(pageNumber, perPage) {
//            // determine what array position to start from
//            // based on current page and # per page
//            return pageNumber * perPage;
//        },
//
//        getPage: function(items, startPos, perPage) {
//            // declare an empty array to hold our page items
//            var page = [];
//
//            // only get items after the starting position
//            items = items.slice(startPos, items.length);
//
//            // loop remaining items until max per page
//            for (var i=0; i < perPage; i++) {
//                page.push(items[i]); }
//
//            return page;
//        },
//
//        totalPages: function(items, perPage) {
//            // determine total number of pages
//            return Math.ceil(items.length / perPage);
//        },
//
//        createBtns: function(totalPages, currentPage) {
//            // create buttons to manipulate current page
//            var pagination = $('<div class="pagination" />');
//
//            // add a "first" button
//            pagination.append('<span class="pagination-button">&laquo;</span>');
//
//            // add pages inbetween
//            for (var i=1; i <= totalPages; i++) {
//                // truncate list when too large
//                if (totalPages > 5 && currentPage !== i) {
//                    // if on first two pages
//                    if (currentPage === 1 || currentPage === 2) {
//                        // show first 5 pages
//                        if (i > 5) continue;
//                    // if on last two pages
//                    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
//                        // show last 5 pages
//                        if (i < totalPages - 4) continue;
//                    // otherwise show 5 pages w/ current in middle
//                    } else {
//                        if (i < currentPage - 2 || i > currentPage + 2) {
//                            continue; }
//                    }
//                }
//
//                // markup for page button
//                var pageBtn = $('<span class="pagination-button page-num" />');
//
//                // add active class for current page
//                if (i == currentPage) {
//                    pageBtn.addClass('active'); }
//
//                // set text to the page number
//                pageBtn.text(i);
//
//                // add button to the container
//                pagination.append(pageBtn);
//            }
//
//            // add a "last" button
//            pagination.append($('<span class="pagination-button">&raquo;</span>'));
//
//            return pagination;
//        },
//
//        createPage: function(items, currentPage, perPage) {
//            // remove pagination from the page
//            $('.pagination').remove();
//
//            // set context for the items
//            var container = items.parent(),
//                // detach items from the page and cast as array
//                items = items.detach().toArray(),
//                // get start position and select items for page
//                startPos = this.startPos(currentPage - 1, perPage),
//                page = this.getPage(items, startPos, perPage);
//
//            // loop items and readd to page
//            $.each(page, function(){
//                // prevent empty items that return as Window
//                if (this.window === undefined) {
//                    container.append($(this)); }
//            });
//
//            // prep pagination buttons and add to page
//            var totalPages = this.totalPages(items, perPage),
//                pageButtons = this.createBtns(totalPages, currentPage);
//
//            container.after(pageButtons);
//        }
//    };
//
//    // stuff it all into a jQuery method!
//    $.fn.paginate = function(perPage) {
//        var items = $(this);
//
//        // default perPage to 5
//        if (isNaN(perPage) || perPage === undefined) {
//            perPage = 5; }
//
//        // don't fire if fewer items than perPage
//        if (items.length <= perPage) {
//            return true; }
//
//        // ensure items stay in the same DOM position
//        if (items.length !== items.parent()[0].children.length) {
//            items.wrapAll('<div class="pagination-items" />');
//        }
//
//        // paginate the items starting at page 1
//        paginate.createPage(items, 1, perPage);
//
//        // handle click events on the buttons
//        $(document).on('click', '.pagination-button', function(e) {
//            // get current page from active button
//            var currentPage = parseInt($('.pagination-button.active').text(), 10),
//                newPage = currentPage,
//                totalPages = paginate.totalPages(items, perPage),
//                target = $(e.target);
//
//            // get numbered page
//            newPage = parseInt(target.text(), 10);
//            if (target.text() == '«') newPage = 1;
//            if (target.text() == '»') newPage = totalPages;
//
//            // ensure newPage is in available range
//            if (newPage > 0 && newPage <= totalPages) {
//                paginate.createPage(items, newPage, perPage); }
//        });
//    };
//
//})(jQuery);
//
///* This part is just for the demo,
//not actually part of the plugin */
//$('.article-loop').paginate(2);