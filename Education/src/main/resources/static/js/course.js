let currentCourseId = null;

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadTeachers();
    loadCourses();
});

// 加载教师列表
function loadTeachers() {
    fetch('/api/teachers')
        .then(response => response.json())
        .then(data => {
            const select = document.querySelector('select[name="teacherId"]');
            select.innerHTML = '<option value="">选择教师</option>';
            data.forEach(teacher => {
                select.innerHTML += `<option value="${teacher.id}">${teacher.name}</option>`;
            });
        });
}

// 加载课程列表
function loadCourses(params = {}) {
    let url = '/api/courses';
    if (Object.keys(params).length > 0) {
        url += '?' + new URLSearchParams(params).toString();
    }
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const courseList = document.querySelector('.course-list');
            courseList.innerHTML = '';
            data.forEach(course => {
                courseList.innerHTML += createCourseCard(course);
            });
        });
}

// 创建课程卡片HTML
function createCourseCard(course) {
    return `
        <div class="course-card">
            <div class="course-icon">
                <i class="fas fa-book"></i>
            </div>
            <div class="course-info">
                <div class="course-name">${course.name}</div>
                <div class="course-details">
                    <span class="type-badge ${course.type === 'required' ? 'type-required' : 'type-optional'}">
                        ${course.type === 'required' ? '必修' : '选修'}
                    </span>
                    <span class="credit-badge">${course.credit}学分</span>
                    <span class="course-detail">
                        <i class="fas fa-user"></i>
                        ${course.teacherName}
                    </span>
                    <span class="course-detail">
                        <i class="fas fa-clock"></i>
                        ${course.hours}学时
                    </span>
                    <span class="course-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        ${course.place}
                    </span>
                </div>
            </div>
            <div class="action-buttons">
                <button class="btn btn-primary btn-sm" onclick="editCourse(${course.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteCourse(${course.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

// 显示添加课程模态框
function showAddCourse() {
    currentCourseId = null;
    document.getElementById('courseModalLabel').textContent = '添加课程';
    document.getElementById('courseForm').reset();
    new bootstrap.Modal(document.getElementById('courseModal')).show();
}

// 编辑课程
function editCourse(id) {
    currentCourseId = id;
    document.getElementById('courseModalLabel').textContent = '编辑课程';
    
    // 获取课程详情
    fetch(`/api/courses/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('获取课程信息失败');
            }
            return response.json();
        })
        .then(course => {
            const form = document.getElementById('courseForm');
            // 填充表单数据
            form.courseName.value = course.name;
            form.startDate.value = formatDate(course.startDate);
            form.teacherId.value = course.teacherId;
            form.hours.value = course.hours;
            form.place.value = course.place;
            form.description.value = course.description || '';
            form.status.value = course.status;
            form.type.value = course.type;
            form.credit.value = course.credit;
            
            // 显示模态框
            new bootstrap.Modal(document.getElementById('courseModal')).show();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('获取课程信息失败，请重试');
        });
}

// 保存课程
function saveCourse() {
    const form = document.getElementById('courseForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // 数据处理
    data.hours = parseInt(data.hours);
    data.credit = parseInt(data.credit);
    data.status = parseInt(data.status);
    
    const url = currentCourseId ? `/api/courses/${currentCourseId}` : '/api/courses';
    const method = currentCourseId ? 'PUT' : 'POST';
    
    // 发送请求
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('保存失败');
        }
        return response.json();
    })
    .then(result => {
        // 关闭模态框
        bootstrap.Modal.getInstance(document.getElementById('courseModal')).hide();
        // 刷新课程列表
        loadCourses();
        // 显示成功提示
        alert(currentCourseId ? '课程更新成功' : '课程添加成功');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('保存失败，请重试');
    });
}

// 格式化日期
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

// 验证表单数据
function validateForm(data) {
    if (!data.courseName || data.courseName.trim() === '') {
        alert('请输入课程名称');
        return false;
    }
    if (!data.teacherId) {
        alert('请选择授课教师');
        return false;
    }
    if (!data.hours || data.hours <= 0) {
        alert('请输入有效的课时数');
        return false;
    }
    if (!data.credit || data.credit <= 0) {
        alert('请输入有效的学分');
        return false;
    }
    if (!data.place || data.place.trim() === '') {
        alert('请输入上课地点');
        return false;
    }
    return true;
}

// 重置表单
function resetForm() {
    const form = document.getElementById('courseForm');
    form.reset();
    currentCourseId = null;
}

// 添加课程按钮点击事件
document.querySelector('.header-actions button').addEventListener('click', function() {
    resetForm();
    document.getElementById('courseModalLabel').textContent = '添加课程';
    new bootstrap.Modal(document.getElementById('courseModal')).show();
});

// 为模态框添加隐藏事件监听
document.getElementById('courseModal').addEventListener('hidden.bs.modal', function () {
    resetForm();
});

// 删除课程
function deleteCourse(id) {
    currentCourseId = id;
    new bootstrap.Modal(document.getElementById('deleteConfirmModal')).show();
}

// 确认删除
function confirmDelete() {
    if (!currentCourseId) return;
    
    fetch(`/api/courses/${currentCourseId}`, {
        method: 'DELETE'
    })
    .then(() => {
        bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
        loadCourses();
    });
}

// 搜索课程
function searchCourses() {
    const searchText = document.querySelector('.search-box input').value;
    const type = document.querySelector('select[value="type"]').value;
    const credit = document.querySelector('select[value="credit"]').value;
    
    loadCourses({
        search: searchText,
        type: type,
        credit: credit
    });
}

// 为搜索和筛选添加事件监听
document.querySelector('.search-box input').addEventListener('input', searchCourses);
document.querySelectorAll('.filters select').forEach(select => {
    select.addEventListener('change', searchCourses);
}); 