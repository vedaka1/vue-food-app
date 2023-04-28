<template>
    <div class="main">
    <div class="nav-header">
      Столовка Сафу
    </div>
    <body>
        <form class="login">
            <div class="input-row">
                <input class="font" type="text" placeholder="Придумайте login" name="login" id="login">
                <input class="font" type="text" placeholder="email" name="email" id="email">
                <input class="font" type="password" placeholder="password" name="password" id="password">
            </div>
            <div class="btns">
                <RouterLink to='/'>
                    <button class="btn" name="register" id="register">Зарегистрироваться</button>
                </RouterLink>
            </div>
        </form>
    </body>
  </div>
</template>

<style scoped>

.font{
  font-size: 0.9em;
}
.nav-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 90vw;
  margin: 5vw;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: white;
  border-radius: 15px;
  background-color: rgb(0, 0, 0);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
  margin: 5vw;
  margin-top: 20vh;
  font-family: 'Roboto', sans-serif;
}

input {
  padding: 10px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  width: 100%;
  font-size: 1em;
  height: 50px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

input:focus {
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: 0;
}

.login .btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.btn {
  font-size: 0.9em;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  height: 50px;
  border-radius: 15px;
  margin: 10px 0 0 0;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgb(0, 0, 0);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

a {
    width: 48%;
}

.btn:hover {
  background-color: rgb(59, 59, 59);
}

.btns button:active {
  background-color: rgb(119, 119, 119);
}

</style>