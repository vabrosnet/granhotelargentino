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

                    <article class="comentario">
                        <div class="card">
                            <div class="cover">
                                <h3>${lists.user.username}</h3>
                            </div>
                            <div class="description ">
                                <p>${lists.body}.</p>
                            </div>
                        </div>
                    </article> `
            })
            document.getElementById('cards').innerHTML = cards
        })
}

getData()