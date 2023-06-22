<template>
    <div class="bottom-bar">
        <div class="icons">
            <RouterLink to='/'>
                <button class="btn-nav" name="login">
                    <div class="icon" id="menu-icon"></div>
                    Меню
                </button>
            </RouterLink>
            <RouterLink to='/SpendingsPage'>
                <button class="btn-nav" name="login">
                    <div class="icon" id="spendings-icon"></div>
                    Траты
                </button>
            </RouterLink>
            <RouterLink to='/BasketPage'>
                <button class="btn-nav" name="login">
                    <div class="icon" id="basket-icon"></div>
                    Корзина
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  width: 100%;
  align-items: center;
  height: 50px;
  background: var(--navigation-bottom-color);
  border-radius: 30px 30px 0 0;
  z-index: 1;
  justify-content: center;
}

a {
    text-decoration: none;
    outline: 0;
    flex-grow: 1;   
    display: flex;
    background-color: none;
    flex-basis: 33%;
}
.icons {
    width: 100%;
    max-width: 800px;
    display: flex;
    justify-content: center;
}
a:active,
a:hover,
a::after {
    text-decoration: none;
    background-color: none;
    color: none;
    -webkit-tap-highlight-color: transparent;
}

.btn-nav {
    flex-grow: 1;
    color: var(--text-color);
    background-color: rgba(255, 255, 255, 0);
    border: none;
    outline: 0;
    border-radius: 10px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.7rem;
}

.icon {
    width: 25px;
    height: 25px;
    background-size: contain;
    background-repeat: no-repeat;
    align-self: center;
    margin-bottom: 3px;
    user-select: none;
}
</style>