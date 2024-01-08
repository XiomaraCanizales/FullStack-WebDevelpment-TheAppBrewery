// $('h1').css('color', 'red')
// $('h1').addClass("big-title margin-50")
// $('h1').removeClass("big-title margin-50")
// $('h1').text('Bye')

// $('button').html("hey")

// $('a').attr('href', 'https://www.yahoo.com')

$('h1').click(function() {
    $('h1').css('color', 'purple')
})

$('button').click(function() {
    $('h1').css('color', 'purple')
})

$(document).keypress(function(e) {
    $('h1').text(e.key)
})

$('h1').on('click', function() {
    $('h1').css('color', 'red')
})

$('h1').before('<h3>New H3</h3>')
$('h1').after('<h3>Other New H3</h3>')

//$('button').remove()
$('button').on('click', function() {
    //$('h1').animate({margin: 20})
    $('h1').slideUp().slideDown().animate({opacity: 0.3})
})