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

<div class="bg-cyan-200 w-[27vw] h-[70vh]">
	<h2 class="mx-3 mt-2 text-lg font-bold">Chat</h2>
	<div class="h-[61vh] overflow-auto flex-col-reverse flex">
		<div class="">
			{#each $chatMessages as message}
				<div class="chatMessage px-3 flex">
					{#if message.name != 'server'}
						<div class="font-bold pr-2">{message.name}:</div>
						{message.message}
					{:else}
						<div class="italic">
							{message.message}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<div class="flex place-items-center place-self-end">
		<input
			class="w-[22vw] m-2"
			type="text"
			bind:value={message}
			placeholder="Send a chat message"
		/>
		<button on:click={sendChatMessage}>Send</button>
	</div>
</div>
