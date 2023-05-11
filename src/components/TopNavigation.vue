<template>
    <div class="main-nav">
        <h2>Столовка</h2>
        <RouterLink to="/ProfilePage">
            <button class="btn">
            <img class="icon" src="../icons/user.png" alt="+">
        </button>
        </RouterLink>
    </div>
</template>

<style scoped>
.main-nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 7vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  color: black;
  font-size: 1rem;
  align-items: center;
  padding: 10px;
  background-color: rgb(255, 255, 255, 0.5);
  backdrop-filter: blur(15px);
  z-index: 1;
}

h2 {
    font-weight: 200;
}

.icon {
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    align-self: center;
    margin-bottom: 5px;
    user-select: none;
}

.btn {
    border-radius: 50%;
    background-color: rgb(231, 231, 231);
    border: none;
    width: 40px;
    height: 40px; 
}
</style>