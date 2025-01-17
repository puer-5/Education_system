$(document).ready(function() {
    // 加载侧边栏
    $('.sidebar').load('../components/sidebar.html', function() {
        // 获取当前页面的文件名
        const currentPage = window.location.pathname.split('/').pop();
        // 激活当前页面对应的导航项
        $(`.nav-link[href="${currentPage}"]`).addClass('active').parent().addClass('active');
        
        // 为所有导航链接添加点击事件
        $('.nav-link').on('click', function(e) {
            e.preventDefault(); // 阻止默认跳转
            const href = $(this).attr('href');
            // 保存当前激活的页面到sessionStorage
            sessionStorage.setItem('activePage', href);
            // 执行页面跳转
            window.location.href = href;
        });
    });
}); 