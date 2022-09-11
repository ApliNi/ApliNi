//防止锚点改变URL - 2022年5月21日
window.onhashchange = function(){history.pushState('', '', window.location.pathname + window.location.search)};



//监听向前向后翻页并重载配置, 伪静态
window.addEventListener('popstate', function(e){
	getUrlConfig();
}, false);



//常用的获取div - 2022年5月21日
function geb($i){return document.getElementById($i)};


//区域时间格式, 时间戳 --> xx年x月x日 x:x:x - 2022年6月6日
function timeArea($t){
	return new Date(parseInt($t) * 1000).toLocaleString(navigator.language || 'zh-CN');
};



//相对时间格式, 时间戳 --> x天前 - 2022年5月21日
function timeForm($t){
	//let $t = Date.parse(new Date($date))/1000;
	let $diff = Date.parse(new Date())/1000 - $t;
	if($diff < 10) return '现在!';
	if($diff < 60) return '1分钟内';
	if($diff < 3600) return Math.floor($diff / 60) +'分钟前';
	if($diff < 86400) return Math.floor($diff / 3600) +'小时前';
	if($diff < 777600){ //9天内的消息, 精确到时
		let $d = Math.floor($diff / 86400);
		let $h = Math.floor($diff / 3600) - ($d * 24);
		return $d +'天'+ $h +'小时前';
	}
	if($diff < 31536000) return Math.floor($diff / 86400) +'天前';
	if($diff > 31536000){
		let $y = Math.floor($diff / 31536000);
		let $d = Math.floor($diff / 86400) - ($y * 365);
		return $y +'年'+ $d +'天前';
	}
};



//渲染文章摘要页面 - 2022年6月6日
function render_summary($main){
	//输出
	let $iM = '';
	
	//遍历数组
	for(let key in $main){
		let $tp = $main[key];
		
		//卡片内的内容
		let $Time = ($tp.Time)? `<span title="时间: ${timeArea($tp.Time)}">${timeForm($tp.Time)}</span>` : '__时间__';
		
		//卡片内的附加内容
		let $Title = ($tp.Title)? `<h2 class="in-title"><a onclick="LoadPaper('${$tp.ID}')">${$tp.Title}</a></h2>` : '',
			$TopImg = ($tp.TopImg)? `<div class="in-img-1" style="background-image: url(${$tp.TopImg})"></div>` : ''
		;
		
		//渲染一个卡片
		$iM += `
			<div class="box start">
				${$TopImg}
				<div class="in-box">
					${$Title}
					<p class="in-info -s1">${$Time} | P:14 | R:2 | W:1024</p>
					<p class="in-summary">${$tp.Summary}</p>
				</div>
			</div>
		`;
	} //ROF END
	
	return $iM;
};



//渲染Paper文章 - 2022年6月11日
function render_paper($tp){
	//输出
	return `
		<div id="summary_${$tp.Id}" class="box start">
			<div class="in-box">
				${$tp.Title}
				<p class="in-info -s1">${$tp.Time} | P:14 | R:2 | W:1024</p>
				<p class="in-summary">${$tp.Text}</p>
			</div>
		</div>
	`;
}



//获取url参数
function getUrl($name){
	var $i = window.location.search.substring(1).match(new RegExp('(^|&)'+ $name +'=([^&]*)(&|$)', 'i'));
	return $i ? decodeURIComponent($i[2]) : '';
};



//修改URL - 2022年6月6日
function setUrl($key, $value){
	history.pushState('', '', window.location.pathname + `?${$key}=${$value}`);
};



//打开或关闭左侧目录
function switch_bar2List($i){
	if($i === true){ //打开
		geb('bar2-top-toggle-目录-btn').style.display = 'inline';
		geb('bar2-top-toggle-目录').click();
	}else{ //关闭
		geb('bar2-top-toggle-文章目录-btn').style.display = 'none';
		geb('bar2-top-toggle-站点概览').click();
	}
};



//获取被选中的input
function getInputCheckedByName($name){
	return Array.prototype.slice.call(document.getElementsByName($name)).filter(function(e){
		return e.checked;
	});
};
