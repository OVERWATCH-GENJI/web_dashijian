$(function () {
    var layer = layui.layer
    getData()
})
function getData() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (response) {
            if (response.status !== 0) {
                return layui.msg('获取用户失败')
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