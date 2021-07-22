let container = document.getElementById('container1');
let body = document.getElementsByTagName('body')[0];

container.children[0].classList.add('bodySnake');
container.children[1].classList.add('headSnake');

container.children[7].classList.add('food');

let snake = [1, 0];

let newFood;

const mov = (inc) => {
    let remove;
    let comi;
    for (let index = 0; index < snake.length; index++) {


        if (index === 0) {


            container.children[snake[index]].classList.toggle('headSnake');
            snake.unshift(parseInt(container.children[snake[index]].textContent) + inc);
            container.children[snake[index]].classList.toggle('headSnake');

            if (container.children[snake[index]].classList.contains('food')) {
                comi = true;
                container.children[snake[index]].classList.toggle('food');
                newFood = Math.floor((Math.random() * (100-0))+0);
                container.children[newFood].classList.add('food');
            } else {
                comi = false;
            }

            

        } else {

            container.children[snake[index]].classList.toggle('bodySnake');


            if (!comi) {
                remove = snake.pop();
                container.children[remove].classList.toggle('bodySnake');
            }
            break;
        }

    }
}

let event_before = "ArrowRight";

body.addEventListener('keydown', (event) => {

    if (event.key === "ArrowRight") {
        if (event_before !== "ArrowLeft") {
            mov(1);
            event_before = event.key;
        }
    }
    if (event.key === "ArrowDown") {
        if (event_before !== "ArrowUp") {
            mov(17);
            event_before = event.key;
        }
    }
    if (event.key === "ArrowLeft") {
        if (event_before !== "ArrowRight") {
            mov(-1);
            event_before = event.key;
        }
    }
    if (event.key === "ArrowUp") {
        if (event_before !== "ArrowDown") {
            mov(-17);
            event_before = event.key;
        }
    }

})