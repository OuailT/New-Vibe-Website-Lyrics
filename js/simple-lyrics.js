const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const urlAPI = 'https://api.lyrics.ovh';


//Get Songs from Data
 async function searchSongs(term) {
 	const res = await fetch(`${urlAPI}/suggest/${term}`);
 	const data = await res.json();
 	console.log(data);
 	showData(data);

 }

//get More Songs Next Or prev
async function getMoreSongs(url) {
	const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
	const data = await res.json();

	showData(data);
}

//show data and artist in the DOM

function showData(data) {
	result.innerHTML = ` 
	<ul class ="songs">
	${data.data.map(song => `<li>
		<span><strong>${song.artist.name}</strong>-${song.title}</span>
	<button class ="btn" data-artist ="${song.artist.name}"
						 data-songtitle ="${song.title}" >Get lyrics</button>
	</li>`).join('')}
	`;

	if(data.prev || data.next) {
		more.innerHTML = `
	${data.prev ? `<button class="btn" onclick ="getMoreSongs('${data.prev}')" >Prev</button>` : ''}
	${data.next ? `<button class="btn" onclick ="getMoreSongs('${data.next}')">Next</button>` : ''}
		`;
	} else {
		more.innerHTML = '';
	}

}

// //Get Lyrics for Song
// async function getLyrics(artist, songTitle) {
// 	 const res = await fetch(`${urlAPI}/v1/${artist}/${songTitle}`);
//      const data = await res.json();
// }


//Event Listener

//Get lyrics Button Class
result.addEventListener('click', e => {
	const clickEL = e.target;
	//here we have target a button by using a tagName(we can also use ID )
	if(clickEL.tagName === 'BUTTON' ) {
	//here bringing attribue by getAttribue METHOD
	const artist = clickEL.getAttribute('data-artist');
	const songTitle = clickEL.getAttribute('data-songtitle');

	getLyrics(artist, songTitle);

	}

});

//Search Term 
form.addEventListener('submit', e => {
	e.preventDefault();

	const searchTerm = search.value.trim();

	if(!searchTerm){
		alert('Please type Artist or Song name');
	} else {
		searchSongs(searchTerm);
	}


});