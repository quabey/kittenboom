import * as Colyseus from 'colyseus.js';
import { roomStore, chatMessages } from './../stores-game';
import { get } from 'svelte/store';

let client = new Colyseus.Client('ws://localhost:2567');

let room;
let error;

/**
 *
 * @param teststring
 */
export async function createOrJoin() {
	console.log('Joining game');

	try {
		room = await client.joinOrCreate('game');
		console.log(room.sessionId, 'joined', room.name);
	} catch (e) {
		console.log('JOIN ERROR', e);
		error = e;
	}
	while (true) {
		if (room) {
			roomStore.set(room);
			listenToMessages();
			return room;
		}
		if (error) {
			return error;
		}
	}
}

export async function getRooms() {
	let rooms;
	let error;

	try {
		rooms = await client.getAvailableRooms('game');
		console.log('ROOMS', rooms);
	} catch (e) {
		console.log('ROOMS ERROR', e);
		error = e;
	}
	while (true) {
		if (rooms) {
			return rooms;
		}
		if (error) {
			return error;
		}
	}
}

export async function joinRoom(roomId) {
	try {
		const room = await client.joinById(roomId, {});
		console.log('joined successfully', room);
		console.log(room);
		roomStore.set(room);
	} catch (e) {
		console.error('join error', e);
	}
}

export async function leaveRoom() {
	try {
		room = await client.leave(roomId, {});
		console.log('left successfully', room);
		console.log(room);
		roomStore.set(room);
	} catch (e) {
		console.error('leave error', e);
	}
}

export function sendMessage(type, message) {
	console.log('======= Sending message ========');
	room.send(type, message);
}

function listenToMessages() {
	room.onMessage('message', (message) => {
		console.log('received message', message);
	});

	room.onMessage('chat', (message) => {
		console.log('received chat', message);
		chatMessages.update((messages) => {
			messages.push(message);
			return messages;
		});
		console.log(get(chatMessages));
	});
}
