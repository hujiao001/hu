 //静态音乐信息
var musics=[
	{id:'001',name:'halo1',singer:'beyonds1',type:'pork'},
	{id:'002',name:'halo2',singer:'beyonds2',type:'jack'},
	{id:'003',name:'halo3',singer:'beyonds3',type:'xiha'},
	{id:'004',name:'halo4',singer:'beyonds4',type:'classic'}
];
var curTr=null;//全局变量，标识当前哪一行处于修改状态
function showMusics(){
	var html='';
	//拼表头
	html+='<tr>';
	for(var p in musics[0]){
		html+='<th>'+p+'</th>';
	}
	html+='<th>operation</th>';
	html+='</tr>';
	tag('thead')[0].innerHTML=html;
	//拼接表体
	html='';
	var id='';
	for(var i in musics){
		html+='<tr>';
		for(var p in musics[i]){
			if(p=='id') {
				id=musics[i][p];
				html+='<td><a href="#" onclick="edit(false,this)">'+musics[i][p]+'</a></td>';
			}else
				html+='<td>'+musics[i][p]+'</td>';
		}
		html+='<td><a href="#" data-id="'+id+'" onclick="del(this)">delete</a></td>';
		html+='</tr>';
	}
	tag('tbody')[0].innerHTML=html;
}
function del(target){
	if(!confirm('真删?')) return;
	//执行下面代码进行删除
	var id=target.getAttribute('data-id');
	for(var i=0;i<musics.length;i++){
		if(musics[i].id==id){
			musics.splice(i,1);
			break;
		}
	}
	var tr=target.parentNode.parentNode;//找到要删除的tr
	tr.className='del';		//设置class执行删除动画
	setTimeout(function(){	//动画执行完毕删除对应tr
		tag('tbody')[0].removeChild(tr);
	},700);
}
function save(target){
	if(target.getAttribute('data-flag')=='1'){
		if(isExits(id('m_id').value)){
			alert('id has been existed...');
			return;
		}
		var html=''
		musics[musics.length]={};
		musics[musics.length-1].id=id('m_id').value;
		html+='<td><a href="#" onclick="edit(false,this)">'
				+id('m_id').value+'</a></td>';
		musics[musics.length-1].name=id('m_name').value;
		html+='<td>'+id('m_name').value+'</td>';
		musics[musics.length-1].singer=id('m_singer').value;
		html+='<td>'+id('m_singer').value+'</td>';
		musics[musics.length-1].type=id('m_type').value;
		html+='<td>'+id('m_type').value+'</td>';
		html+='<td><a href="#" onclick="del(this)" data-id="'
				+id('m_id').value+'">delete</a></td>';
		var tr=document.createElement('tr');
		tr.innerHTML=html;
		tag('tbody')[0].appendChild(tr);
		alert('add completed!');
	}else{
		var tds=tag('td',curTr);
		tds[1].innerText=id('m_name').value;
		tds[2].innerText=id('m_singer').value;
		tds[3].innerText=id('m_type').value;
		for(var i=0;i<musics.length;i++){
			if(musics[i].id==id('m_name').value){
				musics[i].name==id('m_id').value;
				musics[i].singer==id('m_singer').value;
				musics[i].type==id('m_type').value;
				break;
			}
		}
		alert('update success...');
	}
	closeWindow();
}
function isExits(id){
	for(var i in musics){
		if(musics[i].id==id)
			return true;
	}
	return false;
}
function closeWindow(){
	id('content').className='hide';
	setTimeout(function(){
		id('overlay').style.display='none';
		id('content').style.display='none';
	},700);
}
function edit(flag,target){
	//记录当前这次弹出是新增还是修改
	id('save').setAttribute('data-flag',flag?"1":"0");
	if(flag){
		id('m_id').value='';
		id('m_id').disabled='';
		id('m_name').value='';
		id('m_singer').value='';
		id('m_type').value='';
	}else{
		curTr=target.parentNode.parentNode;
		var m_id=target.innerText;
		id('m_id').value=m_id;
		id('m_id').disabled='disabled';
		for(var i in musics){
			if(m_id==musics[i].id){
				id('m_name').value=musics[i].name;
				id('m_singer').value=musics[i].singer;
				id('m_type').value=musics[i].type;
				break;
			}
		}
		
	}

	//弹出弹出层,让用户进行修改或新增
	id('overlay').style.display='block';
	id('content').style.display='block';
	id('content').className='show';
}
window.onload=function(){
	//把上面的音乐动态拼成表格显示
	showMusics();
};