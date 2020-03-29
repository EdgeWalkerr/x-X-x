<script>
  let user = { loggedIn: false };

  function toggle() {
    user.loggedIn = !user.loggedIn;
  }
</script>

<button on:click={toggle}>Log {user.loggedIn ? 'out' : 'in'}</button>
