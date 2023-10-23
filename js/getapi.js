function getData() {
    let url = 'https://dummyjson.com/comments?limit=5';
    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            let comentario = data.comments;
            console.log(comentario)

            let cards = ""
           
            comentario.forEach(function (lists) {
                cards += `

                    <article class="comentarios__card">
                        <div class="titulo">
                            <h3><i class="bi bi-person-fill"></i> ${lists.user.username}</h3>
                        </div>
                        <div class="description">
                            <p><i class="bi bi-chat-square-text-fill"></i> ${lists.body}.</p>
                        </div>
                    </article> `
            })
            document.getElementById('wrapper').innerHTML = cards
        })
}

getData()