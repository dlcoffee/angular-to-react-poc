angularComponents.component('headingComponent', {
  template: `
    <nav style='border: 2px solid blue; padding: 2px;'>
      <div class="nav-wrapper">
        <h4>Todos App</h2>
        <span>{{todoCount()}} to be completed</span>
      </div>
    </nav
  `,
  controller: [
    '$scope',
    'todoStorage',
    function ($scope, todoStorage) {
      $scope.todoCount = () => {
        return todoStorage.todos.filter((todo) => !todo.completed).length
      }
    },
  ],
})

angularComponents.component('mainComponent', {
  template: `
    <main style='margin: 16px auto; max-width: 400px;'>
      <form ng-submit="addTodo()">
        <input placeholder="Add Todo" ng-model="newTodo" autofocus style='width: 100%;'>
      </form>

      <ul class="todo-list">
        <li ng-repeat="todo in todos">
          <div class="view">
            <input type="checkbox" ng-model="todo.completed">
            <button ng-click="setEditing(todo)" ng-disabled="todo === editingTodo">Edit</button>
            <button ng-click="removeTodo(todo)">&times;</button>

            <label ng-if="todo !== editingTodo">{{todo.title}}</label>

            <form ng-if="todo === editingTodo" style='display: inline;' ng-submit="finishEditing()">
              <input type="text" ng-model="todo.title" ng-blur="finishEditing()"></input>
            </form>
          </div>
        </li>
      </ul>
    </main>
  `,
  controller: [
    '$scope',
    'todoStorage',
    function ($scope, todoStorage) {
      this.$onInit = function () {
        // console.log($scope.todos)
      }

      $scope.todos = todoStorage.todos
      $scope.newTodo = ''
      $scope.editingTodo = null

      $scope.addTodo = () => {
        const todo = {
          title: $scope.newTodo,
          completed: false,
        }

        $scope.todos.push(todo)

        $scope.newTodo = ''
      }

      $scope.setEditing = (todo) => {
        $scope.editingTodo = todo
      }

      $scope.finishEditing = () => {
        $scope.editingTodo = null
      }

      $scope.removeTodo = (todo) => {
        $scope.todos.splice($scope.todos.indexOf(todo), 1)
      }
    },
  ],
})
