// 教师页面初始化函数
function initTeacherPage() {
    // 显示添加教师模态框
    window.showAddTeacher = function() {
        $('#teacherModal').modal('show');
    };

    // 保存教师信息
    window.saveTeacher = function() {
        const formData = $('#teacherForm').serialize();
        
        $.ajax({
            url: '/api/teachers',
            method: 'POST',
            data: formData,
            success: function(response) {
                if(response.success) {
                    $('#teacherModal').modal('hide');
                    loadTeachers();
                    alert('教师添加成功！');
                } else {
                    alert(response.message || '添加失败，请重试！');
                }
            },
            error: function() {
                alert('系统错误，请稍后重试！');
            }
        });
    };

    // 加载教师列表
    loadTeachers();
}

// 加载教师列表
function loadTeachers() {
    $.ajax({
        url: '/api/teachers',
        method: 'GET',
        success: function(response) {
            updateTeacherList(response.data);
        }
    });
}

// 更新教师列表显示
function updateTeacherList(teachers) {
    const teacherList = $('.teacher-list');
    teacherList.empty();
    
    teachers.forEach(teacher => {
        // 构建教师卡片HTML
        const teacherCard = `
            <div class="teacher-card">
                <!-- 教师卡片内容 -->
            </div>
        `;
        teacherList.append(teacherCard);
    });
} 