function goToPage() {
    var pageInput = document.getElementById("pageInput").value;
    var maxLimit = 26; // 修改最大值

    if (pageInput >= 1 && pageInput <= maxLimit) {
        // 输入在有效范围内，继续跳转逻辑
        var page=parseInt(datapage) - 1;
        ;
    } else {
        // 输入不在有效范围内，显示错误消息
        alert("请输入1到" + maxLimit + "之间的页码。");
    }
}

// 在页面加载时为所有具有.page-input类的输入字段应用最小和最大值限制
document.addEventListener("DOMContentLoaded", function () {
    var pageInputs = document.querySelectorAll(".page-input");
    var minLimit = 1;
    var maxLimit = 26;

    pageInputs.forEach(function (input) {
        input.setAttribute("min", minLimit);
        input.setAttribute("max", maxLimit);
    });
});
