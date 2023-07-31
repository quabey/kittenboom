<script>
	import { roomStore, roomsStore, toastSettings } from './../stores-game.js';
	import { goto } from '$app/navigation';
	import { Spinner } from 'flowbite-svelte';

	// =========== Gameserver API =========== //
	import { getRooms, createOrJoin, joinRoom, sendMessage } from '$lib/gameserver.js';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';

	let promise = getGameRooms();
	let loading = true;

	async function createOrJoinGame() {
		const room = await createOrJoin();
		console.log(room);
		console.log($roomStore);
		toast.success('Joined game', $toastSettings);
		handleJoinedGame();
	}

	async function getGameRooms() {
		const rooms = await getRooms();
		console.log(rooms);
		$roomsStore = rooms;
		toast.promise(
			promise,
			{
				loading: 'Getting rooms',
				success: 'Got rooms',
				error: 'Failed to get rooms'
			},
			$toastSettings
		);
	}

	onMount(() => {
		setTimeout(() => {
			loading = false;
		}, 1000);
	});

	function handleGetRooms() {
		promise = getGameRooms();
	}

	async function joinGameByID(id) {
		const room = await joinRoom(id);
		console.log('Room store', $roomStore);
		loading = true;
		setTimeout(() => {
			handleJoinedGame();
		}, 1000);
	}

	function handleJoinedGame() {
		loading = false;
		goto('/game');
	}

	function sendTestMessage() {
		console.log('Sending test message');
		sendMessage('test');
	}
</script>

<a href="/game"> Go to game</a>

<button on:click={createOrJoinGame}> Join random lobby </button>
{#await promise}
	<Spinner />
{:then rooms}
	{#if loading}
		<Spinner />
	{:else if $roomsStore.length > 0}
		{#each $roomsStore as room}
			<div>
				{room.name}
				{room.roomId}
				<button on:click={() => joinGameByID(room.roomId)}> Join </button>
			</div>
		{/each}
	{:else}
		<p>No rooms found</p>
	{/if}
{:catch error}
	<p>{error.message}</p>
{/await}

<button on:click={handleGetRooms}> Get Rooms </button>

<button on:click={sendTestMessage}> Send test message </button>
