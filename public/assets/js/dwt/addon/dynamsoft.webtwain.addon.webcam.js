/*! 20230919170045
* Dynamsoft JavaScript Library
* Product: Dynamic Web TWAIN
* Web Site: https://www.dynamsoft.com
*
* Copyright 2023, Dynamsoft Corporation
* Author: Dynamsoft Support Team
*
* Module: Webcam
* Version: 18.4.1
* 
*/
var Dynamsoft=self.Dynamsoft||{};Dynamsoft.DWT=Dynamsoft.DWT||{},Dynamsoft.aryAddonReadyFun=Dynamsoft.aryAddonReadyFun||[],Dynamsoft.AddonReady=Dynamsoft.AddonReady||function(e){Dynamsoft.aryAddonReadyFun.push(e)},Dynamsoft.WebcamVerForActiveX="15.0.0.0625",Dynamsoft.WebcamVerInName="15.0.0.0625",function(){for(var e=[Dynamsoft.DWT],t=0;t<1;t++){var r=e[t];r.EnumDWT_VideoRotateMode={VRM_NONE:0,VRM_90_DEGREES_CLOCKWISE:1,VRM_180_DEGREES_CLOCKWISE:2,VRM_270_DEGREES_CLOCKWISE:3,VRM_FLIP_VERTICAL:4,VRM_FLIP_HORIZONTAL:5},r.EnumDWT_VideoProperty={VP_BRIGHTNESS:0,VP_CONTRAST:1,VP_HUE:2,VP_SATURATION:3,VP_SHARPNESS:4,VP_GAMMA:5,VP_COLORENABLE:6,VP_WHITEBALANCE:7,VP_BACKLIGHTCOMPENSATION:8,VP_GAIN:9},r.EnumDWT_CameraControlProperty={CCP_PAN:0,CCP_TILT:1,CCP_ROLL:2,CCP_ZOOM:3,CCP_EXPOSURE:4,CCP_IRIS:5,CCP_FOCUS:6}}}(),function(){Dynamsoft.Lib.WebcamErrors={InvalidParameter:function(e){e._errorCode=-10001,e._errorString="The parameter is invalid."},VideoNotPlayingWhenCapture:function(e){e._errorCode=-10002,e._errorString="To capture an image, the video must be playing."},VideoNotPlayingWhenGetURL:function(e){e._errorCode=-10003,e._errorString="To get the url for the current frame, the video must be playing."},Success:function(e){e._errorCode=0,e._errorString="Successful."}}}(),function(r){function t(e){var t=this;t._Count=0,t._resultlist=[],t._stwain=e}t.prototype.GetCount=function(){return r.WebcamErrors.Success(this._stwain),this._Count-1},t.prototype.Get=function(e){var t=this;return t._resultlist.length-1<=e||e<0?(Dynamsoft.Lib.Errors.Webcam_InvalidIndex(t._stwain,"Get"),""):(r.WebcamErrors.Success(t._stwain),t._resultlist[e])},t.prototype.GetCurrent=function(){var e=this,t=e._resultlist.length;return 0==t?(Dynamsoft.Lib.Errors.Webcam_InvalidIndex(e._stwain,"GetCurrent"),""):(r.WebcamErrors.Success(e._stwain),e._resultlist[t-1])},r.NewWebcamValue=function(e){return new t(e)}}(Dynamsoft.Lib),function(t){function r(e){var t=this;t._Count=0,t._resultlist=[],t._stwain=e}r.prototype.GetValue=function(){var e=this;return 0==e._resultlist.length?(Dynamsoft.Lib.Errors.Webcam_InvalidIndex(e._stwain,""),""):(t.WebcamErrors.Success(e._stwain),e._resultlist[0].current)},r.prototype.GetIfAuto=function(){var e=this;return 0==e._resultlist.length?(Dynamsoft.Lib.Errors.Webcam_InvalidIndex(e._stwain,""),!1):(t.WebcamErrors.Success(e._stwain),"true"==e._resultlist[0].auto)},t.NewWebcamSetting=function(e){return new r(e)}}(Dynamsoft.Lib),function(e){function t(e){var t=this;t._Count=0,t._resultlist=[],t._stwain=e}t.prototype.GetMinValue=function(){var e=this;return 0==e._resultlist.length?(Dynamsoft.Lib.Errors.Webcam_InvalidIndex(e._stwain,""),""):e._resultlist[0].min},t.prototype.GetMaxValue=function(){var e=this;return 0==e._resultlist.length?(Dynamsoft.Lib.Errors.Webcam_InvalidIndex(e._stwain,""),""):e._resultlist[0].max},t.prototype.GetSteppingDelta=function(){var e=this;return 0==e._resultlist.length?(Dynamsoft.Lib.Errors.Webcam_InvalidIndex(e._stwain,""),0):e._resultlist[0].step},t.prototype.GetDefaultValue=function(){var e=this;return 0==e._resultlist.length?(Dynamsoft.Lib.Errors.Webcam_InvalidIndex(e._stwain,""),0):e._resultlist[0].defaultValue},t.prototype.GetIfAuto=function(){var e=this;return 0==e._resultlist.length?(Dynamsoft.Lib.Errors.Webcam_InvalidIndex(e._stwain,""),!1):"true"==e._resultlist[0].auto},e.NewWebcamMoreSetting=function(e){return new t(e)}}(Dynamsoft.Lib),Dynamsoft.AddonReady(function(n,e){n.DynamicLoadAddonFuns&&n.DynamicLoadAddonFuns.push(function(r){r._innerSetWebcamValue=function(e){var t=n.NewWebcamValue(r);return e&&n.isArray(e)&&(t._resultlist=e,t._Count=e.length),t},r._innerSetWebcamSetting=function(e){var t=n.NewWebcamSetting(r);return e&&n.isArray(e)&&(t._resultlist=e,t._Count=e.length),t},r._innerSetWebcamMoreSetting=function(e){var t=n.NewWebcamMoreSetting(r);return e&&n.isArray(e)&&(t._resultlist=e,t._Count=e.length),t}}),n.Addon_Events.push("OnFrameCaptured"),n.Addon_Events.push("OnCaptureSuccess"),n.Addon_Events.push("OnCaptureError")}),Dynamsoft.AddonReady(function(l,e){l.product.bHTML5Edition&&l.DynamicLoadAddonFuns&&l.DynamicLoadAddonFuns.push(function(m){var e,c=l.html5.Funs,t=l.env.bMac?"DynamicWebcam_"+Dynamsoft.WebcamVerInName+".dylib":l.env.bLinux?"DynamicWebcam_"+Dynamsoft.WebcamVerInName+".so":m._b64bit?"DynamicWebcamx64_"+Dynamsoft.WebcamVerInName+".dll":"DynamicWebcam_"+Dynamsoft.WebcamVerInName+".dll";try{m._innerSend("GetAddOnVersion",c.makeParams("webcam",t),!0,!1,!1)}catch(e){}(e=m)._innerWebcamValueFunction=function(e,t){e=this._innerFunRaw(e,t,!1,!1);return this._innerSetWebcamValue(e)},e._innerWebcamSettingFunction=function(e,t){e=this._innerFunRaw(e,t,!1,!1);return this._innerSetWebcamSetting(e)},e._innerWebcamMoreSettingFunction=function(e,t){e=this._innerFunRaw(e,t,!1,!1);return this._innerSetWebcamMoreSetting(e)},e._OnCaptureSuccess=function(e){Dynamsoft.Lib.isFunction(this.__OnCaptureSuccess)&&this.__OnCaptureSuccess()},e._OnCaptureError=function(e){var t=e[1],e=e[2];Dynamsoft.Lib.isFunction(this.__OnCaptureError)&&this.__OnCaptureError(t,e)},e._OnFrameCaptured=function(e){var t,r=this,n=Dynamsoft.Lib;r.__videoPause||(t=(t=r.__videoQuality)||60,r.__videoDest&&r.__videoDest.UpdateVideoContainer(r.GetImageURL(-1,-1,-1,0,t))),n.isFunction(r.__OnFrameCaptured)&&r.__OnFrameCaptured(e)},e={Webcam:{IsModuleInstalled:function(){var e=m;return e._resetErr(),""!=e._innerFun("GetAddOnVersion",c.makeParams("webcam",t))},Download:function(e,t,r){function n(){return m.IfShowProgressBar&&l.closeProgress(null,"Download"),Dynamsoft.Lib.isFunction(t)&&t(),!0}function i(){return m.IfShowProgressBar&&l.closeProgress(null,"Download"),Dynamsoft.Lib.isFunction(r)&&r(m._errorCode,m._errorString),!1}var o=m;o._resetErr(),Dynamsoft.Lib.cancelFrome=2;if(!l.License.checkProductKey(m,{Webcam:!0},!0))return i();if(this.IsModuleInstalled())return n();if(!e||""==e)return Dynamsoft.Lib.Errors.Webcam_InvalidRemoteFilename(o),i();if(c.isServerInvalid(o))return i(),!1;m.IfShowProgressBar&&l.showProgress(o,"Download",!0);var a=!0;return o._OnPercentDone([0,-1,"Downloading Webcam Module...","http"]),Dynamsoft.Lib.isFunction(t)||(a=!1),c.loadHttpBlob(o,"get",e,a,function(e){o._OnPercentDone([0,-1,"Loading..."]);o.__LoadImageFromBytesV1(e,100,"",0,a,n,i)},function(){i()},function(e){var t=0===e.total?100:Math.round(100*e.loaded/e.total);[e.loaded," / ",e.total].join("");o._OnPercentDone([0,t,"","http"])})},GetSourceList:function(){var e,t=m;return t._resetErr(),l.License.checkProductKey(t,{Webcam:!0},!0)?(e=t._innerFunRaw("GetWebcamSourceList"),0==t.ErrorCode&&e.splice(e.length-1,1),e):[]},SelectSource:function(e){var t=m;return t._resetErr(),!!l.License.checkProductKey(t,{Webcam:!0},!0)&&t._innerFun("SelectWebcam",c.makeParams(e))},CloseSource:function(){var e=m;return e._resetErr(),this._clear(),e._innerFun("StopCapture")},GetFramePartURL:function(){var e=m;return e._resetErr(),this._isPlaying()?e.GetImageURL(-1,-1,-1,!0,e.__videoQuality):(l.WebcamErrors.VideoNotPlayingWhenGetURL(e),"")},GetFrameURL:function(){var e=m;return e._resetErr(),this._isPlaying()?e.GetImageURL(-1,-1,-1,0,e.__videoQuality):(l.WebcamErrors.VideoNotPlayingWhenGetURL(e),"")},PlayVideo:function(e,t,r,n,i){var o=m;o._resetErr();function a(){return s._clear(),Dynamsoft.Lib.isFunction(i)&&i(m._errorCode,m._errorString),!1}var u=60,s=this;return Dynamsoft.DWT.UseDefaultViewer?e?l.License.checkProductKey(m,{Webcam:!0},!0)?(o.__videoDest=e,o.__videoDest.ShowVideoContainer(!0),Dynamsoft.Lib.isFunction(r)&&(m.__OnFrameCaptured=r),m.__videoPause?(m.__videoPause=!1,l.isFunction(n)&&n()):(m.__videoPause=!1,m.__videoQuality=t?u=(u=+t)<1?60:u:u,m._innerSend("PlayVideo",c.makeParams(!0),!0,n,a)),!0):a():(Dynamsoft.Lib.Errors.ParameterCannotEmpty(m),a()):(Dynamsoft.Lib.Errors.CannotDoWhenNoViewerJS(m),!1)},PauseVideo:function(){var e=m;return e._resetErr(),this._isPlaying()&&(e.__videoPause=!0),!0},_clear:function(){var e=m;e.__videoPause=!1,e.__OnFrameCaptured=!1,e.__videoQuality=60,e.__videoDest&&e.__videoDest.ShowVideoContainer(!1),e.__videoDest=!1},_isPlaying:function(){return m.GetIfShowVideoContainer()},StopVideo:function(){var e=m,t=(e._resetErr(),this._clear(),e._innerFun("PlayVideo",c.makeParams(!1,0)));return e._innerFun("StopCapture"),t},CaptureImage:function(e,t){var r,n,i=m;return i._resetErr(),l.License.checkProductKey(i,{Webcam:!0},!0)?(r="CaptureImage",n=function(){c.hideMask(r),l.isFunction(t)&&t(i._errorCode,i._errorString)},c.showMask(r),i.__OnCaptureError=n,i._innerSend(r,c.makeParams(!1),!0,function(){c.hideMask(),0==i.ErrorCode?(c.hideMask(r),l.isFunction(e)&&setTimeout(e,0),l.License.isLTS()&&Dynamsoft.DWT.lcvrf(m)):n(i.ErrorCode,i.ErrorString)},n),!0):(l.isFunction(t)&&t(i._errorCode,i._errorString),!1)},GetMediaType:function(){var e=m;return e._resetErr(),e._innerWebcamValueFunction("GetMediaType")},SetMediaType:function(e){var t=m;return t._resetErr(),l.isString(e)?t._innerFun("SetMediaType",c.makeParams(e)):(l.Errors.InvalidValue(t),!1)},GetResolution:function(){var e=m,e=(e._resetErr(),e._innerWebcamValueFunction("GetResolution"));if(e&&e._resultlist){var t,r,n=e._resultlist,i=[],o=[];for(""==(r=0<n.length?n[n.length-1]:r)&&0<n.length&&(r=n[0]),t=0;t<n.length-1;t++){for(var a,u=(a=n[t]).toLowerCase().split("x"),s=(l=c=s=void 0,{value:a,p1:parseInt(u[0]),p2:parseInt(u[1])}),c=i,l=c.length-1;0<=l&&c[l].p1>=s.p1&&!(c[l].p1==s.p1&&c[l].p2<s.p2);)c[l+1]=c[l],l--;c[l+1]=s}for(t=0;t<i.length;t++)a=i[t].value,o.push(a);r&&o.push(r),e._resultlist=o,o=i=null}return e},SetResolution:function(e){var t=m;return t._resetErr(),l.isNumber(e)||l.isString(e)?t._innerFun("SetResolution",c.makeParams(e)):(l.Errors.InvalidValue(t),!1)},GetFrameRate:function(){var e=m;return e._resetErr(),e._innerWebcamValueFunction("GetFrameRate")},SetFrameRate:function(e){var t=m;return t._resetErr(),l.isNumber(e)?m._innerFun("SetFrameRate",c.makeParams(e)):(l.Errors.InvalidValue(t),!1)},GetVideoPropertySetting:function(e){var t=m;return t._resetErr(),t._innerWebcamSettingFunction("GetWebcamVideoPropertySetting",c.makeParams(e))},GetVideoPropertyMoreSetting:function(e){var t=m;return t._resetErr(),t._innerWebcamMoreSettingFunction("GetWebcamVideoPropertyMoreSetting",c.makeParams(e))},SetVideoPropertySetting:function(e,t,r){var n=m;return n._resetErr(),n._innerFun("SetWebcamVideoPropertySetting",c.makeParams(e,t,r))},SetVideoRotateMode:function(e){var t=m;return t._resetErr(),t._innerFun("SetVideoRotateMode",c.makeParams(e))},GetCameraControlPropertySetting:function(e){var t=m;return t._resetErr(),t._innerWebcamSettingFunction("GetWebcamCameraControlSetting",c.makeParams(e))},GetCameraControlPropertyMoreSetting:function(e){var t=m;return t._resetErr(),t._innerWebcamMoreSettingFunction("GetWebcamCameraControlMoreSetting",c.makeParams(e))},SetCameraControlPropertySetting:function(e,t,r){var n=m;return n._resetErr(),n._innerFun("SetWebcamCameraControlPropertySetting",c.makeParams(e,t,r))}}},m.__addon=m.__addon||{},l.mix(m.__addon,e)})}),Dynamsoft.AddonReady(function(d,e){var r;d.product.bActiveXEdition&&d.DynamicLoadAddonFuns&&d.DynamicLoadAddonFuns.push(function(m){var _,e,t;if(!m.getSWebTwain()||!m.getSWebTwain().Addon)return!1;Dynamsoft.navInfoSync.bWin&&(t=!Dynamsoft.navInfo.bOSx64||Dynamsoft.navInfo.bWOW64,r=t?"DynamicWebcam_"+Dynamsoft.WebcamVerForActiveX+".dll":"DynamicWebcamx64_"+Dynamsoft.WebcamVerForActiveX+".dll"),_=m.getSWebTwain();try{_.GetAddOnVersion("webcam",r)}catch(e){}(t=m)._innerRead=function(e){var t;try{t=Dynamsoft.Lib.parse(e)}catch(e){}return t.result},t._innerWebcamValueFunctionPlugin=function(e){e=this._innerRead(e);return this._innerSetWebcamValue(e)},t._innerWebcamSettingFunctionPlugin=function(e){e=this._innerRead(e);return this._innerSetWebcamSetting(e)},t._innerWebcamMoreSettingFunctionPlugin=function(e){e=this._innerRead(e);return this._innerSetWebcamMoreSetting(e)},e={Webcam:{IsModuleInstalled:function(){var e=_.GetAddOnVersion("webcam",r);return d.setErrorString(m),""!=e},Download:function(e,t,r){function n(){return Dynamsoft.Lib.isFunction(t)&&t(),!0}function i(){return Dynamsoft.Lib.isFunction(r)&&r(m._errorCode,m._errorString),!1}return d.License.checkProductKey(m,{Webcam:!0},!0)?this.IsModuleInstalled()?n():e&&""!=e?(e=_.DownloadAddon(e),d.wrapperRet(m,e,n,i)):(Dynamsoft.Lib.Errors.Webcam_InvalidRemoteFilename(m),i()):i()},GetSourceList:function(){var e,t;return d.License.checkProductKey(m,{Webcam:!0},!0)?(e=_.GetWebcamSourceList(),t=[],d.setErrorString(m),0==m._errorCode&&(t=m._innerRead(e))&&1<t.length&&t.splice(t.length-1,1),t):[]},SelectSource:function(e){return!!d.License.checkProductKey(m,{Webcam:!0},!0)&&(e=_.SelectWebcam(e),d.setErrorString(m),e)},CloseSource:function(){m._playVideoDWT=null;var e=_.StopCapture();return d.setErrorString(m),e},GetFramePartURL:function(){var e;return this._isPlaying()?(e=_.GetDIB(-1),d.setErrorString(m),e):(d.WebcamErrors.VideoNotPlayingWhenGetURL(m),"")},GetFrameURL:function(){return""},PlayVideo:function(e,t,r,n,i){function o(){return m._playVideoDWT=null,Dynamsoft.Lib.isFunction(i)&&i(m.ErrorCode,m.ErrorString),!1}var a;return e&&e.getSWebTwain()?d.License.checkProductKey(m,{Webcam:!0},!0)?(a=e.getSWebTwain().CurrentHWND)?(m._playVideoDWT=e,setTimeout(function(){var e=_.RunWebcamCmd("PlayVideo",a,null,null,r);d.wrapperRet(m,e,n,o)},0),!0):(d.WebcamErrors.InvalidParameter(m),o()):o():(Dynamsoft.Lib.WebcamErrors.InvalidParameter(m),o())},PauseVideo:function(){return!0},StopVideo:function(){m._playVideoDWT=null;var e=_.RunWebcamCmd("StopVideo",0,null,null,null);return d.setErrorString(m),_.StopCapture(),e},CaptureImage:function(e,t){function r(){return Dynamsoft.Lib.isFunction(t)&&t(m.ErrorCode,m.ErrorString),!1}var n;return d.License.checkProductKey(m,{Webcam:!0},!0)?(n=_.RunWebcamCmd("Capture",0,function(){d.isFunction(e)&&setTimeout(e,0),d.License.isLTS()&&Dynamsoft.DWT.lcvrf(m)},r,null),d.setErrorString(m),n):r()},GetMediaType:function(){var e=m._innerWebcamValueFunctionPlugin(_.GetMediaType());return d.setErrorString(m),e},SetMediaType:function(e){return d.isString(e)?(e=_.SetMediaType(e),d.setErrorString(m),e):(d.Errors.InvalidValue(m),!1)},GetResolution:function(){var e=m._innerWebcamValueFunctionPlugin(_.GetResolution());if(d.setErrorString(m),e&&e._resultlist){var t,r,n=e._resultlist,i=[],o=[];for(0<n.length&&(r=n[n.length-1]),t=0;t<n.length-1;t++){for(var a,u=(a=n[t]).toLowerCase().split("x"),s=(l=c=s=void 0,{value:a,p1:parseInt(u[0]),p2:parseInt(u[1])}),c=i,l=c.length-1;0<=l&&c[l].p1>=s.p1&&!(c[l].p1==s.p1&&c[l].p2<s.p2);)c[l+1]=c[l],l--;c[l+1]=s}for(t=0;t<i.length;t++)a=i[t].value,o.push(a);r&&o.push(r),e._resultlist=o,o=i=null}return e},SetResolution:function(e){return d.isNumber(e)||d.isString(e)?(e=_.SetResolution(e),d.setErrorString(m),e):(d.Errors.InvalidValue(m),!1)},GetFrameRate:function(){var e=m._innerWebcamValueFunctionPlugin(_.GetFrameRate());return d.setErrorString(m),e},SetFrameRate:function(e){return d.isNumber(e)?(e=_.SetFrameRate(e),d.setErrorString(m),e):(d.Errors.InvalidValue(m),!1)},GetVideoPropertySetting:function(e){e=_.GetWebcamVideoPropertySetting(e);return d.setErrorString(m),m._innerWebcamSettingFunctionPlugin(e)},GetVideoPropertyMoreSetting:function(e){e=_.GetWebcamVideoPropertyMoreSetting(e);return d.setErrorString(m),m._innerWebcamMoreSettingFunctionPlugin(e)},SetVideoPropertySetting:function(e,t,r){e=_.SetWebcamVideoPropertySetting(e,t,r);return d.setErrorString(m),e},SetVideoRotateMode:function(e){e=_.SetVideoRotateMode(e);return d.setErrorString(m),e},GetCameraControlPropertySetting:function(e){e=_.GetWebcamCameraControlSetting(e);return d.setErrorString(m),m._innerWebcamSettingFunctionPlugin(e)},GetCameraControlPropertyMoreSetting:function(e){e=_.GetWebcamCameraControlMoreSetting(e);return d.setErrorString(m),m._innerWebcamMoreSettingFunctionPlugin(e)},SetCameraControlPropertySetting:function(e,t,r){e=_.SetWebcamCameraControlPropertySetting(e,t,r);return d.setErrorString(m),e},_isPlaying:function(){return!!m._playVideoDWT}}},m.Addon=m.Addon||{},d.mix(m.Addon,e)})});