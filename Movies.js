const API_KEY = 'api_key=44975c4ef9a06eaac7c3f859384e1981&language=es-US&page=1';
const URLBASE = 'https://api.themoviedb.org/3';
const URLAPI =  URLBASE + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const buscarURL = URLBASE + '/search/movie?' + API_KEY;



const generos = [
    {
        "id":28,
        "nombre": "Accion"
    },
    {
        "id":12,
        "nombre": "Aventura"
    },
    {
        "id":35,
        "nombre": "Comedia"
    },
    
    {
        "id":18,
        "nombre": "Drama"
    },
    {
        "id":14,
        "nombre": "Fantasia"
    },
    {
        "id":27,
        "nombre": "Terror"
    },
    {
        "id":10751,
        "nombre": "Familia"
    },
    
    ]
//____________________

const main = document.getElementById('main')
const form = document.getElementById('form')
const buscar = document.getElementById('Buscar')
const etiquetasEL = document.getElementById('etiquetas') //nuevo

var selectedGeneros = []
setGenero();  
function setGenero() {
    etiquetasEL.innerHTML = '';
    generos.forEach(genero => {
        const t = document.createElement('div');
        t.classList.add('etiqueta');
        t.id=genero.id;
        t.innerText = genero.nombre;
        t.addEventListener('click', () => {
            if(selectedGeneros.length == 0){
                selectedGeneros.push(genero.id);
            }else{
                if(selectedGeneros.includes(genero.id)){
                    selectedGeneros.forEach((id, idx) => {
                        if(id == genero.id){
                            selectedGeneros.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGeneros.push(genero.id);
                }
            }
            console.log(selectedGeneros)

            getMovies(URLAPI + '&with_genres='+encodeURI(selectedGeneros.join(',')))
            highlightSelection()
        })
        etiquetasEL.append(t);
    })  
        }
        
function highlightSelection() {
    const etiquetas = document.querySelectorAll('.etiqueta');
    etiquetas.forEach(etiqueta => {
        etiqueta.classList.remove('highlight')
    })
    if(selectedGeneros.length !=0){
        selectedGeneros.forEach(id => {
            const hightlightedetiqueta = document.getElementById(id);
            hightlightedetiqueta.classList.add('highlight');
        })
    }
}


//__________________________________________
getMovies(URLAPI);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results)
        showMovies(data.results);
    })
}

function showMovies(data){
    main.innerHTML = '';
   

    data.forEach(movie =>{
        const{title, poster_path, vote_average, overview} = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">


        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getcolor(vote_average)}">${vote_average}</span>
            <input type="button" value ="Detalles" onclick="location.href='./Actors.html?${movie.id}'" class="btn btn-danger" 
            style = color:"red">
            
           
        </div>
        <div class="overview">
            <h3>Vista General</h3>
            ${overview};
        </div>
        
        
        `
        main.appendChild(movieEL);
 

    })
}

function getcolor(vote){
    if(vote>8){
        return 'green'
    }

}


form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const buscarpeli = buscar.value;


    if(buscarpeli) {
        getMovies(buscarURL + '&query='+buscarpeli)
    }

})

function sayhello(){
    console.log("hola como estas")
}


