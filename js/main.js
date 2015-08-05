require([], function() {
    
    var numberOfLayers = 8; 

    /**
     * Main class
     */
    var Main = function()
    {
        console.log('main');
        this.element = document.getElementById('parallax-test');

        this.layersArr = [];


        this.build();

        this.events();
    };


    Main.prototype.build = function()
    {
        for(var i=0;i<numberOfLayers;i++)
        {
            var layer = new Layer(i);
            this.layersArr.push( layer );
            this.element.appendChild( layer.element );

        }
    };

    Main.prototype.events = function()
    {
        var that = this;


        this.element.addEventListener('mousemove',function(e){
            /*
            console.log('ov',
                that.element.offsetTop, 
                that.element.offsetLeft,
                that.element.offsetWidth,
                that.element.offsetHeight,
                e.clientX,
                e.clientY,
                e.layerX,
                e.layerY
            );
            */
            that.move(e);

        },false);
    };

    Main.prototype.move = function(e)
    {
        var x = e.layerX - this.element.offsetWidth * .5;
        var y = e.layerY - this.element.offsetHeight * .5;

        for(var i=0;i<this.layersArr.length;i++)
        {
            var layer = this.layersArr[i];
            



            layer.move(x,y);
        }
    };

    /**
     * Layer class
     */
    var Layer = function( index )
    {
        console.log('layer',index);

        this.element = document.createElement('div');
        this.element.classList.add('layer');
        
        var bgNum;
        if(index === 0){
            bgNum = index;
        }else if(index === numberOfLayers-1){
            bgNum = 2;
        }else{
            bgNum = 1;
        }

        console.log(bgNum)
        this.element.classList.add('layer-'+bgNum);
        this.element.style.backgroundImage = 'url(images/'+bgNum+'.png)';
        this.element.style.zIndex = index;

        this.range = index * 0.02;
    };

    Layer.prototype.move = function(x,y)
    {

        this.deg = 1-(this.range* x/2 );

        this.element.style.left = x * this.range + 'px';
        this.element.style.top = y * this.range + 'px';
        var t = 'rotateY('+this.deg+'deg)';
        //'translateX( ' + x + 'px ) \
        //translateY( ' +  y  + 'px ) \
        //translateZ( ' +  0  + 'px )';
        this.element.style['transform'] = t;
    };



    return new Main();
});