<script>
	import { sendMessage } from '$lib/gameserver.js';
	import { chatMessages, gameStates } from '../stores-game';
	import { players } from '../stores-players';
	let message;

	function sendChatMessage() {
		let newMessage = {
			name: $players[$gameStates.currentPlayer].name,
			message: message
		};
		sendMessage('chat', newMessage);
		message = '';
	}
</script>

<div class="bg-cyan-500">
	{#each $chatMessages as message}
		<div class="chatMessage">
			{#if message.name != 'server'}
				{message.name}
			{/if}
			{message.message}
		</div>
	{/each}
	<input type="text" bind:value={message} placeholder="Send a chat message" />
	<button on:click={sendChatMessage}>Send</button>
</div>
