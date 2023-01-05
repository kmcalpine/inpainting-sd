<script setup lang="ts"></script>

<template>
	<div id="logo-loading" class="spinner animated fadeIn">
		<svg width="40" height="40" viewBox="0 0 40 40">
			<!-- <rect width="40" height="40" class="rect" />  <- this looks buggy in retina safari -->
			<polygon points="0 0 0 40 40 40 40 0" class="rect"></polygon>
		</svg>
		<!-- <h6>LOADING</h6> -->
	</div>
</template>

<style scoped>
	svg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.rect {
		fill: none;
		stroke-width: 8px;
		stroke: white;
		stroke-dasharray: 40;
		stroke-dashoffset: 50%;
		-webkit-animation: movedash 1.5s forwards 0s infinite;
		animation: movedash 1.5s forwards 0s infinite;
	}

	@-webkit-keyframes movedash {
		to {
			stroke-dashoffset: 250%;
		}
	}

	@keyframes movedash {
		to {
			stroke-dashoffset: 250%;
		}
	}

	/* ================================= */
	/* :::::::::: 10. Loading :::::::::: */
	/* ================================= */

	.globload {
		background: #212121;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 100000;
		bottom: 0;
		left: 0;
		top: 0;
		right: 0;
	}

	.globload img {
		display: block;
		margin: auto;
		margin-bottom: 20px;
	}

	.spinner {
		font-size: 10px;
		height: 200px;
		width: 200px;
		position: absolute;
		margin: auto;
		text-align: center;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.ball-anim {
		width: 130px;
		height: 70px;
		padding-top: 80px;
		margin: 0 auto;
	}

	.ball {
		width: 0.8em;
		height: 0.8em;
		margin: 5px;
		border-radius: 50%;
		float: left;
	}
	.ball:nth-child(1) {
		background: #afc6d1;
		-webkit-animation: right 1s infinite ease-in-out;
		-moz-animation: right 1s infinite ease-in-out;
		animation: right 1s infinite ease-in-out;
	}

	.ball:nth-child(2) {
		background: #f8f8f8;
		-webkit-animation: left 1.1s infinite ease-in-out;
		-moz-animation: left 1.1s infinite ease-in-out;
		animation: left 1.1s infinite ease-in-out;
	}

	.ball:nth-child(3) {
		background: #afc6d1;
		-webkit-animation: right 1.05s infinite ease-in-out;
		-moz-animation: right 1.05s infinite ease-in-out;
		animation: right 1.05s infinite ease-in-out;
	}

	.ball:nth-child(4) {
		background: #f8f8f8;
		-webkit-animation: left 1.15s infinite ease-in-out;
		-moz-animation: left 1.15s infinite ease-in-out;
		animation: left 1.15s infinite ease-in-out;
	}

	.ball:nth-child(5) {
		background: #afc6d1;
		-webkit-animation: right 1.1s infinite ease-in-out;
		-moz-animation: right 1.1s infinite ease-in-out;
		animation: right 1.1s infinite ease-in-out;
	}

	.ball:nth-child(6) {
		background: #f8f8f8;
		-webkit-animation: left 1.05s infinite ease-in-out;
		-moz-animation: left 1.05s infinite ease-in-out;
		animation: left 1.05s infinite ease-in-out;
	}

	.ball:nth-child(7) {
		background: #afc6d1;
		-webkit-animation: right 1s infinite ease-in-out;
		-moz-animation: right 1s infinite ease-in-out;
		animation: right 1s infinite ease-in-out;
	}

	@-webkit-keyframes right {
		0% {
			-webkit-transform: translateY(-15px);
		}
		50% {
			-webkit-transform: translateY(15px);
		}
		100% {
			-webkit-transform: translateY(-15px);
		}
	}

	@-webkit-keyframes left {
		0% {
			-webkit-transform: translateY(15px);
		}
		50% {
			-webkit-transform: translateY(-15px);
		}
		100% {
			-webkit-transform: translateY(15px);
		}
	}

	@-moz-keyframes right {
		0% {
			-moz-transform: translateY(-15px);
		}
		50% {
			-moz-transform: translateY(15px);
		}
		100% {
			-moz-transform: translateY(-15px);
		}
	}

	@-moz-keyframes left {
		0% {
			-moz-transform: translateY(15px);
		}
		50% {
			-moz-transform: translateY(-15px);
		}
		100% {
			-moz-transform: translateY(15px);
		}
	}

	@keyframes right {
		0% {
			transform: translateY(-15px);
		}
		50% {
			transform: translateY(15px);
		}
		100% {
			transform: translateY(-15px);
		}
	}

	@keyframes left {
		0% {
			transform: translateY(15px);
		}
		50% {
			transform: translateY(-15px);
		}
		100% {
			transform: translateY(15px);
		}
	}

	.spinner h6 {
		font-family: "Lucida Grande", Lato, "Helvetica Neue", Arial, Verdana,
			sans-serif;
		font-weight: 300;
		font-size: 13px;
		color: #fff;
	}
</style>
