
/**
 *@software  MS_BOX
  version 1.0 (01-11-2014)
  @author Salvatore Mariniello
  Built on top of the jQuery library
  http://jquery.com

  @license
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/

	Software distributed under the License is distributed on an "AS IS"
	basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
	License for the specific language governing rights and limitations
	under the License.

	The Original Code is javascript.

	The Initial Developer of the Original Code is Salvatore Mariniello.
	Portions created by Salvatore Mariniello are Copyright (C) 2014
	Salvatore Mariniello. All Rights Reserved.


   
       https://github.com/mssalvo

*/

var ms_box= ms_box || false;
;$(function(){
  "use strict";
!ms_box?ms_box={
ms_wrap_box:"ms-box",
ms_anchor:"ms-anchor",
ms_sign:"ms-sign",
ms_link:"ms-sign-link",
ms_image:"ms-sign-image",
ms_textarea:"ms-sign-textarea",
ms_hidden:"ms-sign-hidden",
info:{
  author:'Salvatore Mariniello',
  software:'MS_BOX',
	versione:'1.0',
	license:'https://www.mozilla.org/MPL/2.0/index.txt',
	contact:'salvo.mariniello@gmail.com'
},
setting:{
  btnSave:"Save",
  btnCancel:"Cancel",
  btnDelete:"Delete",
  btnNew:"Add. New",
  btnUpdate:"Update",
  btnUpload:"Upload",
  labelDescLink:"Compiles Description Hyperlink",
  labelDesc:"Compiles Description",
  labelDescImg:"Compiles Description Src Url",
  html:""
},
deleteFN:function(data){console.log(data)},
saveFN:function(data){console.log(data)},
uploadFN:function(img,data){console.log(img)},
init:function(){
  this.loadBoxWrap().each(function(){
   var templ=ms_box.template();
   var contex=$(this);
   $("*",contex).each(function(){
    templ.append(ms_box.scanner(this));
   })
     ms_box.ancor(contex,templ)
  })

  $(document).ready(function(){

  $(".ms-update").bind("click",function(){
    ms_box.closeAll();
  $(this).parents("div."+ms_box.ms_anchor).find("div.ms_box_base").fadeIn(300, "linear") })
  $(".ms-save").bind("click",function(){ ms_box.saveFN(ms_box.data($(this)));
   ms_box.changeupdate($(this));
    ms_box.showUpadate();
  $(this).parents("div."+ms_box.ms_anchor).find("div.ms_box_base").fadeOut(300, "linear"); })
  $(".ms-delete").bind("click",function(){ ms_box.deleteFN(ms_box.data($(this)));
    ms_box.showUpadate();
  $(this).parents("div."+ms_box.ms_anchor).find("div.ms_box_base").fadeOut(300, "linear"); })
  $(".ms-close").bind("click",function(){
    ms_box.showUpadate();
    ms_box.restorHtml();
  $(this).parents("div."+ms_box.ms_anchor).find("div.ms_box_base").fadeOut(300, "linear"); })
  $(".ms-upload").bind("click",function(){
    ms_box.uploadFN($(this).parents(".ms-scn-image").find("img"),ms_box.data($(this))) })
  $(".ms-addnew").bind("click",function(){
    ms_box.newrec($(this)) })
  })

  return true;
},
loadBoxWrap:function(){
  return $("."+this.ms_wrap_box);
},
closeAll:function(){$("div.ms_box_base,.ms-update").fadeOut(120, "linear")},
showUpadate:function(){$(".ms-update").fadeIn(120, "linear")},
ancor:function(o,el){
  if(o.hasClass(this.ms_anchor)){
   o.append($("<a/>")
  .attr("href","javascript:void(0)")
  .addClass("ms-update")
  .html(this.setting.btnUpdate)
  ).append(el)
  } else {
   o.find("."+this.ms_anchor)
  .append($("<a/>")
  .attr("href","javascript:void(0)")
  .addClass("ms-update")
  .html(this.setting.btnUpdate)
  ).append(el)
  }
},
data:function(contx){
   var bx= contx.parents("div.ms_box_base");
   var dta={};
   $(":input[type='text'],input[type='checkbox']:checked,input[type='radio']:checked,select,textarea,.ms-key-hidden",bx).each(function(){
    dta[String($(this).attr("ms-id") || $(this).attr("id") || "def_"+this.tagName).split(" ").join("")]=$.trim($(this).val())
   })
   return dta;
},
changeupdate:function(contx){
   var cx= contx.parents("div.ms_box_base");
   $(":input[type='text'],input[type='checkbox'],input[type='radio']:checked,select,textarea",cx).each(function(){

   var obj=$(this);
    $('[mark-id='+$(this).attr("id")+']').each(function(){
    if(this.tagName=="INPUT"){
    if($(this).attr("type")=="checkbox"){
      $(this).prop("checked", obj.is(':checked'))
    } else if($(this).attr("type")=="radio"){
      $(this).val([obj.val()]);
    }
    else{ $(this).val(obj.val()) }
    }
    else if(this.tagName=="IMG"){
    $(this).attr("src",obj.val())
    }
    else if(this.tagName=="A"){
    $(this).html(obj.val())
    }
    else if(this.tagName=="SELECT"){
    $(this).val(obj.val())
    }
    else {
    $(this).html(obj.val())
    }
     //console.log(this);
    })

   })

   return this.restorHtml();
},
restorHtml:function(){
$("div.ms_box_base,.ms-update").remove();
 return ms_box.init();

},
template:function(){
  return $("<div/>")
  .addClass("ms_box_base")
  .append($("<div/>")
  .addClass("ms_footer_button")
  .append($("<a/>")
  .attr("href","javascript:void(0)")
  .addClass("ms-save")
  .html(ms_box.setting.btnSave)
  ).append($("<a/>")
  .attr("href","javascript:void(0)")
  .addClass("ms-close")
  .html(ms_box.setting.btnCancel)
  ).append($("<a/>")
  .attr("href","javascript:void(0)")
  .addClass("ms-delete")
  .html(ms_box.setting.btnDelete)
  ).append($("<a/>")
  .attr("href","javascript:void(0)")
  .addClass("ms-addnew")
  .html(ms_box.setting.btnNew)
  )

  )
},
newrec:function(contx){
   var tmpl= contx.parents("div.ms_box_base");
   $(":input[type='text'],textarea,img",tmpl).each(function(){
    if(this.tagName=="IMG"){
      $(this).attr("src","images/new.png")
    }else {
     $(this).val("");
    }
   })

},
changeimg:function(o){
   $("img#"+$(o).attr("id")+"_img",$(o).parents("div.ms-scn-image")).attr("src",$(o).val())
    },
scanner:function(t){
   var o=$(t);
    if(o.hasClass(this.ms_sign)){
     o.attr("mark-id",o.attr("ms-id") || o.attr("id"))
     if(t.tagName=="INPUT" && (o.attr("type")=="checkbox" || o.attr("type")=="radio")){
       return $("<div/>")
    .addClass("ms-scn-radio")
     .append(
      $("<div/>")
    .attr("id",o.attr("id")+"_label")
    .addClass("ms-snc-radio-label")
    .html(o.attr("label-desc") || ms_box.setting.labelDesc)

    ).append(
       $("<input/>")
    .attr("type",o.attr("type"))
    .attr("id",o.attr("ms-id") || o.attr("id"))
    .attr("name",o.attr("name") || o.attr("ms-id") || o.attr("id"))
    .prop("checked",o.is(':checked'))
    .val(o.attr("type")=="radio" && o.is(':checked')?[o.val()]: o.val())
    )
     }
     else if(t.tagName=="SELECT"){
       return $("<div/>")
    .addClass("ms-scn-select")
    .append(
      $("<div/>")
    .attr("id",o.attr("id")+"_label")
    .addClass("ms-snc-label")
    .html(o.attr("label-desc") || ms_box.setting.labelDesc)
    )
    .append($(t.outerHTML).removeAttr("mark-id").val(o.val()))
     } else {
     return $("<div/>")
    .addClass("ms-scn-html")
    .append(
      $("<div/>")
    .attr("id",o.attr("id")+"_label")
    .addClass("ms-snc-label")
    .html(o.attr("label-desc") || ms_box.setting.labelDesc)

    )
    .append($("<input/>")
    .attr("type","text")
    .attr("id",o.attr("ms-id") || o.attr("id"))
    .attr("name",o.attr("ms-id") || o.attr("id"))
    .val(o.val() || o.text() || o.attr("src"))
    )

     }
  }
   if(o.hasClass(this.ms_link)
   && t.tagName=="A"){
      o.attr("mark-id",o.attr("ms-id") || o.attr("id"))
    return $("<div/>")
    .addClass("ms-scn-href")
     .append(
      $("<div/>")
    .attr("id",o.attr("id")+"_label")
    .addClass("ms-snc-label")
    .html(o.attr("label-desc") || ms_box.setting.labelDesc)

    )
    .append(
      $("<input/>")
    .attr("type","text")
    .attr("id",o.attr("ms-id") || o.attr("id"))
    .attr("name",o.attr("ms-id") || o.attr("id"))
    .val(o.text())
    )
    .append(
      $("<div/>")
    .attr("id",o.attr("id")+"_link_label")
    .addClass("ms-snc-label")
    .html(o.attr("label-link") || ms_box.setting.labelDescLink)

    )
    .append(
      $("<input/>")
    .attr("type","text")
    .attr("id",o.attr("id")+"_link")
    .attr("name",o.attr("id")+"_link")
    .val(o.attr("href"))
    )
   }
  if(o.hasClass(this.ms_image)
  && t.tagName=="IMG"){
  o.attr("mark-id",o.attr("ms-id") || o.attr("id"))
  return $("<div/>")
    .addClass("ms-scn-image")
    .append(
      $("<div/>")
    .attr("id",o.attr("id")+"_label")
    .addClass("ms-snc-label")
    .html(o.attr("label-desc") || ms_box.setting.labelDescImg)

    )
    .append($("<input/>")
    .attr("type","text")
    .attr("id",o.attr("ms-id") || o.attr("id"))
    .attr("name",o.attr("ms-id") || o.attr("id"))
    .bind("blur",function(){ms_box.changeimg(this)})
    .val(o.attr("src"))
    )
    .append($("<img/>")
    .attr("id",o.attr("ms-id") || o.attr("id")+"_img")
    .attr("width","100px")
    .attr("src",o.attr("src"))
    )
    .append($("<input/>")
    .attr("type","button")
    .attr("id",o.attr("id")+"_btn")
    .attr("name",o.attr("id")+"_btn")
    .addClass("ms-upload")
    .val(ms_box.setting.btnUpload)
    )
  }
    if(o.hasClass(this.ms_textarea)){
       o.attr("mark-id",o.attr("ms-id") || o.attr("id"))
     return $("<div/>")
    .addClass("ms-scn-textarea")
    .append(
     $("<div/>")
    .attr("id",o.attr("id")+"_label")
    .addClass("ms-snc-label")
    .html(o.attr("label-desc") || ms_box.setting.labelDesc)
    )
    .append($("<textarea/>")
    .attr("id",o.attr("ms-id") || o.attr("id"))
    .attr("name",o.attr("ms-id") || o.attr("id"))
    .val(o.val() || o.text() || o.attr("src"))
    )
  }
    if(o.hasClass(this.ms_hidden)){
     return $("<input/>")
    .addClass("ms-key-hidden")
    .attr("type","hidden")
    .attr("id",o.attr("ms-id") || o.attr("id"))
    .attr("name",o.attr("ms-id") || o.attr("id"))
    .val(o.val() || o.text() || o.attr("src"))

  }

}

}:ms_box;

ms_box.init();
})
