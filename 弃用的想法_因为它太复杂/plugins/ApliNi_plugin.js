//一言语句接口 - 2022年5月28日
setTimeout(function(){
	//AJAX
	let $xhr = new XMLHttpRequest();
	$xhr.open('get', 'https://v1.hitokoto.cn/?max_length=17', true);
	$xhr.send(null);
	$xhr.onloadend = function(){
		let $tp = $xhr.responseText;
		if($tp !== null || $tp !== ''){
			$tp = JSON.parse($tp);
			geb('_plugin_hitokoto_p').innerHTML = `<span title="来源: ${$tp.from}">${$tp.hitokoto}<span>`;
		}
	}
}, 0);


//侧边栏跟随滚动 -css - 2022年5月28日
plugin_侧边栏跟随滚动(); //第一次打开
window.onresize = function(){plugin_侧边栏跟随滚动()}; //宽度改变时事件
window.onscroll = function(){plugin_侧边栏跟随滚动()}; //滚动事件
function plugin_侧边栏跟随滚动(){
	let $d = geb('bar2-box_id');
	if($d.getBoundingClientRect().top <= 20 && !$d.classList.contains('-fixed')){ //css中的top值
		$d.classList.add('-fixed');
	}else if(geb('bar1-box_id').getBoundingClientRect().bottom >= -10 && $d.classList.contains('-fixed')){ //css中动效的负值
		$d.classList.remove('-fixed');
	}
};



//功能菜单, 功能切换按钮 -css - 2022年6月9日 // 在未来可被CSS代替
function bar2FnToggle($id){
	//在main中查找持有 -join 的元素并删除它的 -join
	geb('main').querySelector('.-join').classList.remove('-join');
	//为新的元素添加 -join
	geb($id).classList.add('-join');
};



//输入框自动设置高度 - 2022年6月11日
function autoCrpHeight($this){
	/*
	//设置高度为获取输入框高度
	$this.style.height = $this.scrollHeight + 'px';
	//body滚动到底部
	//window.scrollTo(0, document.body.scrollHeight);
	*/
};



//分页按钮
function pagination($i){
	// $i = 按钮发送的指令 or 输入框的值
	
	if($loading === true) return;
	
	//获取输入或者当前的页数, 清空输入框
	$page = parseInt(geb('pagination_input').value || $c.Page.now);
	geb('pagination_input').value = '';
	
	//4个按钮
	if($i){
		if($i === 'min') $page = $c.Page.min;
		if($i === '-1') $page = $page -1; //Math.max($page -1, $c.page.min)
		if($i === '+1') $page = $page +1;
		if($i === 'max') $page = $c.Page.max;
	}
	//如果 输入框为空 or 超出范围 or 与当前相等
	if(!$i || $page > $c.Page.max || $page < $c.Page.min || $page === $c.Page.now){
		//显示允许的最小值和最大值
		geb('pagination_input').placeholder = $c.Page.min + ' ~ ' + $c.Page.max;
		return;
	}
	//同步配置
	$c.Page.now = $page;
	geb('pagination_input').placeholder = 'Loading..';
	LoadPage('-toTop'); //加载
};
