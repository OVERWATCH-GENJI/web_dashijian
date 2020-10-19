$(function () {
    var layer = layui.layer
    getData()
    $('#btnLogout').on('click', function (e) {
        console.log(1);
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })
})
function getData() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (response) {
            if (response.status !== 0) {
                return layui.layer.msg('获取用户失败')
            }
            console.log(response);
            renderAvatar(response.data)
        }

    });
}
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎&nbsp;&nbsp${name}`)
    //按需渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}