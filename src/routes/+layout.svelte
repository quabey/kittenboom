<script>
	import '../app.postcss';
	import toast, { Toaster } from 'svelte-french-toast';
	import { cards } from '../stores-cards';
</script>

<Toaster />

<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

	:root {
		font-family: 'Inter', sans-serif;
	}

	:global(button) {
		appearance: none;
		background-color: #fafbfc;
		border: 1px solid rgba(27, 31, 35, 0.15);
		border-radius: 3px;
		box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
		box-sizing: border-box;
		color: #24292e;
		cursor: pointer;
		display: inline-block;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		list-style: none;
		padding: 4px 10px;
		position: relative;
		transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		vertical-align: middle;
		white-space: nowrap;
		word-wrap: break-word;
	}

	:global(button):hover {
		background-color: #f3f4f6;
		text-decoration: none;
		transition-duration: 0.1s;
	}

	:global(button):disabled {
		background-color: #fafbfc;
		border-color: rgba(27, 31, 35, 0.15);
		color: #959da5;
		cursor: default;
	}

	:global(button):active {
		background-color: #edeff2;
		box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
		transition: none 0s;
	}

	:global(button):focus {
		outline: 1px transparent;
	}

	:global(button):before {
		display: none;
	}

	:global(button):-webkit-details-marker {
		display: none;
	}
</style>
