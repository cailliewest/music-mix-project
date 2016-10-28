// GLOBAL VARIABLES //
var musicmix = {};

// FUNCTIONS //
musicmix.getLyrics = function(query) {
    $.ajax({
        type: 'GET',
        url: 'http://api.musixmatch.com/ws/1.1/track.search',
        data: {
            apikey: 'd1f1cb04d0c210368a40509a8dc77f76',
            q_lyrics: query,
            format: 'jsonp',
            s_track_rating: 'desc',
        },
        dataType: 'jsonp'    
    }).then(function(info) {
        // Track ID
        var heroLyrics = (info.message.body.track_list[0].track.lyrics_id);
        musicmix.trackID = (info.message.body.track_list[0].track.track_id);
        // console.log(heroLyrics);
    }).then(function() {
        // Lryics based on Track ID
        $.ajax({
            type: 'GET',
            url: 'http://api.musixmatch.com/ws/1.1/track.lyrics.get',
            data: {
                apikey: 'd1f1cb04d0c210368a40509a8dc77f76',
                format: 'jsonp',
                track_id: musicmix.trackID,
            },
            dataType: 'jsonp'
        }).then(function(lyrics) {
            musicmix.showLyrics(lyrics.message.body.lyrics.lyrics_body);
            // musicmix.showLyrics(musicmix.fullLyrics);
        })
    });
}

//.track.lyrics.get is second endpoint that receives track id

/* We need to make some sort of slider or something. Otherwise we won't
be able to show a large number of results in the draggable pane. We could
potentially research Flickity or another slider plugin, but we need to
make considerations for this BEFORE we begin populating the draggable 
pane DO NOT TRY AND POPULATE THE DRAGGABLE PANE WITHOUT DOING
THIS FIRST, IT WILL BE GAME OVER FOR YOU, I PROMISE. :) */

/* makeDraggable(): a function that initialize the draggable & droppable 
jqueryUI functionality and applies them to elements with a corresponding 
class. To be called in the init function. */


// DISPLAY LYRICS... TO BE TRIGGERED ON MOUSE CLICK LATER!
// split lyrics into an array, loop thru, display on page
musicmix.showLyrics = function splitString(results) {
    var $lyricsArray = results.split('\n');
    $lyricsArray.splice($lyricsArray.length-4)
    for (var i = 0; i < $lyricsArray.length; i++) {
        // create container for lyrics
        var $lyricsContainer = $('<h3>');
        $lyricsContainer.addClass('grid-cell-lyrics');
        // append string to lyricsContainer
        $($lyricsContainer).append($lyricsArray[i]);
        // append lyricsContainer to DOM
        $('.decorative-objects').append($lyricsContainer);
        $('decorative-objects').append($lyricsContainer);
    };
    
    console.log($lyricsArray);
    musicmix.drag();
    musicmix.drop();
};

// DISPLAY EMOJI... TO BE TRIGGERED ON MOUSE CLICK LATER!
musicmix.showEmoji = function() {
    for (var i = 127744; i <= 128591; i++) {
        // Create a Container for the Emoji
        var $emojiContainer = $('<div>');
        $emojiContainer.addClass('grid-cell-emoji');
    
        // Create The Emoji
        var $emoji = $('<div>');
        $emoji.addClass('emoji');
        $emoji.html('&#' + i + ';');

        $($emojiContainer).append($emoji);

        $('.decorative-objects').append($emojiContainer);
    }
    
    // Calls drag and drop functions once emoji's are populated dynamically
    musicmix.drag();
    musicmix.drop();
};

//Creating unsplash function (random links from unsplash).

musicmix.generateBackgrounds = function() {
    for (var i = 0; i < 20; i++) {
        // var urlRandom = "https://unsplash.it/640/480/?image="+(Math.floor(Math.random()*1084));
        var urlRandom = "https://source.unsplash.com/random/640x480?sig=" + (Math.floor(Math.random()*100));
    }
}

musicmix.showBackgrounds = function() { 
    //Make an empty array
    // var urlGallery = [];

    console.log("testing");

    var $imageContainer = $("<div>");
    $imageContainer.addClass("grid-cell-img");
    var $backgroundImg = $("<img>");
    $($backgroundImg).attr("src", urlRandom);
    $($imageContainer).append($backgroundImg);
    $(".decorative-objects").append($imageContainer);
     //Everytime when I loop, I get a random image and I push it into the empty array
    // urlGallery.push(`https://source.unsplash.com/random/640x480?sig=${urlRandom}`);

    // for (var i = 0; i < 20; i++) {
    //     // var urlRandom = "https://unsplash.it/640/480/?image="+(Math.floor(Math.random()*1084));
    //     var urlRandom = "https://source.unsplash.com/random/640x480?sig=" + (Math.floor(Math.random()*1084));
    //     var $imageContainer = $("<div>");
    //     $imageContainer.addClass("grid-cell-img");
    //     var $backgroundImg = $("<img>");
    //     $($backgroundImg).attr("src", urlRandom);
    //     $($imageContainer).append($backgroundImg);
    //     $(".decorative-objects").append($imageContainer);
    //      //Everytime when I loop, I get a random image and I push it into the empty array
    //     // urlGallery.push(`https://source.unsplash.com/random/640x480?sig=${urlRandom}`);
    // }

    // map through array and turn into 8 DOM elements

    var images = urlGallery.map(function(urlName) {
        return $(`<img src="${urlName}"/>`);
    });
    
    console.log(images); 
    console.log('url', urlGallery);  
    return images;
}
    //I should put these images in the container in order to be able to click on it


    //Change background of div card-builder

//makes emoji's and lyrics draggable 
musicmix.drag = function(drag) {
    $('.emoji').draggable({
        revert: 'invalid',
        helper: 'clone',
        containment:'.canvas-page'});

    $('.grid-cell-lyrics').draggable({
        revert: 'invalid',
        helper:'clone',
        containment:'.canvas-page'});

    // $('.emoji').draggable({ 
    //     opacity: 0.7, 
    //     helper: function(event) {
    //         return $(event.target).clone().css({
    //             width: $(event.target).width()
    //         });
            
    //     },
    //     containment:'.canvas-page',
    //     revert: 'invalid',
    // });  



};


musicmix.drop = function(drop) {
    $('.canvas').droppable({
        accept: '.emoji',
        drop:function(event,ui) {
            // var itemToClone = $(ui.draggable);

            // $(this).append(itemToClone.clone().css({
            //     width: itemToClone.width()
            // }))

            $(this).append($(ui.helper).clone());
            $('.emoji').append({
                top:0,
                left:0,
                // width: original
            })
            
            $('.emoji').draggable();
            $('.grid-cell-lyrics').draggable();

        }
    })
}

// reset canvas on click of 'reset' button
$('#reset').on('click', function(){
    $('.canvas').empty();
});


// return to front page
$('#newLyrics').on('click', function(){
    $('.canvas-page').fadeOut(300, function(){
        //canvas hidden
    });
    $('.entry-page').fadeIn(300, function(){
        //entry display
    });
})
 
// EVENTS //
musicmix.events = function() {
    /* On form submit: Function that checks the values entered into three 
    text fields by the user, passes this values as arguments to the 
    getLyrics function: musicmix.getLyrics(word1, word2, word3) */

    $('form').on('submit', function(e) {
        e.preventDefault();
        var lyricSearch1 = $('#firstWord[type=search]').val();
        var lyricSearch2 = $('#secondWord[type=search]').val();
        var lyricSearch3 = $('#thirdWord[type=search]').val();
        var lyricString = lyricSearch1.concat(" " + lyricSearch2 + " " + lyricSearch3);

        musicmix.getLyrics(lyricString);

    });
    
    // entry page fade out, canvas page fade in
    $('.main-btn').on('click', function(f){
        $('.entry-page').fadeOut(300, function(){
            //entry hidden
        });
        $('.canvas-page').fadeIn(300, function(){
            //canvas display
        });
    });

    /* On click of the lyrics tab: Take the output from the getLyrics
    function. Clear the draggable pane. Populate the draggable pane with html elements containing the song 
    lyrics */ 

    /* On click of the emojis tab: Clear the draggable pane. Populate
    the draggable pane with html elements containing each of the emoji
    using the alt-codes found at:
    http://character-code.com/emoticons-html-codes.php */

    /* On click of the background tab: Take the output from a call to
    Unsplash.it. Clear the draggable pane. Populate the draggable
    pane with html elements containing photos */

    //get random image from unsplash
    musicmix.randomIndex = function(){
        var randomNumber = Math.round(Math.random() * 1018);
        console.log(randomNumber);
    };

    // This function is responsible for clicking on nav and brings tool picker

    $('#lyricButton').on('click', function(e) {
        $('.decorative-objects').empty();
        $('#emojiButton, #bgButton').removeClass('active');
        $(this).addClass('active');
        musicmix.showLyrics();           
    });

    $('#emojiButton').on('click', function(e) {
        $('.decorative-objects').empty();
        $('#lyricButton, #bgButton').removeClass('active');
        $(this).addClass('active');
        musicmix.showEmoji();
    })

    $('#bgButton').on('click', function(e) {
        $('.decorative-objects').empty();
        $('#lyricButton, #emojiButton').removeClass('active');
        $(this).addClass('active');
        musicmix.showBackgrounds();

        //put 8 <img> elements from unsplash on the page using append
        // $('.decorative-objects').append(musicmix.showBackgrounds());

        // $('.decorative-objects').on('click', 'img', function() {
        //     console.log('TEST');

            // $('.canvas').css({'background': `url('${this.src}')`, 'background-repeat': 'no-repeat', 'background-size': 'cover'});         
        // });
    })

    $('.decorative-objects').on('click', 'img', function() {
            console.log('TEST');

            $('.canvas').css({'background': `url('${this.src}')`, 'background-repeat': 'no-repeat', 'background-size': 'cover'});  
    })

    //When a user clicks on "submit button", a canvas is created

    $('#publish').on('click', function() {
        console.log("TEST TEST");
        html2canvas($('.canvas'), {
            allowTaint:true,
            onrendered: function(canvas) {
            // var data = canvas.toDataURL();
            // // alert(data);
            $('.canvas-cell').append(canvas);
            }
        });
        $('.canvas-page').fadeOut(300, function() {
            console.log('hay');
        });
        $('.publish-page').fadeIn(300, function() {
            console.log('hi');
        });
    });
    
// then(function(canvas) {
//             document.getElementById('card-builder').append(canvas);
};

musicmix.hidden = function() {
    $('.canvas-page').fadeOut(0, function() {
        //canvas hidden on load
    });
    $('.publish-page').fadeOut(0, function() {

    });
};

musicmix.init = function() {
	// Call Functions
    // musicmix.hidden();
	musicmix.events();    
    // musicmix.showBackgrounds();
    musicmix.generateBackgrounds();

};

// DOCUMENT READY //
$(function() {
	musicmix.init();
});