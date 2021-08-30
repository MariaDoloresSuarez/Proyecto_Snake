import { createScore } from "./snakeAPI.js";
//usuario logueado:
const user_id = '151';
console.log("user juego" + user_id);

let container = document.getElementById('container1');
let body = document.getElementsByTagName('body')[0];

container.children[0].classList.add('bodySnake');
container.children[1].classList.add('headSnake');

container.children[7].classList.add('food');

let snake = [1, 0];

let newFood;

let score = 0;

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {

        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});


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
                score += 10;

                //para mostrar el score en pantalla       
                document.getElementById("spanScore").innerHTML = score;

                container.children[snake[index]].classList.toggle('food');
                newFood = Math.floor((Math.random() * (20 - 0)) + 0);
                //container.children[newFood].classList.add('food');

            } else {
                comi = false;
            }


            if (container.children[snake[index]].classList.contains('bodySnake')) {

                // alert("Game over");
                Toast.fire({
                    icon: 'error',
                    title: 'GAME OVER :( !!!'
                });

                //Para guardar el puntaje
                const hoy = new Date();
                const dia = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
                const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                const fecha = dia + ' ' + hora;
                console.log("hoy" + hoy);
                console.log("dia" + dia);
                console.log("hora" + hora);
                console.log("fecha" + fecha);
                (async () => {
                    console.log("usuario juego" + user_id);
                    console.log("puntaje juego" + score);
                    try {
                        console.log("entra crear juego");
                        const result = await createScore(
                            {
                                id_user: user_id,
                                puntos: score,
                                fecha: fecha
                            });
                        console.log("result puntaje" + result);
                        //  window.alert("Se guardó el puntaje");

                    } catch (err) {
                        return err;
                        //  window.alert("Error al guardar el puntaje");
                    }
                })();



            }

            // console.log(container);

            // if (snake[index] !== document.getElementById('container1')) {


            //     alert("Game over");

            // } else {

            // }


        } else {


            container.children[snake[index]].classList.toggle('bodySnake');

            if (!comi) {
                remove = snake.pop();
                container.children[remove].classList.toggle('bodySnake');
            }


            if (container.children[newFood].classList.contains('bodySnake')) {
                newFood = Math.floor((Math.random() * (20 - 0)) + 0);
                //container.children[newFood].classList.add('food');
            } else {
                container.children[newFood].classList.add('food');
            }

            break;


        }


    }

}


let event_before = "ArrowRight";

body.addEventListener('keydown', (event) => {

    event.preventDefault();
    //  event.stopPropagation();// evita la propagacion del evento
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