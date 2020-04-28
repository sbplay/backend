/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","jquery","bootstrap","TYPO3/CMS/Backend/jquery.clearable"],function(o,i,e){"use strict";return new(function(){function o(){this.options={error:".t3js-login-error",errorNoCookies:".t3js-login-error-nocookies",formFields:".t3js-login-formfields",interfaceField:".t3js-login-interface-field",loginForm:"#typo3-login-form",submitButton:".t3js-login-submit",submitHandler:null,useridentField:".t3js-login-userident-field"},this.checkCookieSupport(),this.checkForInterfaceCookie(),this.initializeEvents(),top.location.href!==location.href&&(top.location.href=location.href)}return o.prototype.showLoginProcess=function(){this.showLoadingIndicator(),e(this.options.error).addClass("hidden"),e(this.options.errorNoCookies).addClass("hidden")},o.prototype.showLoadingIndicator=function(){e(this.options.submitButton).button("loading")},o.prototype.handleSubmit=function(o){this.showLoginProcess(),"function"==typeof this.options.submitHandler&&this.options.submitHandler(o)},o.prototype.interfaceSelectorChanged=function(){var o=new Date,i=new Date(o.getTime()+31536e6);document.cookie="typo3-login-interface="+e(this.options.interfaceField).val()+"; expires="+i.toUTCString()+";"},o.prototype.checkForInterfaceCookie=function(){if(e(this.options.interfaceField).length){var o=document.cookie.indexOf("typo3-login-interface=");if(-1!==o){var i=document.cookie.substr(o+22);i=i.substr(0,i.indexOf(";")),e(this.options.interfaceField).val(i)}}},o.prototype.showCookieWarning=function(){e(this.options.formFields).addClass("hidden"),e(this.options.errorNoCookies).removeClass("hidden")},o.prototype.hideCookieWarning=function(){e(this.options.formFields).removeClass("hidden"),e(this.options.errorNoCookies).addClass("hidden")},o.prototype.checkCookieSupport=function(){var o=navigator.cookieEnabled;!1===o?this.showCookieWarning():document.cookie||null!==o||(document.cookie="typo3-login-cookiecheck=1",document.cookie?document.cookie="typo3-login-cookiecheck=; expires="+new Date(0).toUTCString():this.showCookieWarning())},o.prototype.initializeEvents=function(){e(document).ajaxStart(this.showLoadingIndicator.bind(this)),e(this.options.loginForm).on("submit",this.handleSubmit.bind(this)),e(this.options.interfaceField).length>0&&e(document).on("change blur",this.options.interfaceField,this.interfaceSelectorChanged.bind(this)),e(".t3js-clearable").clearable(),e(".t3js-login-news-carousel").on("slide.bs.carousel",function(o){var i=e(o.relatedTarget).height();e(o.target).find("div.active").parent().animate({height:i},500)})},o}())});