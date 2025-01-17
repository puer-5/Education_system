$(document).ready(function() {
    // 获取用户信息并显示
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    $('#userName').text(userInfo.nickname || '管理员');

    // 处理导航点击
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const page = $(this).data('page');
        
        // 移除所有active类
        $('.nav-link').removeClass('active');
        // 添加active类到当前点击项
        $(this).addClass('active');
        
        // 加载页面内容
        loadContent(page);
    });

    // 默认加载dashboard页面
    loadContent('dashboard');
});

// 加载页面内容
function loadContent(page) {
    $.ajax({
        url: `${page}.html`,
        method: 'GET',
        success: function(response) {
            // 直接更新主内容区域
            $('#mainContent').html(response);
            
            // 重新初始化页面特定的脚本
            initPageScripts(page);
        },
        error: function() {
            alert('页面加载失败');
        }
    });
}

// 初始化页面特定的脚本
function initPageScripts(page) {
    switch(page) {
        case 'teacher':
            // 初始化教师页面的特定功能
            if(typeof initTeacherPage === 'function') {
                initTeacherPage();
            }
            break;
        case 'student':
            // 初始化学生页面的特定功能
            if(typeof initStudentPage === 'function') {
                initStudentPage();
            }
            break;
        // 其他页面的初始化...
    }
}

// 退出登录
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.href = '/login.html';
} 