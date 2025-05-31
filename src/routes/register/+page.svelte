<script lang="ts">
    import { validator } from '@felte/validator-yup';
    import { createForm } from 'felte';
    import { object, string } from 'yup';
    import { register, getGitHubLoginUrl } from '$lib/actions/auth.actions';
    import { authStore } from '$lib/stores';

    let errorMessage: string | null = null;
    let githubLoading = false;

    // Subscribe to auth store to get error message
    $: if ($authStore.error) {
        errorMessage = $authStore.error;
    }

    const { form, errors, data, isSubmitting, isValidating, isValid } = createForm<{
        name: string
        email: string
        password: string
    }>({
        onSubmit: async (values) => {
            errorMessage = null;
            const result = await register(values.email, values.password, values.name);
            if (!result.success) {
                errorMessage = result.error || 'Registration failed';
            }
        },
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        extend: validator({
            castValues: true,
            schema: object({
                name: string().max(50).required().label('Name'),
                email: string().email().max(50).required().label('Email'),
                password: string().min(8).required().label('Password'),
            }),
        })
    });

    async function handleGitHubLogin() {
        try {
            githubLoading = true;
            const loginUrl = await getGitHubLoginUrl();
            window.location.href = loginUrl;
        } catch (error) {
            console.error('GitHub login error:', error);
            errorMessage = 'Failed to start GitHub login';
        } finally {
            githubLoading = false;
        }
    }
</script>

<svelte:head>
	<title>Register to TaskFlow</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 md:py-12">
	<div class="w-full md:max-w-md p-6 bg-white rounded-lg shadow-md">
		<div class="text-center mb-8">
			<h1 class="text-4xl font-semibold text-gray-900 mb-2">Register</h1>
			<p class="text-sm font-medium text-gray-500">Start your journey with us!</p>
		</div>

        {#if errorMessage}
        <div class="w-full p-3 mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {errorMessage}
        </div>
        {/if}

		<button
			type="button" 
			class="w-full py-3 px-4 mt-4 bg-black/90 border font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-white"
			on:click={handleGitHubLogin}
			disabled={githubLoading}
		>
		<i class="bx bxl-github text-2xl"></i>
			{githubLoading ? 'Loading...' : 'Register with GitHub'}
		</button>

		<div class="text-center mt-6">
			<a href="/login" class="text-sm font-medium text-gray-600 hover:text-[#2fcc71] transition-colors">
				Already have an account? <span class="text-[#2fcc71]">Login</span>
			</a>
		</div>
	</div>
</div>