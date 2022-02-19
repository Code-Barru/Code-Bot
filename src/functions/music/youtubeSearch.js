
const axios = require('axios');

async function searchPlaylist(playlistId, maxResults, nextPageToken) {

	var url =`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=`

			//  'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&pageToken=EAAaBlBUOkNESQ&playlistId=PLGoyJJCkcbJDXSFgOGuKj0_TdmZmvFt9y&key=AIzaSyAKvml1dgM6PoE8ILHkTcCvfcuyixPtNgA'
			//  'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&pageToken=EAAaBlBUOkNESQ&playlistId=PLGoyJJCkcbJDXSFgOGuKj0_TdmZmvFt9y&key=AIzaSyAKvml1dgM6PoE8ILHkTcCvfcuyixPtNgA'

	if(!nextPageToken)
		url += `${maxResults}&playlistId=${playlistId}&key=${process.env.API_YOUTUBE}`
	else
		url += `${maxResults}&pageToken=${nextPageToken}&playlistId=${playlistId}&key=${process.env.API_YOUTUBE}`	

	data = await axios.get(url).then(res => {
		return res.data;
	}).catch(error => {
		console.log(error);
	})

	return data;
}

async function search(q, maxResults) {
	
	const url = encodeURI(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${q}&key=${process.env.API_YOUTUBE}`)

	data = await axios.get(url).then(res => {
		return res.data;
	}).catch(error => {
		console.log(error);
	})

	return data;
}

module.exports.searchPlaylist = searchPlaylist;
module.exports.search = search