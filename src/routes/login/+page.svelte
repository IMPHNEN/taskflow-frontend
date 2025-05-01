<script lang="ts">
    import { validator } from '@felte/validator-yup';
    import { createForm } from 'felte';
    import { object, string } from 'yup';

    const { form, errors, data, isSubmitting, isValidating, isValid } = createForm<{
        email: string
        password: string
    }>({
        onSubmit: (values, context) => {
			// submit
        },
        initialValues: {
            email: '',
            password: '',
        },
        extend: validator({
            castValues: true,
            schema: object({
                email: string().email().max(50).required().label('Email'),
                password: string().min(8).required().label('Password'),
            }),
        })
    });
</script>

<svelte:head>
	<title>Login to TaskFlow</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	<div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
		<div class="text-center mb-8">
			<h1 class="text-4xl font-semibold text-gray-900 mb-2">Login</h1>
			<p class="text-sm font-medium text-gray-500">Welcome back!</p>
		</div>

		<form use:form method="POST" class="space-y-5">
			<div class="space-y-1.5">
				<label for="email" class="text-sm font-medium text-gray-700">Email</label>
				<div class="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg {$errors.email && 'border border-red-500'}">
					<i class='bx bx-envelope text-gray-400'></i>
					<input
						id="email"
						type="email"
						name="email"
						required
						class="w-full text-gray-900"
					/>
				</div>
                {#if $errors.email}
                <span class="text-red-500 text-sm">
                    {$errors.email}
                </span>
                {/if}
			</div>

			<div class="space-y-1.5">
				<label for="password" class="text-sm font-medium text-gray-700">Password</label>
				<div class="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg {$errors.password && 'border border-red-500'}">
					<i class='bx bx-lock-alt text-gray-400'></i>
					<input
						id="password"
						type="password"
						name="password"
						required
						class="w-full text-gray-900"
					/>
				</div>
                {#if $errors.password}
                <span class="text-red-500 text-sm">
                    {$errors.password}
                </span>
                {/if}
			</div>

			<button
                disabled={$isSubmitting || $isValidating || !$isValid}
				type="submit"
				class="w-full py-3 px-4 mt-6 bg-[#2fcc71] disabled:opacity-50 text-white font-semibold rounded-lg hover:bg-[#27ae60] transition-colors text-base flex items-center justify-center gap-2"
			>
				Sign In
				<i class='bx bx-right-arrow-alt'></i>
			</button>

			<div class="flex items-center gap-4">
				<div class="flex-1 h-[1px] bg-gray-200"></div>
				<span class="text-sm font-medium text-gray-300">Or</span>
				<div class="flex-1 h-[1px] bg-gray-200"></div>
			</div>

			<button
				type="button" 
				class="w-full py-3 px-4 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-base flex items-center justify-center gap-2"
			>
				<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="w-5 h-5" />
				Continue with Google
			</button>

			<div class="text-center mt-6">
				<a href="/register" class="text-sm font-medium text-gray-600 hover:text-[#2fcc71] transition-colors">
					Don't have an account? <span class="text-[#2fcc71]">Register</span>
				</a>
			</div>
		</form>
	</div>
</div>