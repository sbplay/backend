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
var __awaiter=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,l){function s(e){try{a(n.next(e))}catch(e){l(e)}}function r(e){try{a(n.throw(e))}catch(e){l(e)}}function a(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,r)}a((n=n.apply(e,t||[])).next())}))};define(["require","exports","jquery","TYPO3/CMS/Core/Ajax/AjaxRequest","TYPO3/CMS/Backend/FormEngine","TYPO3/CMS/Backend/Modal","jquery-ui/sortable"],(function(require,exports,$,AjaxRequest,FormEngine,Modal){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class FlexFormElement{constructor(e,t){this.el=e;const o=this;return this.el=e,this.$el=$(e),void 0!==this.$el.data("TYPO3.FormEngine.FlexFormElement")&&this.$el.removeData("TYPO3.FormEngine.FlexFormElement"),this.$el.data("TYPO3.FormEngine.FlexFormElement",this),t||(t=FlexFormElement.defaults),t.allowRestructure=this.$el.data("t3-flex-allow-restructure"),t.flexformId=this.$el.attr("id"),this.opts=$.extend({},FlexFormElement.defaults,t),this.initializeEvents(),this.$el.find(this.opts.sectionSelector).each((function(){o.generateSectionPreview($(this))})),this}initializeEvents(){return this.$el.prev(this.opts.flexFormToggleAllSectionsSelector).off("click").on("click",()=>{this.$el.find(this.opts.sectionToggleButtonSelector).trigger("click")}),this.opts.allowRestructure&&(this.createSortable(),this.$el.off("click").on("click",this.opts.deleteIconSelector,e=>{e.preventDefault();const t=TYPO3.lang["flexform.section.delete.title"]||"Are you sure?",o=TYPO3.lang["flexform.section.delete.message"]||"Are you sure you want to delete this section?",n=Modal.confirm(t,o);n.on("confirm.button.cancel",()=>{Modal.currentModal.trigger("modal-dismiss")}),n.on("confirm.button.ok",()=>{$(e.target).closest(this.opts.sectionSelector).hide().addClass(this.opts.sectionDeletedClass),this.setActionStatus(),FormEngine.Validation.validate(),Modal.currentModal.trigger("modal-dismiss")})}),this.$el.on("click",this.opts.sectionToggleButtonSelector,e=>{e.preventDefault();const t=$(e.currentTarget).closest(this.opts.sectionSelector);this.toggleSection(t)}).on("click",this.opts.sectionToggleButtonSelector+" .form-irre-header-control",(function(e){e.stopPropagation()}))),this}createSortable(){this.$el.sortable({containment:"parent",handle:".t3js-sortable-handle",axis:"y",tolerance:"pointer",stop:()=>{this.setActionStatus(),$(document).trigger("flexform:sorting-changed")}})}setActionStatus(){const e=this;this.$el.find(this.opts.sectionActionInputFieldSelector).each((function(t){const o=$(this).parents(e.opts.sectionSelector).hasClass(e.opts.sectionDeletedClass)?"DELETE":t;$(this).val(o)}))}toggleSection(e){const t=e.find(this.opts.sectionContentSelector);t.toggle(),t.is(":visible")?(e.find(this.opts.sectionToggleIconOpenSelector).show(),e.find(this.opts.sectionToggleIconCloseSelector).hide(),e.find(this.opts.sectionToggleInputFieldSelector).val(0)):(e.find(this.opts.sectionToggleIconOpenSelector).hide(),e.find(this.opts.sectionToggleIconCloseSelector).show(),e.find(this.opts.sectionToggleInputFieldSelector).val(1)),this.generateSectionPreview(e)}generateSectionPreview(e){const t=e.find(this.opts.sectionContentSelector);let o="";t.is(":visible")||t.find("input[type=text], textarea").each((function(){let e=$($.parseHTML($(this).val())).text();e.length>50&&(e=e.substring(0,50)+"..."),o+=(o?" / ":"")+e})),0===e.find(this.opts.sectionHeaderPreviewSelector).length&&e.find(this.opts.sectionHeaderSelector).find(".t3js-record-title").parent().append('<span class="'+this.opts.sectionHeaderPreviewSelector.replace(/\./,"")+'"></span>'),e.find(this.opts.sectionHeaderPreviewSelector).text(o)}}FlexFormElement.defaults={deleteIconSelector:".t3js-delete",sectionSelector:".t3js-flex-section",sectionContentSelector:".t3js-flex-section-content",sectionHeaderSelector:".t3js-flex-section-header",sectionHeaderPreviewSelector:".t3js-flex-section-header-preview",sectionActionInputFieldSelector:".t3js-flex-control-action",sectionToggleInputFieldSelector:".t3js-flex-control-toggle",sectionToggleIconOpenSelector:".t3js-flex-control-toggle-icon-open",sectionToggleIconCloseSelector:".t3js-flex-control-toggle-icon-close",sectionToggleButtonSelector:'[data-toggle="formengine-flex"]',flexFormToggleAllSectionsSelector:".t3js-form-field-toggle-flexsection",sectionDeletedClass:"t3js-flex-section-deleted",allowRestructure:!1,flexformId:!1},$.fn.t3FormEngineFlexFormElement=function(e){return this.each((function(){new FlexFormElement(this,e)}))},$((function(){$(".t3-flex-container").t3FormEngineFlexFormElement(),$(document).on("click",".t3js-flex-container-add",(function(e){const me=$(this);e.preventDefault(),new AjaxRequest(TYPO3.settings.ajaxUrls.record_flex_container_add).post({vanillaUid:me.data("vanillauid"),databaseRowUid:me.data("databaserowuid"),command:me.data("command"),tableName:me.data("tablename"),fieldName:me.data("fieldname"),recordTypeValue:me.data("recordtypevalue"),dataStructureIdentifier:me.data("datastructureidentifier"),flexFormSheetName:me.data("flexformsheetname"),flexFormFieldName:me.data("flexformfieldname"),flexFormContainerName:me.data("flexformcontainername")}).then(response=>__awaiter(this,void 0,void 0,(function*(){const data=yield response.resolve();me.closest(".t3-form-field-container").find(".t3-flex-container").append(data.html),$(".t3-flex-container").t3FormEngineFlexFormElement(),data.scriptCall&&data.scriptCall.length>0&&$.each(data.scriptCall,(function(index,value){eval(value)})),data.stylesheetFiles&&data.stylesheetFiles.length>0&&$.each(data.stylesheetFiles,(function(e,t){let o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.href=t,document.head.appendChild(o)})),FormEngine.reinitialize(),FormEngine.Validation.initializeInputFields(),FormEngine.Validation.validate()})))}))}))}));