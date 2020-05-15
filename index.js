let app = angular.module('MyApp', [])

app.controller('MyController', function($scope, $http) {

    $scope.AddUser = {
        data: {
            genero: 'Masculino'
        },
        mensaje: '',
        enviar: AddUser
    }

    $scope.ShowUsers = {
        data: []
    }

    $scope.SearchUsers = {
        nombre: '',
        enviar: RequestUsers
    }

    $scope.DeleteUser = DeleteUser

    SUsers()
    
    function AddUser() {

        const user = $scope.AddUser.data

        $http.post('http://localhost:8080/user', user).then(resp => {

            const new_user = resp.data
            
            $scope.AddUser.mensaje = 'Usuario agregado: '+ new_user.nombre

            $scope.ShowUsers.data.push(new_user)

        }).catch(err => {

            $scope.AddUser.mensaje = 'Error al agregar usuario'
        
        })
    }

    function SUsers() {

        $http.get('http://localhost:8080/users').then(resp => {

            $scope.ShowUsers.data = resp.data

        }).catch(err => {

            $scope.ShowUsers.mensaje = 'Error al consultar usuarios'
        })
    }

    function RequestUsers(event) {

        if(event && event.keyCode != 13)
            return

        const name = $scope.SearchUsers.nombre

        $http.get('http://localhost:8080/users?nombre='+ name).then(resp => {
            
            $scope.ShowUsers.data = resp.data

        }).catch(err => {

            $scope.ShowUsers.mensaje = 'Error al consultar usuarios'

        })
    }
    
    function DeleteUser(usuario_id) {

        const users = $scope.ShowUsers.data

        $http.delete('http://localhost:8080/user/'+ usuario_id).then(resp => {
            
            $scope.ShowUsers.data = filtrarUsuario(users, usuario_id)
            $scope.ShowUsers.mensaje  ="Usuario eliminado"

        }).catch(err => {
            $scope.ShowUsers.mensaje  ="Error al eliminar usuario"
        })
    }

    function filtrarUsuario(users, usuario_id) {
        return users.filter(usuario => usuario._id != usuario_id)
    }
})