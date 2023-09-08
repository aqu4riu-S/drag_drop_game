const draggableList = document.querySelector('#draggable-list');
const check = document.querySelector('#check');

const top10Songs = [
    'Video Games',
    'The Greatest',
    'West Coast',
    'Norman Fucking Rockwell',
    'Off to the Races',
    'Ride',
    'High by the Beach',
    'Brooklyn Baby',
    'Venice Bitch',
    'Born to Die'
]

const listItems = [];

let dragStartIndex;


createList();


function createList() {
    [...top10Songs]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((curr, next) => {
            return curr.sort - next.sort;
        })
        .map(a => a.value)
        .forEach((song, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index+1}</span>
                <div class="draggable" draggable="true">
                    <p class="song">${song}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);
            draggableList.appendChild(listItem);
        });


        addEventListeners();
}




function dragOver(e) {
    e.preventDefault();
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragStart() {
    dragStartIndex = this.closest('li').getAttribute('data-index');
}

function dragDrop() {
    const dragEndIndex = this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}


function swapItems(fromIdx, toIdx) {
    const itemOne = listItems[fromIdx].querySelector('.draggable');
    const itemTwo = listItems[toIdx].querySelector('.draggable');

    listItems[fromIdx].appendChild(itemTwo);
    listItems[toIdx].appendChild(itemOne);

}



function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });


    dragListItems.forEach(item => {
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('dragover', dragOver);
    });
}



check.addEventListener('click', (e) => {
    draggableList.querySelectorAll('li').forEach((item, index) => {
        if (item.querySelector('.song').textContent === top10Songs[index]) {
            item.classList.remove('wrong');
            item.classList.add('right');
        }

        else {
            item.classList.remove('right');
            item.classList.add('wrong');
        }
    })
})