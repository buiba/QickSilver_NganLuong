Type.registerNamespace("AjaxControlToolkit");AjaxControlToolkit.DropShadowBehavior=function(c){var b=null,a=this;AjaxControlToolkit.DropShadowBehavior.initializeBase(a,[c]);a._opacity=1;a._width=5;a._shadowDiv=b;a._trackPosition=b;a._trackPositionDelay=50;a._timer=b;a._tickHandler=b;a._roundedBehavior=b;a._shadowRoundedBehavior=b;a._rounded=false;a._radius=5;a._lastX=b;a._lastY=b;a._lastW=b;a._lastH=b};AjaxControlToolkit.DropShadowBehavior.prototype={initialize:function(){var a=this;AjaxControlToolkit.DropShadowBehavior.callBaseMethod(a,"initialize");var b=a.get_element();if($common.getCurrentStyle(b,"position",b.style.position)!="absolute")b.style.position="relative";a._rounded&&a.setupRounded();a._trackPosition&&a.startTimer();a.setShadow()},dispose:function(){this.stopTimer();this.disposeShadowDiv();AjaxControlToolkit.DropShadowBehavior.callBaseMethod(this,"dispose")},buildShadowDiv:function(){var a=this,c=a.get_element();if(!a.get_isInitialized()||!c||!a._width)return;var b=document.createElement("DIV");b.style.backgroundColor="black";b.style.position="absolute";if(c.id)b.id=c.id+"_DropShadow";a._shadowDiv=b;c.parentNode.appendChild(b);if(a._rounded){a._shadowDiv.style.height=Math.max(0,c.offsetHeight-2*a._radius)+"px";if(!a._shadowRoundedBehavior)a._shadowRoundedBehavior=$create(AjaxControlToolkit.RoundedCornersBehavior,{Radius:a._radius},null,null,a._shadowDiv);else a._shadowRoundedBehavior.set_Radius(a._radius)}else a._shadowRoundedBehavior&&a._shadowRoundedBehavior.set_Radius(0);a._opacity!=1&&a.setupOpacity();a.setShadow(false,true);a.updateZIndex()},disposeShadowDiv:function(){var a=this;if(a._shadowDiv){a._shadowDiv.parentNode&&a._shadowDiv.parentNode.removeChild(a._shadowDiv);a._shadowDiv=null}if(a._shadowRoundedBehavior){a._shadowRoundedBehavior.dispose();a._shadowRoundedBehavior=null}},onTimerTick:function(){this.setShadow()},startTimer:function(){var a=this;if(!a._timer){if(!a._tickHandler)a._tickHandler=Function.createDelegate(a,a.onTimerTick);a._timer=new Sys.Timer;a._timer.set_interval(a._trackPositionDelay);a._timer.add_tick(a._tickHandler);a._timer.set_enabled(true)}},stopTimer:function(){var a=this;if(a._timer){a._timer.remove_tick(a._tickHandler);a._timer.set_enabled(false);a._timer.dispose();a._timer=null}},setShadow:function(f,h){var a=this,c=a.get_element();if(!a.get_isInitialized()||!c||!a._width&&!f)return;var e=a._shadowDiv;!e&&a.buildShadowDiv();var b={x:c.offsetLeft,y:c.offsetTop};if(f||a._lastX!=b.x||a._lastY!=b.y||!e){a._lastX=b.x;a._lastY=b.y;var d=a.get_Width();b.x+=d;b.y+=d;$common.setLocation(a._shadowDiv,b)}var g=c.offsetHeight,d=c.offsetWidth;if(f||g!=a._lastH||d!=a._lastW||!e){a._lastW=d;a._lastH=g;if(!a._rounded||!e||h){a._shadowDiv.style.width=d+"px";a._shadowDiv.style.height=g+"px"}else{a.disposeShadowDiv();a.setShadow()}}if(a._shadowDiv)a._shadowDiv.style.visibility=$common.getCurrentStyle(c,"visibility")},setupOpacity:function(){var a=this;a.get_isInitialized()&&a._shadowDiv&&$common.setElementOpacity(a._shadowDiv,a._opacity)},setupRounded:function(){var a=this;if(!a._roundedBehavior&&a._rounded)a._roundedBehavior=$create(AjaxControlToolkit.RoundedCornersBehavior,null,null,null,a.get_element());a._roundedBehavior&&a._roundedBehavior.set_Radius(a._rounded?a._radius:0)},updateZIndex:function(){var c=this;if(!c._shadowDiv)return;var d=c.get_element(),a=d.style.zIndex,b=c._shadowDiv.style.zIndex;if(b&&a&&a>b)return;else{a=Math.max(2,a);b=a-1}d.style.zIndex=a;c._shadowDiv.style.zIndex=b},updateRoundedCorners:function(){var a=this;if(a.get_isInitialized()){a.setupRounded();a.disposeShadowDiv();a.setShadow()}},get_Opacity:function(){return this._opacity},set_Opacity:function(b){var a=this;if(a._opacity!=b){a._opacity=b;a.setupOpacity();a.raisePropertyChanged("Opacity")}},get_Rounded:function(){return this._rounded},set_Rounded:function(b){var a=this;if(b!=a._rounded){a._rounded=b;a.updateRoundedCorners();a.raisePropertyChanged("Rounded")}},get_Radius:function(){return this._radius},set_Radius:function(b){var a=this;if(b!=a._radius){a._radius=b;a.updateRoundedCorners();a.raisePropertyChanged("Radius")}},get_Width:function(){return this._width},set_Width:function(b){var a=this;if(b!=a._width){a._width=b;a._shadowDiv&&$common.setVisible(a._shadowDiv,b>0);a.setShadow(true);a.raisePropertyChanged("Width")}},get_TrackPositionDelay:function(){return this._trackPositionDelay},set_TrackPositionDelay:function(b){var a=this;if(b!=a._trackPositionDelay){a._trackPositionDelay=b;if(a._trackPosition){a.stopTimer();a.startTimer()}a.raisePropertyChanged("TrackPositionDelay")}},get_TrackPosition:function(){return this._trackPosition},set_TrackPosition:function(b){var a=this;if(b!=a._trackPosition){a._trackPosition=b;if(a.get_element())if(b)a.startTimer();else a.stopTimer();a.raisePropertyChanged("TrackPosition")}}};AjaxControlToolkit.DropShadowBehavior.registerClass("AjaxControlToolkit.DropShadowBehavior",AjaxControlToolkit.BehaviorBase);