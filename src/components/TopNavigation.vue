<template>
    <div class="main-nav">
        <h2>Столовка</h2>
        <RouterLink to="/">
            <button class="btn">
            <img class="icon" src="../icons/user.png" alt="+">
        </button>
        </RouterLink>
    </div>
</template>

<style scoped>
.main-nav {
  /* position: fixed; */
  top: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  color: black;
  font-size: 1.5rem;
  margin-top: 5vw;
  align-items: center;
  /* border-radius: 30px;
  box-shadow: 0 0 10px 0 rgb(0,0,0,0.);
  padding-left: 10px; */
  /* padding-right: 10px; */
}

h2 {
    font-weight: 400;
}

.icon {
    width: 25px;
    height: 25px;
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
    width: 50px;
    height: 50px;
}
</style>