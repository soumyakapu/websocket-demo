let sock = SockJS("http://localhost:8080/ws");
let client = Stomp.over(sock);
client.connect({}, frame => {
    client.subscribe("/public/message", payload => {
        let message_list = document.getElementById('message-list');
        let message = document.createElement('li');

        message.append(document.createTextNode(JSON.parse(payload.body).message));
        message_list.appendChild(message);
    })
})

function sendMessage() {
    let input = document.getElementById('message-input');
    let message = input.value;

    client.send('/app/message', {}, JSON.stringify({message: message}));
}