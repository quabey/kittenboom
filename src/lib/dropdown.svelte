<script>
	// =========== VARIABLES =========== //
	let isOpen = false;

	// =========== PROPS =========== //
	export let current = { title: 'Select', name: 'none' }; // default value
	export let options = [];
	export let width = '200px';
	export let current_name = 'none';

	// =========== FUNCTIONS =========== //
	/**
	 * Setting variable to selected option
	 * @param {object} option - The option to select
	 * @return {void}
	 * @function selectOption
	 * @description Setting variables to selected option, closing dropdown
	 */
	function selectOption(option) {
		current = option;
		current_name = option.name;
		isOpen = false;
	}
</script>

<!-- svelte-ignore a11y-positive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="dropdown" tabindex="1" on:blur={() => (isOpen = false)} style="--width:{width}">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="select" on:click={() => (isOpen = !isOpen)}>
		<span>{current.title}</span>
		<i class="fa fa-chevron-left" />
	</div>
	<input type="hidden" value={current} />
	<ul class="dropdown-menu" style="display: {isOpen ? 'block' : 'none'};">
		{#each options as option (option.name)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li id={option.name} on:click={() => selectOption(option)}>{option.title}</li>
		{/each}
	</ul>
</div>

<style>
	/*Styling Selectbox*/
	.dropdown {
		width: var(--width);
		display: inline-block;
		background-color: #fff;
		border-radius: 3px;
		box-shadow: 0 0 2px rgb(204, 204, 204);
		transition: all 0.5s ease;
		position: relative;
		font-size: 14px;
		color: #474747;
		height: 100%;
		text-align: left;
	}
	.dropdown .select {
		cursor: pointer;
		display: block;
		padding: 10px;
	}
	.dropdown .select > i {
		font-size: 13px;
		color: #888;
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		float: right;
		line-height: 20px;
	}
	.dropdown:hover {
		box-shadow: 0 0 4px rgb(204, 204, 204);
	}
	.dropdown:active {
		background-color: #f8f8f8;
	}
	.dropdown.active:hover,
	.dropdown.active {
		box-shadow: 0 0 4px rgb(204, 204, 204);
		border-radius: 2px 2px 0 0;
		background-color: #f8f8f8;
	}
	.dropdown.active .select > i {
		transform: rotate(-90deg);
	}
	.dropdown .dropdown-menu {
		position: absolute;
		background-color: #fff;
		width: 100%;
		left: 0;
		margin-top: 1px;
		box-shadow: 0 1px 2px rgb(204, 204, 204);
		border-radius: 0 1px 2px 2px;
		overflow: hidden;
		display: none;
		max-height: 144px;
		overflow-y: auto;
		z-index: 9;
	}
	.dropdown .dropdown-menu li {
		padding: 10px;
		transition: all 0.2s ease-in-out;
		cursor: pointer;
	}
	.dropdown .dropdown-menu {
		padding: 0;
		list-style: none;
	}
	.dropdown .dropdown-menu li:hover {
		background-color: #f2f2f2;
	}
	.dropdown .dropdown-menu li:active {
		background-color: #e2e2e2;
	}
</style>
