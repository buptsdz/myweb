// 当前显示的诗歌索引和每页显示的诗歌数量
let currentPageIndex = 0;
const poemsPerPage = 4;

// 获取诗歌容器和导航栏链接
const poemContainer = document.querySelector(".poem-container");
const pageLinks = document.querySelector(".pagination-bar");

function goToPage() {
	var pageInput = document.getElementById("pageInput").value;
	var maxLimit = Math.ceil(poemsData.length / poemsPerPage); // 修改最大值

	if (pageInput >= 1 && pageInput <= maxLimit) {
		// 输入在有效范围内，继续跳转逻辑
		currentPageIndex = parseInt(pageInput) - 1;
		setTimeout(function() {
			updatePoems(currentPageIndex);
		}, 120);

	} else {
		// 输入不在有效范围内，显示错误消息
		alert("请输入1到" + maxLimit + "之间的页码。");
	}
}

// 在页面加载时为所有具有.page-input类的输入字段应用最小和最大值限制
document.addEventListener("DOMContentLoaded", function() {
	var pageInputs = document.querySelectorAll(".page-input");
	var minLimit = 1;
	var maxLimit = Math.ceil(poemsData.length / poemsPerPage);

	pageInputs.forEach(function(input) {
		input.setAttribute("min", minLimit);
		input.setAttribute("max", maxLimit);
	});
});

function updatePoems(currentPageIndex) {
	const start = currentPageIndex * poemsPerPage;
	const end = start + poemsPerPage;
	const poemsToShow = poemsData.slice(start, end);

	// 获取加载提示元素
	const loading = document.querySelectorAll(".loading");

	// 显示加载提示
	loading.forEach(function(loading) {
		loading.style.display = "block";
	});

	// 清空诗歌容器
	poemContainer.innerHTML = "";
	// 清空导航栏链接
	pageLinks.innerHTML = "";
	// 延迟调用加载诗歌的函数和导航栏链接状态
	setTimeout(function() {
		loadPoems(poemsToShow);
		updatePageLinks();
		隐藏加载提示
		loading.forEach(function(loading) {
			loading.style.display = "none";
		});
	}, 70);
}

// 加载诗歌的函数
function loadPoems(poemsData) {
	poemsData.forEach(poem => {
		const scenesHtml = poem.scenes.map(scene => `<p>${scene}</p>`).join(''); // 使用循环显示多个 scene
		let contsonWithLinks = poem.contson; // 初始化为原始诗歌内容

		// 使用正则表达式查找并替换目标文字
		if (currentPageIndex == 18 && /枫红/g.test(contsonWithLinks)) {
			contsonWithLinks = contsonWithLinks.replace(/枫红/g,
				'<a href="#" class="customs-link" data-page="21">枫红</a>');
		}
		if (currentPageIndex == 20 && /枫红/g.test(contsonWithLinks)) {
			contsonWithLinks = contsonWithLinks.replace(/枫红/g,
				'<a href="#" class="customs-link" data-page="19">枫红</a>');
		}

		const poemHtml = `
	        <div class="sons">
	            <div class="cont">
	                <div id="${poem.id}">
	                    <p><a href="detail/${poem.id}.html" target="_blank"><b>${poem.b}</b></a></p>
	                    <div class="contson">${contsonWithLinks}</div>
	                </div>
	                <div class="scene">
	                    ${scenesHtml}
	                </div>
	            </div>
	        </div>
	    `;

		poemContainer.innerHTML += poemHtml;
		// 为所有带有 "custom-link" 类的链接添加点击事件处理程序
		const customLinks = document.querySelectorAll(".customs-link");
		customLinks.forEach(link => {
			link.addEventListener("click", function(event) {
				// 获取参数
				// 阻止默认行为，即不进行实际的页面跳转
				event.preventDefault();
				const datapage = event.target.getAttribute("data-page");
				currentPageIndex = parseInt(datapage) - 1;
				// 调用带有参数的函数
				setTimeout(function() {
					updatePoems(currentPageIndex);
				}, 120);
			});
		});

	});
}

// 更新导航栏链接
function updatePageLinks() {

	// 计算总页数
	const totalPages = Math.ceil(poemsData.length / poemsPerPage);

	// 最多显示的页码链接数量
	const maxPageLinks = 5; // 可根据需求调整

	// 计算起始和结束页码
	let startPage = Math.max(currentPageIndex - Math.floor(maxPageLinks / 2), 0);
	let endPage = Math.min(startPage + maxPageLinks - 1, totalPages - 1);

	// 如果末尾页数接近总页数，则调整起始页码
	if (endPage - startPage < maxPageLinks - 1) {
		startPage = Math.max(endPage - maxPageLinks + 1, 0);
	}

	// 创建首页链接
	const firstPageLink = document.createElement("a");
	firstPageLink.textContent = "首页"; // 修改为中文“首页”
	firstPageLink.addEventListener("click", function() {
		currentPageIndex = 0;
		setTimeout(function() {
			updatePoems(currentPageIndex);
		}, 150);
	});
	pageLinks.appendChild(firstPageLink);

	// 创建前一页链接
	const previousPageLink = document.createElement("a");
	previousPageLink.textContent = "<"; // 修改为中文“上一页”
	previousPageLink.addEventListener("click", function() {
		if (currentPageIndex > 0) {
			currentPageIndex--;
			setTimeout(function() {
				updatePoems(currentPageIndex);
			}, 150);
		}
	});
	pageLinks.appendChild(previousPageLink);

	// // 创建省略号（如果需要）
	// if (startPage > 1) {
	// 	const ellipsisStart = document.createElement("span");
	// 	ellipsisStart.textContent = "...";
	// 	pageLinks.appendChild(ellipsisStart);
	// }

	// 创建页码链接
	for (let i = startPage; i <= endPage; i++) {
		const pageLink = document.createElement("a");
		pageLink.textContent = i + 1;

		if (i === currentPageIndex) {
			pageLink.classList.add("active", "disabled");
		}

		// 添加点击事件监听器
		pageLink.addEventListener("click", function() {
			currentPageIndex = i;
			setTimeout(function() {
				updatePoems(currentPageIndex);
			}, 150);
		});

		pageLinks.appendChild(pageLink);
	}

	// // 创建省略号（如果需要）
	// if (endPage < totalPages - 1) {
	// 	const ellipsisEnd = document.createElement("span");
	// 	ellipsisEnd.textContent = "...";
	// 	pageLinks.appendChild(ellipsisEnd);
	// }

	// 创建下一页链接
	const nextPageLink = document.createElement("a");
	nextPageLink.textContent = ">"; // 修改为中文“下一页”
	nextPageLink.addEventListener("click", function() {
		if (currentPageIndex < totalPages - 1) {
			currentPageIndex++;
			setTimeout(function() {
				updatePoems(currentPageIndex);
			}, 150);
		}
	});
	pageLinks.appendChild(nextPageLink);

	// 创建末页链接
	const lastPageLink = document.createElement("a");
	lastPageLink.textContent = "尾页"; // 修改为中文“末页”
	lastPageLink.addEventListener("click", function() {
		currentPageIndex = totalPages - 1;
		setTimeout(function() {
			updatePoems(currentPageIndex);
		}, 150);
	});
	pageLinks.appendChild(lastPageLink);
}



//诗歌数据

const poemsData = [{
		id: "qiuyueye",
		b: "1.秋月谒",
		contson: "寒渚月三更，残秋雁影沉。<br>思汝如满月，清辉照我身。<br>晓梦觅无踪，迷蝶知天冷。<br>卧看银河月，千里作游魂。<br>",
		scenes: ["2019.10.18"],
	},
	{
		id: "guirenfu",
		b: "2.归人赋",
		contson: "平羌雁声回边碛，岭上花落谢秋柯。<br>寒霜似雪衰草凝，北风如刀万壑割。<br>长空报更鹤城外，月影独留车马辙。<br>恍尔听风催马行，且向秋波唱离歌。<br>",
		scenes: ["2019.10.22", "第二个场景的日期"],
	},
	{
		id: "yuegui",
		b: "3.月桂",
		contson: "寒风九卷寒入肠，吹来一夜桂枝香。<br>遥看宵光蟾宫满，回望觉凄加衣裳。<br>",
		scenes: ["2019.10"],
	},
	{
		id: "wuyeti",
		b: "4.乌夜啼",
		contson: "愁心接天一片，晚恨堆，无奈西山落雁几时回？<br>春花谢，随流水，无边泪，八班门口裴回只此悔！<br>",
		scenes: ["2019.10"],
	},
	{
		id: "shiyuehuaiwang",
		b: "5.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.1"],
	},
	{
		id: "shiyuehuaiwang",
		b: "6.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "7.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "8.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "9.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "10.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "11.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "12.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "13.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "14.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "15.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "16.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "17.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "18.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "19.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "20.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "21.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "22.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "23.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "24.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "25.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "26.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "27.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "28.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "29.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "30.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "31.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "32.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "33.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "34.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "35.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "36.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "37.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "38.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "39.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "40.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "41.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "42.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "43.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "44.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "45.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "46.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "47.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "48.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "49.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "50.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "51.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "52.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "53.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "54.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "55.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "56.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "57.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "58.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "59.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "60.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "61.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "62.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "63.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "64.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "65.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "66.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "67.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "68.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "69.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "70.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "71.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "shiyuehuaiwang",
		b: "72.十月怀往",
		contson: "九月忽辞去，清秋梦冯虚。<br>十年寒窗后，共赴花江曲。<br> 		",
		scenes: ["2019.10.12"],
	},
	{
		id: "guanfeng",
		b: "73.观风",
		contson: "晴空一洗碧，直望白云端。<br>绿影飘摇尽，杪舞逐风转。<br>流光正抚慰，阳昏分暖凉。<br>欲眠上善里，清风又穿堂。<br>",
		scenes: ["2021.4.29", "作于一节化学课"],
	},
	{
		id: "chunyu",
		b: "74.春雨",
		contson: "潮气夜生浸窗寒，淡云剪破孤玉盘。<br>星河隐没星辉落，人间灯火人声多。<br>愁眼不望山万重，此中无意待枫红。<br>今夜未知春气暖，一场春雨一场凉。<br>",
		scenes: ["2021.5.3", "作于二模前一天晚自习"],
	},
	{
		id: "yesi",
		b: "75.夜思",
		contson: "凉风起兮思成絮，飘飘随波自东西。<br>怅看暮云南山矮，夕阳淡挂林月稀。<br>平生笔下江流频，江流流去人代冥。<br>死生千古谁究竟，晨风依旧啭流莺。<br>",
		scenes: ["2021.5.4", "作于二模第一天晚自习"],
	},
	{
		id: "yan",
		b: "76.燕",
		contson: "晨曦唤晓雾，来去巢此屋。<br>啄毛啼自在，舐羽饮清渚。<br>春月等秋月，漫漫渐羽丰。<br>风吹日夜过，别时念吾庐。<br>",
		scenes: ["2021.5.6"],
	},
	{
		id: "xiayingchunchen",
		b: "77.夏迎春·晨",
		contson: "几星浅夜色，白鱼出平明。<br>苍苍雾天沉，许许凉风沾。<br>叶滴涵凼水，鸟声飞来回。<br>清气空林满，吐纳游冯虚。<br>",
		scenes: ["2021.5.13"],
	},
	{
		id: "xiayingchunyu",
		b: "78.夏迎春·雨",
		contson: "小雨轻点梦，沥沥溅微寒。<br>深浅积镜明，望去照天低。<br>昏眠风亦寝，回头树不摇。<br>万籁失言寂，只惟此声稠。<br>",
		scenes: ["2021.5.26", "作于三模第一天的午休"],
	},
	{
		id: "gaokaoqianerriyougan",
		b: "79.高考前二日有感",
		contson: "春夏不知数光阴，白云飘转空复晴。<br>蝉声高低催时日，莫使往去作愁情。<br>",
		scenes: ["2021.6.5", "作于晴朗的下午", "望向窗外的大杨树"],
	},
	{
		id: "zaju_chouya",
		b: "80.杂句",
		contson: "愁鸦栖上晚树，恨啼青空，日下依旧。<br>双手归置何处？笔唯默沉，欲言无由。<br>",
		scenes: ["2021.6.7", "作于数学考完后"],
	},
	{
		id: "gaokaoyougan",
		b: "81.高考有感",
		contson: "聚散如秋叶，吹风凋满楼。<br>我言枫红时，此身不应留。<br>长江滚滚东，何时反溯流？<br>诸事已流水，沽客听浪潮。<br>五弦自长夜，挥手一离别。<br>烟云明灭矣，归鸿目送吾。<br>",
		scenes: ["2021.6.10"],
	},
	{
		id: "liuyueershisanzhigan",
		b: "82.六月二十三之感",
		contson: "此间三年别京口，断望南山上善中。<br>转身弹指一卷毕，六月年年余热风。<br>",
		scenes: ["2021.6.23", "作于离开镇江回乡下的大巴上"],
	},
	{
		id: "yijiangnan_banchi",
		b: "83.忆江南",
		contson: "半尺明月半尺光，夜风泠泠扣小窗。<br>水月倾下江流寂，心事几许泪痕长。<br>楼台经年圮甲帐，清圆他乡僇人望。<br>淮水从此无归鸿，雁荡乍入谁梦乡？<br>",
		scenes: ["2021.6.29", "作于镇江乡下书桌窗前"],
	},
	{
		id: "xinchouliqiuzhishandongyougan",
		b: "84.辛丑立秋至山东有感",
		contson: "立秋忽已至，才觉夏蝉息。<br>秋风吹山石，风车迟缓缓。<br>今夜无江月，寒霜亦侵人。<br>行行千百里，愈遥竟无思。<br>遗憾曲江花，尽散天各涯。<br>只念庭前树，岁月何轻饶？<br>",
		scenes: ["2021.8.16", "作于火车上"],
	},
	{
		id: "bayuebanxiang",
		b: "85.八月半想",
		contson: "北都十五夜，月色漫孤云。<br>凉风吹襟动，路灯照不暖。<br>举头玉盘远，烟笼潭水寒。<br>星光几点闪，知是苍天泪。<br>",
		scenes: ["2021.9.21", "(农历八月十五)"],
	},
	{
		id: "wuti_beixiang",
		b: "86.无题",
		contson: "北向不记浙江海，月光倚斜照楼台。<br>萧萧风吹秋时雁，寒星明明降霜白。<br>",
		scenes: ["2021.10.24", "作于午夜", "望着窗外有感而发"],
	},
	{
		id: "yujinwanximenyiren",
		b: "87.予今晚西门一人",
		contson: "泠泠夜风响，潮气几多浓。<br>长道分北邮，灯黄似诉愁。<br>人来去又往，惟影伴相随。<br>空向此中泣，桃眼泪重重。<br>",
		scenes: ["2021.11.5", "作于北邮沙河校区"],
	},
	{
		id: "sixiaoqiyougan",
		b: "88.思小奇有感",
		contson: "凛冬偷将去，蛰惊嫌风寒。<br>只作京口别，朔雪看销尽。<br>千里遗憾事，不过苦向前。<br>人生如其快，一生是一世。<br>何须采鲜花，无花堪久岁。<br>时节吹花谢，灰烬满相思。<br>胜景盼看透，细水犹长流。<br>",
		scenes: ["2022.2.22", "作于山东"],
	},
	{
		id: "yefengjinan",
		b: "89.夜风寄南",
		contson: "星光泪点闪小窗，脉脉长河不见语。<br>寂寞孤身悲怆然，红目迷迷滞暗暝。<br>犹原今夜露水重，恋梦即场变为空。<br>白发只搔千丝乱，更如眠去数鹧鸪。<br>",
		scenes: ["2022.3.5", "作于一个伤心的午夜", "作于山东"],
	},
	{
		id: "putao",
		b: "90.葡萄",
		contson: "年盛如花开，瞑时欲重再。<br>十年苦心灌，他木不与栽。<br>问道何时熟？葡萄须静候。<br>失收早或知，吾非待结果。<br>遗憾千万种，世人皆不同。<br>岁月牵藤来，匆匆慨长唉。<br>",
		scenes: ["2022.3.7"],
	},
	{
		id: "jiayue",
		b: "91.佳月",
		contson: "(受gj所托，为他在前两句诗下补全此诗)<br>蟾宫月桂荫，佳人共此镜。<br>浮笑枕独臂，夜凉梦虚清。<br>",
		scenes: ["2022.4.22"],
	},
	{
		id: "wumianyexiang",
		b: "92.无眠夜想",
		contson: "两三夜蛙声，栖蝉远树鸣。<br>寐想时日近，天旷月一灯。<br>",
		scenes: ["2022.6.15", "(时日指模电考试)"],
	},
	{
		id: "shangxinqu",
		b: "93.伤心曲",
		contson: "暑日偷去秋微凉，夜风吹干泪面僵。<br>漆色怖怖星点隐，琉璃明明白灯辉。<br>闲来弄书看无心，遑卧翻覆未可眠。<br>谁谓伤心画不成？昏昏提笔诉几言。<br>",
		scenes: ["2022.8.24", "作于山东", "一个伤心的午夜"],
	},
	{
		id: "wuti_fengqiu",
		b: "94.无题",
		contson: "逢秋便知一岁少，旧忆凭栏叹江涛。<br>悲风吹去觉忽寄，长夜听霜凝芳草。<br>江水广怀空俗尘，蜉蝣汲营哀晦朝。<br>莫怪我辈惜金缕，也如浑碌随人潮。<br>",
		scenes: ["2022.9.23"],
	},
	{
		id: "qiusi",
		b: "95.秋思",
		contson: "黄叶荡入溪，天光渐已暝。<br>骤有大风起，土色俱飘零。<br>啧嘘行路难，秋深寒意兴。<br>旧忆多此景，望乡共天晴。<br>",
		scenes: ["2022.10.29", "作于大物期中考(结果只考了80)"],
	},
	{
		id: "chuchunyin",
		b: "96.初春吟",
		contson: "东风尚可劲，水面连波漪。<br>银杏芽未见，寒风画檐冰。<br>曦出送昏暝，飞雀始作嘤。<br>暖日尽其力，出门望晴星。<br>明年依旧景，共说小河听。<br>",
		scenes: ["2023.2.15", "作于工数期末考"],
	},
	{
		id: "youwuyi",
		b: "97.游五一",
		contson: "春光正好看天云，山头叠乱四望青。<br>风来欲意拂热燥，倒向此风借点清。<br>",
		scenes: ["2023.5.2"],
	},
	{
		id: "xinglunan",
		b: "98.行路难",
		contson: "繁叶说夏至，吾徒感伤时。<br>此方想光景，七年当游子。<br>行行路道远，回望思无边。<br>无边复无边，彼自有际遇。<br>多少平常日，未知是别时。<br>只道求学去，浮云再不会。<br>今夜案牍前，苦恨愁路难。<br>但愿君相伴，使我斩荆棘。<br>",
		scenes: ["2023.5.17"],
	},
	{
		id: "bayueshisanwangyue",
		b: "99.八月十三望月",
		contson: "明月明，幽夜蓝，几度回首几度叹。<br>淡云斜去，黄灯吹发，凉多梦潇然。<br>",
		scenes: ["2023.9.27 11:33"],
	},
	{
		id: "wuti_choulai",
		b: "100.无题",
		contson: "愁来似水断续流，身飘无根不尽忧。<br>嘻看去年笑颜盛，十五月明告以秋。<br>",
		scenes: ["2023.9.28 凌晨"],
	},
	{
		id: "shengshengmanzhongqiu",
		b: "101.声声慢·中秋",
		contson: "酌杯酒，愁路难，天意何处，无数苦泪自消受。<br>秋花谁怜？败叶满地。西风也笑我，不如放声歌。<br>",
		scenes: ["2023.9.28 凌晨"],
	},
	{
		id: "zhegutianqiuci",
		b: "102.鹧鸪天·秋词",
		contson: "	秋高天蓝空如练，眺望云缓，倦卧无心意。<br>歌台来远声，久滞目。清风不知忧，只是催人眠。<br>",
		scenes: ["2023.9.30 下午"],
	},

];