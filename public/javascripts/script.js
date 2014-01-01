var socket = io.connect('http://localhost:3000');

socket.on('message', function(data) {
    appendMessage(data['nickname'], data['message']);
});

function appendMessage(nickname, message) {
    $('.textContainer').append('<p>' + nickname + ' wrote ' +message + '</p>');
}

$(document).ready(function() {
    $('#send').prop("disabled", true);

    $('#nicknameButton').on('click', function() {
        var nickName = $('#nicknameBox').val();
        if (nickName != "") {
            socket.emit('setNickname', nickName);
            $('#send').prop("disabled", false);
            $('.nicknameSettings').hide();
        } else {
            alert('Nickname cannot be empty!');
        }
    });

    $('#send').on('click', function() {
        var messageInput = $('#messageBox').val();
        if (messageInput != '') {
            appendMessage("I", messageInput);
            socket.emit('message', messageInput);
        }
        $('#messageBox').val('');
    });
});