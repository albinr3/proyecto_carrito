//Variables

const cart = document.querySelector("#carrito");
const cart_list = document.querySelector("#lista-carrito tbody");
const empty_cart = document.querySelector("#vaciar-carrito");
const courses_list = document.querySelector("#lista-cursos");
let cartItems = [];

loadEventListeners();

//Eventlisteners

function loadEventListeners() {

    //When you add a course clicking add to the cart
    courses_list.addEventListener("click", addCourse);
};

//functions

function addCourse(e) {
    e.preventDefault();

    const selected_course = e.target.parentElement.parentElement;

    if ( e.target.classList.contains("agregar-carrito") ) {
        readCourseData(selected_course);
    }
};

//read html, and get the course element

function readCourseData(course) {

    //make an object with the actual course info
    
    const courseInfo = {
        image : course.querySelector("img").src,
        title : course.querySelector("h4").textContent,
        price : course.querySelector(".precio span").textContent,
        id : course.querySelector("a").getAttribute("data-id"),
        quantity : 1
    };

    //add elements to the empty cartItems array

    cartItems = [...cartItems, courseInfo];

    cartHtml();
}

//Showing the cart items on the cart html

function cartHtml() {
    cartItems.forEach( course => {
        const cartRow = document.createElement("tr");
        cartRow.innerHTML = `
            <td>
                ${course.title}
            </td>
        `;
        cart_list.appendChild(cartRow);
    })
}
