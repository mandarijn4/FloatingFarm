<template>
	<header>
		<nav class="navbar bg-light shadow row p-3 g-0">

			<!-- Left side: FF Logo -->
			<div class="col">
				<img alt="logo FF black on transparent" src="../../../assets/logoBlackOnTransparent.png" style="height: 50px;">
			</div>

			<!-- Center: Space for navigation -->
			<div class="col text-center">
				Possible | Navigation | Buttons
			</div>

			<!-- Right side: Account info and Auth -->
			<div class="col">
				<div style="float: right;">
					<AuthInformation />
				</div>
			</div>

		</nav>
	</header>
</template>

<script>
	import AuthInformation from './AuthInformation.vue';
	import { store } from '@/store';

	export default {
		name: 'NavBar',
		components: {
			AuthInformation
		},
		data() {
			return {
				authenticated: store.authenticated,
				username: store.username,
				roleTitle: store.roleTitle
			};
		}
	}
</script>
