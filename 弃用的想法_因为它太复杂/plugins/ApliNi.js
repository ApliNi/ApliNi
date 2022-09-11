/* 
 * 全局变量
 * 2022年6月6日
 */
let $loading = false;
let $c = {
	"Page": { //分页
		'min': 0,
		"now": 0,
		"max": 0,
	},
	"Paper": null, //当前文章id
};



//从url中获取配置 - 2022年6月6日
getUrlConfig();
function getUrlConfig(){
	//从url中获取配置
	$c.Page.now = Number(getUrl('p')) || 0;
	$c.Paper = Number(getUrl('w')) || 0;
	
	//应用配置
	if($c.Paper !== 0){
		LoadPaper(); //加载文章
	}else if($c.Page !== 0){
		LoadPage(); //加载主页面
	}
};



/*
 * 加载主页面
 * 2022年6月6日
 */
function LoadPage($additional){
	//开始加载, 防止其他程序运行
	if($loading === true) return;
	$loading = true;

	//创建配置
	let $io = JSON.stringify({
		'Mode': 'loadPage',
		'Config': {
			'Page': $c.Page.now,
			'PaperNum': 10, //需要加载的文章数
		},
	});
	
	//AJAX
	let $xhr = new XMLHttpRequest();
	$xhr.open('post', 'cake/ApliNi_FastLoad.php');
	let $data = new FormData()
		$data.append('io', $io)
	$xhr.send($data);
	$xhr.onloadend = function(){
		let $tp = $xhr.responseText;
		if($tp === null || $tp === '') return;
		$tp = JSON.parse($tp);
		//同步配置
		$c.Page = $tp.Config.Page;
		//更新url
		setUrl('p', $c.Page);
		//附加的功能
		if($additional){
			//回到顶部 +css
			if($additional.includes('-toTop')) window.scrollTo(0, 0);
		}
		//更新分页输入框
		geb('pagination_input').placeholder = $c.Page.now;
		//输出内容
		geb('pageBox').innerHTML = render_summary($tp.main);
		$loading = false; //结束加载
	}
};



/*
 * 加载文章
 * 2022年6月6日
 */
function LoadPaper($id){
	//开始加载, 防止其他程序运行
	if($loading === true) return;
	$loading = true;

	//创建配置
	let $io = JSON.stringify({
		'Mode': 'loadPaper',
		'Config': {
			'Id': $id,
		}
	});
	
	//AJAX
	let $xhr = new XMLHttpRequest();
	$xhr.open('post', 'cake/ApliNi_FastLoad.php');
	let $data = new FormData()
		$data.append('io', $io)
	$xhr.send($data);
	$xhr.onloadend = function(){
		let $tp = $xhr.responseText;
		if($tp === null || $tp === '') return;
		$tp = JSON.parse($tp);
		//同步配置
		$c.Paper = $tp.main.Id;
		//更新url
		setUrl('w', $c.Paper);
		//滚动到顶部
		window.scrollTo(0, 0);
		//打开目录
		switch_bar2List(true);
		//输出文章
		geb('pageBox').innerHTML = render_paper($tp.main);
		$loading = false; //结束加载
	}
};




//测试, 上传文章
function upPaper(){
	
	let $io = JSON.stringify({
		'mode': 'upPaper',
		'Config': {
			'Title': geb('crp_Title').value,
			'Text': geb('crp_Text').value,
			//'TopImg': 'img',
			//'PER': '0',
		},
	});
	
	let $xhr = new XMLHttpRequest();
	$xhr.open('post', 'cake/ApliNi_IO.php');
	let $data = new FormData()
		$data.append('io', ($io))
	$xhr.send($data);
	$xhr.onloadend = function(){
		let $tp = $xhr.responseText;
		if($tp === null || $tp === '') return;
		$tp = JSON.parse($tp);


	}
}

