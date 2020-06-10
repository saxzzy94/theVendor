getNews();
let newsArray = [];

async function getNews() {
    try {
        const res = await fetch("http://localhost:5000");

        const data = await res.json();
        data.forEach((news) => {
            title = news.title || 'This is my work'
            img = news.img || 'folder.jpg'
            let output = `
                <div class="card bg-dark text-white style="width: 300px">
                <div class="backdrop"></div>
                        <img src=${img} class="card-img" alt="lastest-news">
                        <div class="card-img-overlay">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">Last updated 3 mins ago</p>
                        </div>
                </div>
            `;
            let div = document.createElement("div");
            div.innerHTML = output;
            document.querySelector(".container").appendChild(div);
        });
    } catch (error) {
        console.log(error)
        let output = `<h1>${error} reload page</h1>  `;
        let div = document.createElement("div");
        div.innerHTML = output;
        document.querySelector(".container").appendChild(div);
    }
}
// console.log(newsArray)
// newsArray.forEach(news => {
//     console.log(news)
//     let output = `
//     <ul class="list-group">
//      <li class="list-group-item active">${data.title}</li> <div class="time">${data.time}</div>
//    </ul>
//     `
//    document.querySelector('.container').appendChild(output)
// });