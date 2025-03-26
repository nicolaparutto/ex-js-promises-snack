/* 
🏆 Crea una funzione getPostTitle(id) che accetta un id e restituisce una 
Promise che recupera il titolo di un post dal link
https://dummyjson.com/posts/{id}

🎯 Bonus: Ottieni l'intero post con l'autore
Crea una funzione getPost(id) che recupera l'intero post. Concatena una 
seconda chiamata che aggiunge una proprietà user che contiene i dati 
dell'autore, recuperati dalla 
chiamata https://dummyjson.com/users/{post.userId}.
*/
//Esercizio base:
function getPostTitle(id) {
	return new Promise((resolve, reject) => {
		fetch(`https://dummyjson.com/posts/${id}`)
			.then(response => response.json())
			.then(data => resolve(data.title))
			.catch(error => reject(error))
	})
}

// getPostTitle(2)
// 	.then(response => console.log(response))
// 	.catch(error => console.error(error));

//Esercizio bonus:
function getPost(postId) {
	return new Promise((resolve, reject) => {
		fetch(`https://dummyjson.com/posts/${postId}`)
			.then(response => response.json())
			.then(postData => {
				fetch(`https://dummyjson.com/users/${postData.userId}`)
					.then(response => response.json())
					.then(userData => {
						const postUserData = {
							...postData,
							userData
						}
						resolve(postUserData)
					})
			})
			.catch(error => reject(error))
	})
}

//getPost(2)
//	.then(response => console.log(response))
//	.catch(error => console.log(error))


//================================================================================================


/*
🏆Crea la funzione lanciaDado() che restituisce una Promise che, 
dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, 
nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
Modifica la funzione in creaLanciaDado(), che restituisce 
una closure che memorizza l'ultimo risultato. Se il numero 
esce due volte di fila, stampa "Incredibile!".
*/

//Esercizio base:
function lanciaDado() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const dadoIncastrato = Math.random();
			if (dadoIncastrato < 0.2) {
				reject("Dado Incastrato!")
			} else {
				dadoLanciato = Math.floor(Math.random() * 6) + 1;
				resolve(dadoLanciato)
			}
		}, 3000)
	})
}

//lanciaDado()
//	.then(response => console.log(response))
//	.catch(error => console.log(error))

//Esercizio bonus:
const creaLanciaDado = () => {
	let ultimoLancio;
	return () => {
		lanciaDado()
			.then(dadoLanciato => {
				if (dadoLanciato === ultimoLancio) {
					console.log(`Wow! il dado che hai lanciato ha risultato:${dadoLanciato}, uguale al lancio di prima: ${ultimoLancio} `)
				} else {
					console.log(dadoLanciato)
				}
				ultimoLancio = dadoLanciato;
			})
			.catch(error => console.log(error))
	}
}

//const lanciaDadoSalvandoDati = creaLanciaDado()
//setInterval(lanciaDadoSalvandoDati, 1000)