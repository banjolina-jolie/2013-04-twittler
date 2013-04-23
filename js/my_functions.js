var addTime = function(d) {
  d = d || new Date(), 
  hh = d.getHours(),
  m = d.getMinutes(),
  s = d.getSeconds(),
  dd = "AM",
  h = hh;
  
  if (h >= 12) {
    h = hh-12;
    dd = "PM";
  }
  
  if (h == 0) {
    h = 12;
  }
  m = m<10?"0"+m:m;

  s = s<10?"0"+s:s;

  var timePosted = h + ":" + m + ":" + s + dd;
  return timePosted;
}

var addTweetOnClick = function() {
  var theTime = addTime();
  var index = streams.home.length-1;
  var tweet = streams.home[index];

  var $tweet = $('<div class="actualTweets"></div>')
  $tweet.html(theTime + '<a class="timelineLink" data-user="' + tweet.user + '">@' + tweet.user + '</a>: ' + tweet.message);
  $tweet.prependTo($('div#bodyOfTweets'));
  generateRandomTweet();
  $("a").on("click", pullUpTimeline);
};

var printTweet = function() {
  var theTime = addTime();        
  var ownTweet = $('#writeOwnTweet').val();
  var $tweet = $('<div class="actualTweets" ></div>');
  $tweet.html(theTime + '<a class="timelineLink" data-user="me">@me</a>: ' + ownTweet);  
  

  
  if (ownTweet) {
    $tweet.prependTo($('div#bodyOfTweets'));
    writeTweet(ownTweet);
    $("a").on("click", pullUpTimeline);
  }
}

var goBackHome = function() {
  $('#goHome').hide();
  $("#buttonsAndInput").show();
  $('#bodyOfTweets').html("");

  var index = streams.home.length - 1;
        
  while(index >= 0){          
    var theTime = addTime();
    var tweet = streams.home[index];
    var $tweet = $('<div class="actualTweets"></div>');
    $tweet.html(addTime(tweet.created_at) + '<a class="timelineLink" data-user="' + tweet.user + '">@' + tweet.user + '</a>: ' + tweet.message);
    $tweet.appendTo($('div#bodyOfTweets'));
    index -= 1;
    $("a").on("click", pullUpTimeline);
  }
}


var pullUpTimeline = function() {
  //event.preventDefault();
  var user = $(this).data('user'); 
  $('#bodyOfTweets').html("");
  $("#buttonsAndInput").hide();
  $('#goHome').show();
  for(var key in streams.users){
    if(key === user){
      $.each(streams.users[key], function(key, value){
        $('#bodyOfTweets').prepend('<div class="actualTweets">' + addTime(value.created_at) + '<a class="timelineLink" data-user="' + value.user + '">@' + value.user + '</a>: ' + value.message + '</div>');
      });
    }
  }
}

var eraseAfterClick = function() {
  $("#writeOwnTweet").val(null);
};

var submitUserInput = function() {
  printTweet();
  eraseAfterClick();
}