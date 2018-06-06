$(function() { //shorter form for document ready

    $('#options').on('change', function(event) {

            $('.loader').append("<img id='loadimg' src='images/ajax-loader.gif'/>");


            event.preventDefault();
            $('.news').empty(); //clearing the content
            $('#logo').addClass('small-logo');
            $('.header-logo').addClass('logo-size');


            var newsType = this.value;
            var newsDisplayed = '';
            var url = 'https://api.nytimes.com/svc/topstories/v2/' + newsType + '.json';
            url += '?' + $.param({
                'api-key': '35e1fb8ac6084540ad1ad95055971524'
            });


            $.ajax({
                url: url,
                method: 'GET',
            }).done(function(data) {
                var imagesTrue = data.results.filter(function(imagesFilter) {
                    return imagesFilter.multimedia.length > 0;
                }).slice(0, 12)

                $.each(imagesTrue, function(index, value) {
                    newsDisplayed += '<li class="listed-news"><a href="' + value.url + '"><img src="' + value.multimedia[4].url + '"/></a><div class="abstract"><p>' + value.abstract + '</p></div></li>'
                })


                $('.news').append(newsDisplayed);


            }).fail(function() {
                $('.news').append(newsDisplayed);


            }).always(function() {
                $('#loadimg').remove();
            })
        }) //end of changing select event
}); //end of document ready