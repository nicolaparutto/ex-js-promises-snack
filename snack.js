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

getPost(2)
	.then(response => console.log(response))
	.catch(error => console.log(error))