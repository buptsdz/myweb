document.addEventListener("DOMContentLoaded", function() {
    var form = document.querySelector("#myform");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // 阻止表单的默认提交行为

        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;

        // 创建一个数据对象
        var data = {
            id: id,
            name: name,
            age: age
        };

        // 发送数据到服务器
        fetch("http://127.0.0.1:5000/insert", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("数据插入失败: " + error);
        });
    });
});

