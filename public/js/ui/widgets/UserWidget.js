/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    if (!element) {
      throw new Error(error);
    }
    this.element = element;
    this.userName = this.element.querySelector('.user-name');
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
  update(){
    const userData = User.current();
    if (!userData) {
      return;
    }
    if (!this.userName) {
      return;
    }
    this.userName.innerHTML = userData.name;
  }
}

