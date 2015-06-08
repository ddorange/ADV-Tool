# ADV-Tool
ADVパート作成ツール

## Architecture

### App
*Router*
- router <Backbone.Router>

*View*
- AppView
    %currentIndex:  現在表示しているシーンのインデックス  
    @add:           シーンを追加  
    @delete:        シーンを削除  
    @load:          シーンデータを読み込む  
    @save:          シーンデータを保存する  


### Chara
*Controller*
- CharaController

*Model*
- Chara
    * id:           <String>
    * profiledId:   <Int>
    * base:         <String>
    * blink:        <String>
    * scenes:       <Backbone.Collection> // Scene
- Scene
    * id:           <String>
    * profiledId:   <Int>
    * visible:      <Bool>
    * position:     <Int>       // -200 ~ 0 ~ 200
    * skin:         <String>    // chara_0_smile
    * action:       <String>    // HOP | SAD | etc...
    * balloon:      <String>    // ANGER | FAN | etc...
    * transform:    <String>    // show | hide | etc...

*Collection*
- Charas
    * model: chara
- Scenes
    * model: scene

*View*
- registerList
    * collection: Chara
- registerListItem
    * model: Chara
- editList
    * collection: Chara
- editListItem
    * model: Chara.scene[curentIndex]
- preview
    * model: Chara.scene[curentIndex]


### Stage
*Model*
- Stage
    * bg:           <String>    // img id
    * camera:       <Int>       // -200 ~ 0 ~ 200
    * stil:         <String>    // img id
    * effect:       <String>    // none | black | white | etc...

*Collection*
- Stages

*View*
- Edit
    * collection: Stages

### Word
*Model*
- Word
    * visible:      <Bool>
    * name:         <String>
    * type:         <String>    // UESR | CHARCTER | etc...
    * text:         <String>

*Collection*
- Words

*View*
- Edit
    * collection: Words



