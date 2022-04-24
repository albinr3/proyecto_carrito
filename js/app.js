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

    //When you click delete one item of the cart
    cart.addEventListener("click", deleteCourse);

    //when you click empy cart
    empty_cart.addEventListener("click", () => {
        cartItems = []; //we empty the array

        cartHtml(); //we update the html
    
    });
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

    //check if the course already exist
    const exist = cartItems.some(course => course.id === courseInfo.id);
    if (exist) {
        //here we update the quantity
        const newCourse = cartItems.map( course => {
            if (course.id === courseInfo.id) {
                course.quantity++;
                return course; //returna el elemento duplicado agregando cantidad
            } else {
                return course; //retorna los elementos que no son los duplicados
            };
        });
        cartItems = [...newCourse]; //here we remplace all the items that where in the cart with the newcart
    } else {

    //add elements to the empty cartItems array
    cartItems = [...cartItems, courseInfo];
    };
    console.log(cartItems);
    //then after we add the course to the array, we ejecute the function to add the html
    cartHtml();
}

//Showing the cart items on the cart html

function cartHtml() {
    //empty the cart before add any item
    emptyCart();

    //making table rows and adding the courses to each rows
    cartItems.forEach( course => {
        //here we apply destructuring
        const {image, title, price, quantity, id} = course;
        const cartRow = document.createElement("tr");
        cartRow.innerHTML = `

            <td><img src="${image}" width=100></td>

            <td>${title}</td>

            <td>${price}</td>

            <td>${quantity}</td>

            <td>
                <a href="#" class="borrar-curso" data-id= ${id}> X </a>
            </td>
            
        `;
        cart_list.appendChild(cartRow);
    })
}

//empty the cart before add any item
function emptyCart() {
    //slow way
    // cart_list.innerHTML = "";

    //fast way
    while(cart_list.firstChild) {
        cart_list.removeChild(cart_list.firstChild);
    }
}

//delete one item of the cart

function deleteCourse(e) {
    e.preventDefault();

    if ( e.target.classList.contains("borrar-curso") ) {
        const courseId = e.target.getAttribute("data-id");
        
        //delete array elements by data-id
        cartItems = cartItems.filter( course => course.id !== courseId);
        cartHtml();
        
    };
}
