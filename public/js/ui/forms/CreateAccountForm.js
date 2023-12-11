/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (error, response) => {
      if (error) {
        throw new Error(error);
      }
      if (!response.success) {
        return;
      }
      App.getModal('createAccount').close();
      this.element.reset();
      App.update()
    });
  }
}
