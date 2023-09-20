const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const getPosts = async () => {
    try{
        const response = await fetch(POSTS_URL);

        if (!response.ok) {
            throw new Error("Error!");
        }

        const posts = await response.json();

        posts.forEach(post => {
            createPostElement(post.id, post.title, post.body);
        }) 

    } catch (error) {
        console.log("error", error);
    } finally {
        console.log("finally!");
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