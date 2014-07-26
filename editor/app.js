var tilesContainer = null;
var tilePreview = null;
var layerEditor = null;
var tileGraphic = null;

$(document).ready(function () {
  $(document).tooltip();
  $("#tileset-editor-dialog").dialog({
    width:700
  });
  $("#tileset-editor-menu-bar").buttonset();
  $("#tileset-editor-tabs").tabs();
  $("#tileset-editor-buttons").buttonset();
  $("#tileset-editor-tone-slider").slider();
  $("#tileset-editor-rotate").selectmenu({
    width:100
  });
  $("#tileset-editor-graphic-select").selectmenu({
    width:500,
  });
  $("#tileset-editor-graphic-buttons").buttonset();
  
  tilesContainer = new Kinetic.Stage({
    container:"tileset-editor-tiles",
    width:288,
    height:256
  });
  tilePreview = new Kinetic.Stage({
    container:"tileset-editor-tile-preview",
    width:32,
    height:32
  });
  layerEditor = new Kinetic.Stage({
    container:"tileset-editor-layer-editor",
    width:32,
    height:32
  });
  tileGraphic = new Kinetic.Stage({
    container:"tileset-editor-graphic-viewer",
    width:640,
    height:182
  });
});