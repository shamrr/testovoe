const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const container = document.querySelector('.container');

//получаем данные по url и для каждого post выводим строку в таблице
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

//создаем строку в таблице
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

const searchInTable = (event) => {
    const inputValue = event.target.value.toLowerCase();
    const errorMessage = createErrorMessage();

    if (!(inputValue.length > 0 && inputValue.length < 3)) {
        findInputValueInTheTable(inputValue);
        checkInputValueSize(errorMessage);
    } 

    checkInputValueSize(errorMessage);
}

//валидация инпута
const checkInputValueSize = (errorMessage) => {
    if (container.contains(errorMessage)) {
        container.removeChild(errorMessage);
    }

    if(!container.contains(errorMessage)) {
        container.prepend(errorMessage);
    } 
}

//создаем элемент с сообщением об ошибке
const createErrorMessage = () => {
    const errorMessage = document.createElement('div');
    errorMessage.classList = 'error';
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '1rem'
    errorMessage.innerText = 'Enter 3 or more characters!';
    errorMessage.style.position = 'absolute';
    errorMessage.style.top = '.5rem';
    errorMessage.style.left = '2rem';
    
    return errorMessage;
}

//поиск в таблице
const findInputValueInTheTable = (inputValue) => {
    const rows = document.querySelectorAll('.table__row');
    let found = false;

    rows.forEach(row => {
        const rowData = row.innerText.toLowerCase();
        
        if (rowData.includes(inputValue)) {
            row.style.display = '';
            found = true;
        } else {
            row.style.display = 'none';
        }
    })

    checkTableSize(found);
}

//проверка на наличие строк в таблице и вывод сообщения при их остутствии
const checkTableSize = (found) => {
    const message = document.querySelector('.message');

    if (!found && !message) {
        createMessageNothingToFound()    
    }  else if (found && message) {
        message.remove();
    }
}

//создаем элемент "ничего не найдено"
const createMessageNothingToFound = () => {
    const container = document.querySelector('.container');

    const el = document.createElement('span');
    el.innerText = 'Upss...Nothing found';
    el.classList = 'message'
    el.style.position = 'absolute';
    el.style.top = '50%';
    el.style.left = '50%';
    el.style.transform = 'translate(-50%, -50%)';

    container.append(el);
}


//функция сортировки
let isSorted = false;
let isAscending = true; 

const sortTable = (event) => {
    const columnName = event.target.innerText.toLowerCase();

    const tableBody = document.querySelector('.table__body');
    const tableRows = document.querySelectorAll('.table__row');

    const columns = ['id', 'title', 'body'];
    const columnNameIndex = columns.indexOf(columnName);

    if (columnName === columns[columnNameIndex]) {
        if (!isSorted) {
            let sortedRows = Array.from(tableRows)
                .slice(0)
                .sort((rowA, rowB) => {
                    return isAscending ? (rowA.cells[columnNameIndex].innerHTML - rowB.cells[columnNameIndex].innerHTML) : (rowB.cells[0].innerHTML - rowA.cells[0].innerHTML);
                });

            tableBody.innerHTML = '';
            tableBody.append(...sortedRows);

            isSorted = true;
        } else {
            isAscending = !isAscending;

            let sortedRows = Array.from(tableRows)
                .slice(0)
                .sort((rowA, rowB) => {
                    return isAscending ? (rowA.cells[0].innerHTML - rowB.cells[0].innerHTML) : (rowB.cells[0].innerHTML - rowA.cells[0].innerHTML);
                });

            tableBody.innerHTML = '';
            tableBody.append(...sortedRows);
        }
    }
};
