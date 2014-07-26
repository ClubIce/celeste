var Editor = {
  TileSetEditor:{
    tilesContainer:{
      stage:null,
      cursorIndex:0,
      setup:function () {
        this.cursor = new Kinetic.Rect({
          width:32,
          height:32,
          stroke:"black",
          strokeWidth:1,
          fillEnabled:false
        });
        this.bitmapLayer = new Kinetic.Layer();
        this.cursorLayer = new Kinetic.FastLayer();
        this.cursorLayer.add(this.cursor);
        this.stage.add(this.bitmapLayer,this.cursorLayer);
      }
    },
    tilePreview:null,
    layerEditor:{
      stage:null,
      setup:function () {
        this.cursor = new Kinetic.Rect({
          width:16,
          height:16,
          stroke:"black",
          strokeWidth:1,
          fillEnabled:false
        });
        this.bitmapLayer = new Kinetic.Layer();
        this.cursorLayer = new Kinetic.FastLayer();
        this.cursorLayer.add(this.cursor);
        this.stage.add(this.bitmapLayer,this.cursorLayer);
      }
    },
    tileGraphic:null,
    createNew:function () {
      console.log("Creando nuevo TileSet");
      this.tileset = new Editor.TileSetEditor.TileSet();
      this.tilesContainer.setup();
      this.setupTileLayers();
      this.layerEditor.setup();
    },
    updateDialogTitle:function () {
      console.log("Actualizando Titulo del Dialogo");
      $("#tileset-editor-dialog")
        .dialog("option","title","Editor de TileSet - " + this.tileset.name + (this.tileset.chaned ? "*" : ""));
    },
    setupTileLayers:function() {
      $("#tileset-editor-layers").html("");
      for (i in this.tileset.tiles[this.tilesContainer.cursorIndex].layers) {
        var layer = this.tileset.tiles[this.tilesContainer.cursorIndex].layers[i];
        $("#tileset-editor-layers").append($("<option value=\""+i+"\">Nv:"+layer.level+" In:"+i+" "+layer.name+"</option>"))
          .prop("selectedIndex",0);
      }
    },
    TileSet:function () {
      this.name = "Sin Titulo";
      this.tiles = {
        0:new Editor.TileSetEditor.Tile(0)
        };
      this.graphics = [];
    },
    Tile:function (index) {
      this.index = index;
      this.layers = {
        1:new Editor.TileSetEditor.TileLayer("Capa 1",1),
        2:new Editor.TileSetEditor.TileLayer("Capa 2",2)
      };
      this.properties = {};
    },
    TileLayer:function (name, level,index) {
      this.name = name;
      this.graphic = "";
      this.segments = [
        new Editor.TileSetEditor.TileLayerSegment(),
        new Editor.TileSetEditor.TileLayerSegment(),
        new Editor.TileSetEditor.TileLayerSegment(),
        new Editor.TileSetEditor.TileLayerSegment()
      ];
      this.level = level;
    },
    TileLayerSegment:function () {
      this.graphicIndex = 0;
      this.verticalFlip = false;
      this.horizontalFlip = false;
      this.rotate = 0;
      this.hue = 0;
      this.opacity = 100;
    }
  }
};

$(document).ready(function () {
  $(document).tooltip();
  $("#tileset-editor-dialog").dialog({
    width:700,
    resizable:false,
    closeOnEscape:false,
    modal:true,
    closeText:"Cerrar"
  });
  $("#tileset-editor-new-button").on("click",function () {;
    Editor.TileSetEditor.createNew();
    Editor.TileSetEditor.updateDialogTitle();
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
  
  Editor.TileSetEditor.tilesContainer.stage = new Kinetic.Stage({
    container:"tileset-editor-tiles",
    width:288,
    height:256
  });
  Editor.TileSetEditor.tilePreview = new Kinetic.Stage({
    container:"tileset-editor-tile-preview",
    width:32,
    height:32
  });
  Editor.TileSetEditor.layerEditor.stage = new Kinetic.Stage({
    container:"tileset-editor-layer-editor",
    width:32,
    height:32
  });
  Editor.TileSetEditor.tileGraphic = new Kinetic.Stage({
    container:"tileset-editor-graphic-viewer",
    width:640,
    height:182
  });
});