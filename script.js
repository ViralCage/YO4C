var $winHeight= $(window).innerHeight(),
		$winWidth= $(window).innerWidth();

		for(i=1;i<=41;i++){
			divToAdd=document.createElement('div');
			divToAdd.setAttribute('class','xmasTreePart xmasTreePartNo'+i)
			$('.xmasTree').append(divToAdd)
		}

		$(".xmasTreePart").each(function(index){
			if(index%2==0){
				randomTop = Math.floor( (Math.random()*($winHeight/4)) -(Math.random()*($winHeight/4))+40 ); 
				randomLeft = Math.floor( (Math.random()*($winWidth/2)) -(Math.random()*($winWidth/2))+20 ); 
				
			}
			else{
				randomTop = Math.floor( (Math.random()*($winHeight)) +(Math.random()*($winHeight/2))-40 ); 
				randomLeft = Math.floor( (Math.random()*($winWidth/2)) +(Math.random()*($winWidth/2))-20 ); 
				
			}
			$(this).css('left',randomLeft);
			$(this).css('top',randomTop);
			randomClass= "xmasTreePartEffect"+ Math.floor((Math.random()*4)+1); 
			$(this).addClass(randomClass);
		});

		$('.SetUpTree').click(function(){
			var addIndex=0,
			oneByOne;

			function addOneByOne() {
				if(addIndex<42){
					$(".xmasTreePartNo"+addIndex).attr('style','').removeClass('xmasTreePartEffect1 xmasTreePartEffect2 xmasTreePartEffect3 xmasTreePartEffect4');
					addIndex++;
					console.log(".xmasTreePartNo"+addIndex)
				}
				else{
					clearInterval(oneByOne);
					$("html").removeClass('preClick');
				}
			}

			oneByOne= setInterval(addOneByOne,100);

			$(this).fadeOut(function(){
				$(".merryXmasGreet").addClass('merryXmasGreetVis')
			});
			
		})
