// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取学生ID
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    
    if (studentId) {
        loadStudentInfo(studentId);
    }
});

// 加载学生信息
function loadStudentInfo(id) {
    fetch(`/api/students/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('获取学生信息失败');
            }
            return response.json();
        })
        .then(student => {
            const form = document.getElementById('studentInfoForm');
            form.studentId.value = student.studentId;
            form.name.value = student.name;
            form.gender.value = student.gender;
            form.birthday.value = formatDate(student.birthday);
            form.major.value = student.major;
            form.class.value = student.class;
            form.phone.value = student.phone;
            form.email.value = student.email;
            form.address.value = student.address || '';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('加载学生信息失败，请重试');
        });
}

// 格式化日期
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

// 表单提交处理
document.getElementById('studentInfoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    const studentId = data.studentId;
    
    fetch(`/api/students/${studentId}`, {
        method: 'PUT',
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
    .then(() => {
        alert('保存成功');
        history.back();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('保存失败，请重试');
    });
}); 