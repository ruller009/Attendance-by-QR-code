var login_form = new Vue({
    el : '#login-form',
    data : {
        label_username : '',
        label_psw : ''
    },
    methods : {
        method1: function() {
            this.label_username = 'Mã số sinh viên:',
            this.label_psw = 'Mật khẩu của sinh viên:'
        },
        method2: function() {
            this.label_username = 'Mã số giảng viên nhà trường:',
            this.label_psw = 'Mật khẩu của giảng viên:'
        },
        method3: function(){
            this.label_username = 'Mã số của cán bộ nhân viên',
            this.label_psw = 'Mật khẩu đăng nhập:'
        }
    }
})