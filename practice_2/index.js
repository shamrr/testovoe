const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const getPosts = async () => {
    try{
        const response = await fetch(POSTS_URL);
        
        setTimeout(() => {
            toggleLoader();
        }, 2000)

        if (!response.ok) {
            throw new Error("Error!");
        }

        const posts = await response.json();

        setTimeout(() => {
            posts.forEach(post => {
                createPostElement(post.id, post.title, post.body);
            }) 
        }, 2000)
        
    } catch (error) {
        console.log("error", error);
    } finally {
        toggleLoader();
    }
}

const createPostElement = (id, title, body) => {
    const tableBody = document.querySelector('.table__body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>${body}</td>
    ` ;
    row.className = "table__row";

    tableBody.append(row);

    return tableBody;
}

getPosts();

//функционал для loader
const toggleLoader = () => {
    const loaderHTML = document.querySelector('#loader');
    const isHidden = loaderHTML.hasAttribute('hidden');

    if(isHidden) {
        loaderHTML.removeAttribute('hidden');
    } else {
        loaderHTML.setAttribute('hidden', '');
    }
}