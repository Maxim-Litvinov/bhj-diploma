/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.modal = this.element.closest('.modal');
    this.accountsList = this.element.querySelector('[name="account_id"]');
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    if (!this.accountsList) {
      return;
    }
    Account.list({}, (error, response) => {
      if (error) {
        throw new Error(error);
      }
      if (!response.success || response.data.length === 0) {
        return;
      }
      this.accountsList.innerHTML = response.data.reduce((acc, item) => acc + this.getAccount(item), '');
    });
  }

  getAccount(data) {
    return `<option value="${data.id}">${data.name}</option>`;
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (error) {
        throw new Error(error);
      }
      if (!response.success) {
        return;
      }
      this.element.reset();
      console.log(this.modal.dataset.modalId)
      App.getModal('newIncome').close();
      App.getModal('newExpense').close();
      App.update();
    });
  }
}
