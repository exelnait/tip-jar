<script>
	import '../app.postcss';
</script>

<div class="w-full h-screen flex items-center flex-col p-10">
	<ul class="flex flex-row pt-6 px-4 gap-12 mb-10">
		<li><a href="/" class="underline text-indigo-400">Tip Jar</a></li>
		<li><a href="/withdraw" class="underline text-indigo-400">Withdraw</a></li>
	</ul>
	<div class="flex items-center flex-col">
		<slot />
	</div>
</div>
