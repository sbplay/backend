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
import DeferredAction from"@typo3/backend/action-button/deferred-action.js";import ImmediateAction from"@typo3/backend/action-button/immediate-action.js";import Notification from"@typo3/backend/notification.js";import Icons from"@typo3/backend/icons.js";describe("TYPO3/CMS/Backend/Notification:",()=>{beforeEach(()=>{const e=document.getElementById("alert-container");for(;null!==e&&e.firstChild;)e.removeChild(e.firstChild);spyOn(Icons,"getIcon").and.callFake(()=>Promise.resolve("X"))}),describe("can render notifications with dismiss after 1000ms",()=>{for(let e of[{method:Notification.notice,title:"Notice message",message:"This notification describes a notice",class:"alert-notice"},{method:Notification.info,title:"Info message",message:"This notification describes an informative action",class:"alert-info"},{method:Notification.success,title:"Success message",message:"This notification describes a successful action",class:"alert-success"},{method:Notification.warning,title:"Warning message",message:"This notification describes a harmful action",class:"alert-warning"},{method:Notification.error,title:"Error message",message:"This notification describes an erroneous action",class:"alert-danger"}])it("can render a notification of type "+e.class,async()=>{e.method(e.title,e.message,1),await document.querySelector("#alert-container typo3-notification-message:last-child").updateComplete;const t="div.alert."+e.class,o=document.querySelector(t);expect(o).not.toBe(null),expect(o.querySelector(".alert-title").textContent).toEqual(e.title),expect(o.querySelector(".alert-message").textContent).toEqual(e.message),await new Promise(e=>window.setTimeout(e,2e3)),expect(document.querySelector(t)).toBe(null)})}),it("can render action buttons",async()=>{Notification.info("Info message","Some text",1,[{label:"My action",action:new ImmediateAction(e=>e)},{label:"My other action",action:new DeferredAction(e=>e)}]),await document.querySelector("#alert-container typo3-notification-message:last-child").updateComplete;const e=document.querySelector("div.alert");expect(e.querySelector(".alert-actions")).not.toBe(null),expect(e.querySelectorAll(".alert-actions a").length).toEqual(2),expect(e.querySelectorAll(".alert-actions a")[0].textContent).toEqual("My action"),expect(e.querySelectorAll(".alert-actions a")[1].textContent).toEqual("My other action")}),it("immediate action is called",async()=>{const e={callback:()=>{}};spyOn(e,"callback").and.callThrough(),Notification.info("Info message","Some text",1,[{label:"My immediate action",action:new ImmediateAction(e.callback)}]),await document.querySelector("#alert-container typo3-notification-message:last-child").updateComplete;document.querySelector("div.alert").querySelector(".alert-actions a").click(),await document.querySelector("#alert-container typo3-notification-message:last-child").updateComplete,expect(e.callback).toHaveBeenCalled()})});