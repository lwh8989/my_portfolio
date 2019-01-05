
function sliderVertical(options) {
    var self = this;
    this.data = options.data;
    this.obj = $(options.obj)    
    this.btn_up = this.obj.find('.handle-up')
    this.btn_down = this.obj.find('.handle-down')    
    this.paging = this.obj.find('.slider_paging')
    this.paging_transform = this.paging.find('.slider-transform')
    this.setup()
    this.init()
}
sliderVertical.prototype.init = function(){
    var self = this;
    this.paging_item = this.paging.find('.item');         
    this.viewer=  this.obj.find('.slider_view');
    this.viewer_item=  this.obj.find('.item');   
    this.counter = 0;        
    this.itemHeight = this.paging_item.outerHeight()    
    this.setViewer({
        type : this.paging_item.eq(0).find('a').attr('media-type') ,
        url :  this.paging_item.eq(0).find('a').attr('href') ,
        icon : this.paging_item.eq(0).find('a').find('.badge')
    })      
    this.btn_up.unbind("click")
    this.btn_down.unbind("click")
    this.paging_item.find('a').unbind('click')
    this.paging_item.find('a').unbind('mouseenter')               
    this.paging_item.find('a').unbind('mouseleave')    
    this.btn_up.on("click", function (e) {
        e.preventDefault()
        self.counter--
        if (self.counter < 0) {
            self.counter=0;
            return false;
        }
        self.transform()
    });    
    this.btn_down.on("click", function (e) {
        e.preventDefault()
        self.counter++
        if (((self.itemHeight * 6) * self.counter) > ((self.itemHeight * self.paging_item.length)) - (self.itemHeight * 6)) {
            return false;
        }
        self.transform()
    });
    this.paging_item.find('a').on("click", function (e) {
        e.preventDefault()
        self.paging_item.removeClass('is-active')
        $(this).parent().addClass('is-active')
        self.setViewer({
            type : $(this).attr('media-type') ,
            url :  $(this).attr('href') ,
            icon : $(this).find('.badge')
        })           
    });    
    this.paging_item.find('a').on("mouseenter", function (e) {
        self.handleover($(this))           
    });
    this.paging_item.find('a').on("mouseleave", function (e) {
        self.handleleave($(this))  
    });       
}
sliderVertical.prototype.handleover = function(o){
    if(o.parent().hasClass('is-active')){return false}
    
    var border = o.find('.mask-border');
    var bg = o.find('.mask-bg');
    border.stop().animate({
        'opacity': 1
    }, {
        duration: 100,
        easing: 'linear',
        complete: function () {

        }
    });
    bg.stop().animate({
        'opacity': 0
    }, {
        duration: 100,
        easing: 'linear',
        complete: function () {

        }
    });
}
sliderVertical.prototype.handleleave = function(o){
    var border = o.find('.mask-border');
    var bg = o.find('.mask-bg');
    border.stop().animate({
        'opacity': 0
    }, {
        duration: 100,
        easing: 'linear',
        complete: function () {

        }
    });
    bg.stop().animate({
        'opacity': 0.4
    }, {
        duration: 100,
        easing: 'linear',
        complete: function () {

        }
    });
}
sliderVertical.prototype.setup = function(){
    var html="";
    for(var i=0; i<this.data.length;i++){
        html+='<div class="item">';
            html+='<a href="'+this.data[i].media_url+'" class="link" media-type="'+this.data[i].media_type+'" media-type="'+this.data[i].media_url+'">'; 
                html+='<span class="mask-border"></span>';
                html+='<span class="mask-bg"></span>';  
                if(this.data[i].media_type == "MOVIE"){
                    html+='<i class="icon icon-play icon-xs"></i>'
                }                                                                                                                 
                html+='<span class="cover" style="background:url('+this.data[i].thumb_url+') no-repeat left top;"></span>';
                html+=this.data[i].badge
             html+='</a>';
        html+='</div>';
    }
    this.paging_transform.html(
        html
    )
}
sliderVertical.prototype.setViewer = function(o){   
    var media_type = o.type
    var media_url = o.url
    var media_badge = o.icon
    var html='<div class="data">';
    var viewer_data =  this.viewer_item.find('.img')  
    viewer_data.html('')
    if(media_type == 'MOVIE'){
        html+='<iframe width="100%" height="100%" src="'+media_url+'" frameborder="0" allowfullscreen></iframe>'
    }
    if(media_type == 'IMAGE'){
        html+='<img src="'+media_url+'" alt="">'
    }
    html+="</div>"    
    viewer_data.html(html)
    if(media_badge.length != 0){
        viewer_data.append(media_badge.clone())
    }
}
sliderVertical.prototype.transform = function () {
    //this.paging_transform.css('top' , -((this.itemHeight * 6) * this.counter) ) 
    
    this.paging_transform.stop().animate({
        'top': -((this.itemHeight * 6) * this.counter) 
    }, {
        duration: 600,
        easing: 'easeInOutQuart',
        complete: function () {

        }
    });
    
}

function sliderHome(options){    
    this.data = options.data;
    var self  = this;
    this.obj = $(options.obj)
    this.paging = this.obj.find(".paging");
    this.paging_item = this.paging.find("a");    
    this.transform = this.obj.find(".slider-transform");
    this.eventarea = this.obj.find(".slider_center");      
    this.clear=null;
    this.img = this.transform.find("img")
    this.btn_prev = this.obj.find(".handle-left");
    this.btn_next = this.obj.find(".handle-right");        
    this.setup()  
    this.c=0;    
    this.paging = this.obj.find(".paging button");
    this.indexHis = 0;  
    
    this.paging_item.on('click',function(e){               
        e.preventDefault()    
        self.paging_item.removeClass('is-active')
        self.paging_item.eq($(this).index()).addClass('is-active')        
        self.animation(self.c, $(this).index())       
        self.c=$(this).index()                                     
    }) 
    
    this.btn_prev.on('mouseenter',function(e){               
        clearInterval(self.clear)
    })  
//    this.btn_prev.on('mouseleave',function(e){               
//        clearInterval(self.clear)
//        self.rolling()
//    }) 
    this.btn_next.on('mouseenter',function(e){               
        clearInterval(self.clear)
    })      
    this.eventarea.on('mouseenter',function(e){               
        clearInterval(self.clear)
    })  
    this.eventarea.on('mouseleave',function(e){               
        clearInterval(self.clear)
        self.rolling()
    }) 
    this.btn_prev.on('click',function(e){               
        e.preventDefault()  
        var prev = self.c;
        self.c--
        if(self.c < 0){
            self.c = 0;    
        }
        self.paging_item.removeClass('is-active')
        self.paging_item.eq(self.c).addClass('is-active')
        
        if(prev  !=  self.c){
            self.animation(prev , self.c)                                        
        }        
    })    
    this.btn_next.on('click',function(e){               
        e.preventDefault()  
        var prev = self.c;
        self.c++
        if(self.c >  self.data.length-1){
            self.c = 0;    
        }
        self.paging_item.removeClass('is-active')
        self.paging_item.eq(self.c).addClass('is-active')
        
        self.animation(prev , self.c)               
    })    
    this.indexHis = self.c;    
    if(self.c >  self.data.length-1){
        self.c = 0;    
    }
    self.animation(this.indexHis,self.c)
    this.rolling()
}
sliderHome.prototype.setup = function(){
    var self  = this;
    this.transform.html('<div class="item-group"></div><div class="item-group"></div><div class="item-group"></div>')
    this.item_group = this.transform.find(".item-group") 
    var item_start=0;
    var paging_html=""
    for(var i=0;i<this.data.length;i++){
        if(!i){
            paging_html+='<a href="#" class="is-active"></a>'    
        }else{
            paging_html+='<a href="#" class=""></a>'       
        }        
    }    
    this.paging.html(paging_html);
    this.paging_item = this.paging.find("a");
    
    for(var i=0;i<this.item_group.length;i++){                   
        if(i==0){
            create(0,this.data.length-1,this.data.length , false)
        }
        if(i==1){
            create(1,0,this.data.length , false)
        }
        if(i==2){
            create(2,1,this.data.length , false)
        }
    }     
    
    //create(this.data.length-1 , this.data.length)
    //create(0,this.data.length-1,this.data.length , false)
    //create(2,1,this.data.length , false)
    //create(1,0,this.data.length , false)
    //3,0,1,2
    //0,1,2,3
    //1,2,3,0

    function create(p,s,e,l){  
        
        var loopEnd=null;
        var html='';
        var c = 0;               
        var media_taget="";
        for(var i=s; i < e ; i++){                     
            html +=getHtml(c,i);
           
            if(p == 0){
                if(i == e-1 && !l){                   
                    i=-1;   
                    l = true;
                }   
                if(i == self.data.length-2 && l){                   
                    break;
                }   
            }   
            if(p == 2){
                if(i == self.data.length-1 && !l){                   
                    i=-1;   
                    l = true;
                }   
                if(i == s-1 && l){      
                     break;    
                }
            }   
            c++
        }         
        self.item_group.eq(p).html(html)
    }
    function getHtml(c , i){        
        var loopEnd=null;
        var html='';        
        var media_taget="";    
        media_taget="";
        if(self.data[c].media_target){
            media_taget ='target="'+self.data[i].media_target+'"'
        } 
        html+='<div class="item group-'+c+'">';
            html+='<a href="'+self.data[i].media_link+'" '+media_taget+' class="link"></a>';
            html+='<div class="img">';
                html+='<img src="'+self.data[i].media_url+'" alt="" />';
                html+=self.data[i].badge;
            html+='</div>';
            html+='<div class="infobar">';
                html+='<div class="infobar_os">';                
                html+=self.data[i].platform;
                html+='</div>';    
                html+='<div class="infobar_aside">';
                html+=self.data[i].price;
                html+='</div>';        
            html+='</div>';        
        html+='</div>';  
        return html;
    }
}
sliderHome.prototype.animation = function(p,c){ 
    var prev = p
    var current = c;
    var currentLeft = 0;
    var prevLeft = 0;   
    
    if(p > c){
        currentLeft =-400 
        prevLeft =400
    }else{
       currentLeft = 400       
       prevLeft=-400
    }       
    this.obj.find('.group-'+current).css({
        'display':'block',
        'opacity':0,
        'left':currentLeft
    })  
    this.obj.find('.group-'+prev).stop().animate({
            'left':prevLeft,
            'opacity':0
        }, {
            duration: 600,
            easing: 'easeInOutQuint',
            complete: function () {
        }
    });    
    this.obj.find('.group-'+current).stop().delay(100).animate({
        'left': 0,
        'opacity':1
    }, {
        duration: 600,
        easing: 'easeInOutQuint',
        complete: function () {

        }
    });    
}
sliderHome.prototype.rolling = function(){
    var self  = this;
    this.clear = setInterval(function(){
        actions()        
    },3000)
    function actions(){
        var prev = self.c;
        self.c++
        if(self.c >  self.data.length-1){
            self.c = 0;    
        }
        self.paging_item.removeClass('is-active')
        self.paging_item.eq(self.c).addClass('is-active')
        self.animation(prev , self.c)               
    }
}

function sliderContent(options){  
    console.log(11)
    var self = this;
    this.obj = $(options.obj)
    this.counter = 0;
    this.items = this.obj.find('.slider-transform .item')     
    this.btn_prev = this.obj.find(".handle-left");
    this.btn_next = this.obj.find(".handle-right");     
    this.btn_prev.on('click',function(e){               
        e.preventDefault()  
        var prev = self.counter;
        self.counter--
        if(self.counter < 0){
            self.counter = 0;    
        }            
        if(prev  !=  self.counter){
            self.animation(prev ,self.counter)              
        }
    })        
    this.btn_next.on('click',function(e){               
        e.preventDefault()          
        var prev = self.counter;
        self.counter++
        if(self.counter > self.items.length-1){
            self.counter= self.items.length-1;    
        }      
        if(prev  !=  self.counter){
            self.animation(prev ,self.counter)              
        }        
    })     
}
sliderContent.prototype.animation = function(p,c){ 
   var prev = p
    var current = c;
    var currentLeft = 0;
    var prevLeft = 0;       
    if(p > c){
        currentLeft =-400 
        prevLeft =400
    }else{
       currentLeft = 400       
       prevLeft=-400
    }       
    this.obj.find('.group-'+current).css({
        'display':'block',
        'opacity':0,
        'left':currentLeft
    })  
    this.items.eq(prev).stop().animate({
            'left':prevLeft,
            'opacity':0
        }, {
            duration: 600,
            easing: 'easeInOutQuint',
            complete: function () {
        }
    });    
    this.items.eq(current).animate({
        'left': 0,
        'opacity':1
    }, {
        duration: 600,
        easing: 'easeInOutQuint',
        complete: function () {

        }
    });       
}