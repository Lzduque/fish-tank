/*global $, ace, userCode */

$(function() {
  //ACE Editor stuff
  var editor = ace.edit('editor');
  editor.setTheme('ace/theme/monokai');
  var session = editor.getSession();
  session.setTabSize(2);
  session.setUseSoftTabs(true);
  session.setMode('ace/mode/javascript');
  session.setUseWrapMode(true);
  editor.setValue(b64DecodeUnicode(userCode) || '');
  editor.clearSelection();

  function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  //Submit solution
  $('#solve').on('click', function() {
    var code = editor.getValue();
    //Caching this for later use in POST callback
    var btn = $(this);

    //Build POST payload
    var payload = {
      num: btn.data('num'),
      code: code,
    };

    btn.attr('disabled', 'disabled');
    $.post('/challenge/solve', payload, function(data) {
      if (data.result) {
        if (payload.num == 21) {
          window.location.href = '/complete';
          return true;
        }
        $('#output').addClass('success');
        if (data.allowNext) {
          $('#output').text('Congratulations! You solved the challenge! Try your next challenge NOW!');
          $('#hintBtn').remove();
          $('#sharing-container').show();
          $('#nextChallenge').show();
        } else {
          $('#output').text('Congratulations! You solved the challenge! Your next challenge unlocks tomorrow!');
          $('#hintBtn').remove();
          $('#sharing-container').show();
          $('#backToChallenges').show();
        }
        $('#prizeImg').show(); // maybe this can be used for social sharing
        $('#solve').remove();
      } else {
        //Womp womp, try again
        $('#output').text(data.message);
        btn.removeAttr('disabled');
      }
    }, 'json');
  });

  $('#hintBtn').on('click', function() {
    $('#hint').toggle();
  });

  $('#showGrid').on('click', function() {
    $('#gridText').slideDown();
    $('#showGrid').hide();
    $('#hideGrid').show();
  });

  $('#hideGrid').on('click', function() {
    $('#gridText').slideUp();
    $('#showGrid').show();
    $('#hideGrid').hide();
  });

  $('#showCode').on('click', function() {
    $('#gridCode').slideDown();
  });

  $('.hideMe').on('click', function() {
    $(this).parents('div').first().slideUp();
  });

  $('#backToChallenges').on('click', function() {
    window.location.replace('/');
  });

  $('#nextChallenge').on('click', function() {
    var nextChallenge = $(this).data('num') + 1;
    window.location.replace(`/challenge/${nextChallenge}`);
  });

});
