/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	config.language = 'zh-cn';
	//config.uiColor = '#F7B42C';
	config.height = 560;
	config.toolbarCanCollapse = true;
	config.removeButtons = 'Flash';
	// config.filebrowserImageUploadUrl = 'http://172.168.0.93:8088/cms/file/uploadImage';
	// config.filebrowserUploadUrl = 'http://172.168.0.93:8088/cms/file/uploadFile';
	config.filebrowserImageUploadUrl = 'http://172.168.0.84:8087/cms/file/uploadImage';
	config.filebrowserUploadUrl = 'http://172.168.0.84:8087/cms/file/uploadFile';
	// 
	// config.filebrowserImageUploadUrl = 'http://139.159.163.67:8085/cms/file/uploadImage';
	// config.filebrowserUploadUrl = 'http://139.159.163.67:8085/cms/file/uploadFile';
};
