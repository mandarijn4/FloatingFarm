<template>
    <!-- User is not authenticated -->
    <button v-if="!authenticated" v-on:click="signIn" class="ff-button">Log in</button>
    
    <!-- User is authenticated -->
    <div v-if="authenticated" class="text-center">
        {{ username }} ({{ roleTitle }})
        &nbsp;
        <button v-on:click="editProfile" class="ff-button">Edit profile</button>
        &nbsp;
        <button v-on:click="signOut" class="ff-button">Log out</button>
    </div>
</template>
  
<script>
    import { signIn, signOut, editProfile } from '@/apiConfig';
    import { store } from '@/store';

    export default {
        name: 'AuthInformation',
        data() {
            return {
                authenticated: store.authenticated,
                username: store.username,
                roleTitle: store.roleTitle
            };
        },
        methods: {
            async signIn() {
                signIn();
            },
            async signOut() {
                signOut();
            },
            async editProfile() {
                editProfile();
            }
        }
    }
</script>
