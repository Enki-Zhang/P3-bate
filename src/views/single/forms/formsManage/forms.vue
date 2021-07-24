<template>

    <el-row class="_root_page">
        <el-row class="page-default-pd page-default-h-has-breadcrumb ">
            <el-row class="page-default-pd-bgc-white">
                <div class="board">
                    <div class="leftBox">
                      <div class = "l_li">
                        <p>输入型组件</p>
                        <draggable 
                          v-model="componentInputBox" 
                          :options="{group:{name: 'itxst',pull:'clone'},sort: false}" 
                          animation="300" 
                          :move="onMove">
                              <div 
                                class="componentItem" 
                                v-for="item in componentInputBox" 
                                :key="item.id">
                                {{item.attr_name}}
                              </div>
                        </draggable>
                      </div>
                      <div class = "l_li">
                        <p>选择型组件</p>
                        <draggable 
                          v-model="componentSelectBox" 
                          :options="{group:{name: 'itxst',pull:'clone'},sort: false}" 
                          animation="300" 
                          :move="onMove">
                              <div 
                                class="componentItem" 
                                v-for="item in componentSelectBox" 
                                :key="item.id">
                                {{item.attr_name}}
                              </div>
                        </draggable>
                      </div>
                      <div class = "l_li">
                        <p>布局型组件</p>
                        <draggable 
                          v-model="componentLayerBox" 
                          :options="{group:{name: 'itxst',pull:'clone'},sort: false}" 
                          animation="300" 
                          :move="onMove">
                              <div 
                                class="componentItem" 
                                v-for="item in componentLayerBox" 
                                :key="item.id">
                                {{item.attr_name}}
                              </div>
                        </draggable>
                      </div>
                    </div>

                    <div class="centerBox">
                      <draggable 
                        ghostClass="dr-placeholder"
                        class = "areaBox"
                        v-model="formBox" 
                        @add="onAdd" 
                        group="itxst" 
                        animation="300" 
                        handle=".dragBtn"
                        :move="onMove">
                          <template v-for="item,index in formBox" >
                            <div 
                              v-if = "item.type == 'childForm'" 
                              :key="item.id" 
                              class = "formItem formItemTable" 
                              :class = "item.id == selectingId ? 'selecting' : ''" 
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <div class = "label">子表单</div>
                              <div class = "area">
                                <draggable 
                                  class="childAreaBox"
                                  ghostClass="dr-placeholder"
                                  v-model="item.arr" 
                                  @add="onAddChild" 
                                  group="itxst" 
                                  animation="300"
                                  :data-index="index"
                                  :data-type="item.type"
                                  :move="onMove">
                                  <template v-for="item2,index2 in item.arr" >
                                    <div 
                                      :key="item2.id" 
                                      v-if = "item2.type == 'input'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div>
                                        <input 
                                          class = "inputBox"
                                          :placeholder="formBox[index]['arr'][index2].attr_placeholder"
                                          readonly 
                                          type = "text" 
                                          v-model = "formBox[index]['arr'][index2].attr_value"/>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'inputNumber'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div class = "inputNumberBox">
                                          <input 
                                            :placeholder="formBox[index]['arr'][index2].attr_placeholder"
                                            readonly 
                                            type = "number" 
                                            v-model = "formBox[index]['arr'][index2].attr_value"/>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'textarea'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div>
                                        <textarea 
                                          :placeholder="formBox[index]['arr'][index2].attr_placeholder"
                                          readonly 
                                          style = "resize:none" 
                                          rows = "4" 
                                          v-model = "formBox[index]['arr'][index2].attr_value"/></textarea>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'select'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div class = "selectBox">
                                        <input 
                                          :value = "formBox[index]['arr'][index2].data_value" 
                                          readonly 
                                          type = "text" 
                                          class = "select" 
                                          :placeholder="formBox[index]['arr'][index2].attr_placeholder" />
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'linkSelect'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div class = "selectBox">
                                        <input :placeholder = "item2.attr_placeholder" readonly type = "text" :value = "item2.attr_data_link_value.join('/')"/>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'radio'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div class = "radioBox">
                                        <label 
                                          style = "display:block"
                                          v-for = "v,index in item2.attr_data_list"
                                          :key = "index">
                                          <input 
                                            :name="item2.id" 
                                            type="radio" 
                                            :value="v.name" 
                                            :checked = "index == item2.data_index && v.name == item2.data_value" /> {{v.name}} 
                                        </label>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'check'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div class = "checkBox">
                                        <label 
                                          v-for = "v,index in item2.attr_data_check_list"
                                          :key = "index">
                                          <input 
                                            :name="item2.id" 
                                            type="checkbox" 
                                            :value="v.name" 
                                            :checked = "v.check" /> {{v.name}} 
                                        </label>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'switch'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div class = "switchBox" :class = "item2.attr_boolean_value ? 'on' : ''">
                                        <b></b>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'time'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div>
                                        <input type="time" step = "1" v-model = "item2.attr_time_value"/>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'date'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div>
                                        <input type="date" v-model = "item2.attr_date_value"/>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'dateRange'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div class = "timeRangeBox">
                                        <input type="date" v-model = "item2.attr_date_range_value[0]"/>
                                        <b> - </b>
                                        <input type="date" v-model = "item2.attr_date_range_value[1]"/>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'timeRange'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div class = "timeRangeBox">
                                        <input type="time" step = "1" v-model = "item2.attr_time_range_value[0]"/>
                                        <b> - </b>
                                        <input type="time" step = "1" v-model = "item2.attr_time_range_value[1]"/>
                                      </div>
                                    </div>
                                    <div 
                                      :key="item2.id" 
                                      v-else-if = "item2.type == 'upload'"
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <div class = "uploadBox">
                                        <span>+</span>
                                      </div>
                                    </div>
                                    <div 
                                      v-else
                                      :class = "item2.id == selectingId ? 'selecting' : ''" 
                                      class = "formItem" 
                                      @click = "selectItem(index,index2)">
                                      <i class = "dragBtn"></i>
                                      <i class = "delBtn" @click = "delCompent"></i>
                                      <p>{{item2.attr_name}}</p>
                                      <p class = "defaultValue">{{item2.attr_value}}</p>
                                    </div>
                                  </template>
                                  
                                </draggable>
                              </div>
                            </div>
                            <div 
                              v-else-if = "item.type == 'button'" 
                              :key="item.id"
                              class = "formItem formItemButton" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                            </div>
                            <div 
                              v-else-if = "item.type == 'input'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <input 
                                :placeholder="formBox[index].attr_placeholder" 
                                readonly 
                                type = "text" 
                                v-model = "formBox[index].attr_value"/>
                            </div>
                            <div 
                              v-else-if = "item.type == 'inputNumber'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <span class = "inputBox">
                                <input 
                                  :placeholder="formBox[index].attr_placeholder"
                                  readonly 
                                  type = "number" 
                                  v-model = "formBox[index].attr_value"/>
                              </span>
                            </div>
                            <div 
                              v-else-if = "item.type == 'textarea'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <textarea 
                                :placeholder="formBox[index].attr_placeholder"
                                readonly 
                                rows="4" 
                                v-model = "formBox[index].attr_value"/></textarea>
                            </div>
                            <div 
                              v-else-if = "item.type == 'select'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <span class = "selectBox">
                                <input 
                                  :value = "formBox[index].data_value" 
                                  readonly 
                                  type = "text" 
                                  class = "select" 
                                  :placeholder="formBox[index].attr_placeholder" />
                              </span>
                            </div>
                            <div 
                              v-else-if = "item.type == 'radio'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <span class = "radioBox">
                                <label 
                                  :style = "{display:item.attr_layer}"
                                  v-for = "v,index in item.attr_data_list"
                                  :key = "index">
                                  <input 
                                    :name="item.id" 
                                    type="radio" 
                                    :value="v.name" 
                                    :checked = "index == item.data_index && v.name == item.data_value" /> {{v.name}} 
                                </label>
                              </span>
                            </div>
                            <div 
                              v-else-if = "item.type == 'check'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <span class = "checkBox">
                                <label 
                                  :style = "{display:item.attr_layer}"
                                  v-for = "v,index in item.attr_data_check_list"
                                  :key = "index">
                                  <input 
                                    :name="item.id" 
                                    type="checkbox" 
                                    :value="v.name" 
                                    :checked = "v.check" /> {{v.name}} 
                                </label>
                              </span>
                            </div>
                            <div 
                              v-else-if = "item.type == 'switch'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <span class = "switchBox" :class = "item.attr_boolean_value ? 'on' : ''">
                                <b></b>
                              </span>
                            </div>
                            <div 
                              v-else-if = "item.type == 'time'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <input type="time" step = "1" v-model = "item.attr_time_value"/>
                            </div>
                            <div 
                              v-else-if = "item.type == 'timeRange'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <span class = "timeRangeBox">
                                <input type="time" step = "1" v-model = "item.attr_time_range_value[0]"/>
                                <b> - </b>
                                <input type="time" step = "1" v-model = "item.attr_time_range_value[1]"/>
                              </span>
                              
                            </div>
                            <div 
                              v-else-if = "item.type == 'date'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <input type="date" v-model = "item.attr_date_value"/>
                            </div>
                            <div 
                              v-else-if = "item.type == 'dateRange'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <span class = "dateRangeBox">
                                <input type="date" v-model = "item.attr_date_range_value[0]"/>
                                <b> - </b>
                                <input type="date" v-model = "item.attr_date_range_value[1]"/>
                              </span>
                            </div>
                            <div 
                              v-else-if = "item.type == 'linkSelect'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <span class = "selectBox">
                                <input readonly :placeholder = "item.attr_placeholder" type = "text" :value = "item.attr_data_link_value.join('/')"/>
                              </span>
                            </div>
                            <div 
                              v-else-if = "item.type == 'upload'" 
                              :key="item.id"
                              class = "formItem formItemInput" 
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                              <span class = "uploadBox">
                                <span>+</span>
                              </span>
                            </div>
                            <div 
                              v-else 
                              :key="item.id" 
                              class = "formItem" 
                              :style = "{textAlign:item.attr_label_align}"
                              :class = "item.id == selectingId ? 'selecting' : ''"  
                              @click = "selectItem(index)">
                              <i class = "dragBtn"></i>
                              <i class = "delBtn" @click = "delCompent"></i>
                              <span>{{item.attr_name}}</span>
                            </div>
                          </template>
                      </draggable>
                    </div>

                    <div class="rightBox">
                      <!-- <span>生成代码</span> -->
                      <span class = "btn" @click = "toPreview">预览</span>
                      <span class = "btn" @click = "toClear">清空</span>
                      <div class = "attrBox" v-if = "selectingId != -1">
                        <div class = "row" v-for = "v,k in attrObj" :key = "k" v-if = "k.indexOf('attr_') > -1">
                          <p>{{attrNameObj[k]}}</p>
                          <template>
                            <div v-if = "k == 'attr_label_align' || k == 'attr_input_align'">
                              <select v-model = "attrObj[k]">
                                <option value = "left">左对齐</option>
                                <option value = "center">居中</option>
                                <option value = "right">右对齐</option>
                              </select>
                            </div>
                            <div v-else-if = "k == 'attr_layer'">
                              <select v-model = "attrObj[k]">
                                <option value = "inline-block">水平</option>
                                <option value = "block">垂直</option>
                              </select>
                            </div>
                            <div v-else-if = "k == 'attr_boolean_value'">
                              <select v-model = "attrObj[k]">
                                <option :value = "true">开</option>
                                <option :value = "false">关</option>
                              </select>
                            </div>
                            <div v-else-if = "k == 'attr_data_list'">
                              <table class = "selectList">
                                <tr>
                                  <th>名称</th>
                                  <th>操作</th>
                                </tr>
                                <tr v-for = "v,index in attrObj[k]" :key = "index">
                                  <td><input v-model = "v.name" type = "text"/></td>
                                  <td>
                                    <a @click = "selectDefault(index)" href="javascript:void(0);">设为默认</a>
                                    <a @click = "selectDel(index)" href="javascript:void(0);">删除</a>
                                  </td>
                                </tr>
                              </table>
                              <div>
                                <a @click = "selectAdd" class = "btn2" href = "javascript:void(0);">添加</a>
                              </div>
                            </div>
                            <div v-else-if = "k == 'attr_data_check_list'">
                              <table class = "selectList">
                                <tr>
                                  <th></th>
                                  <th>名称</th>
                                  <th>操作</th>
                                </tr>
                                <tr v-for = "v,index in attrObj[k]" :key = "index">
                                  <td><input type = "checkbox" v-model = "v.check" @change = "checkSelect(index)"/></td>
                                  <td><input v-model = "v.name" type = "text"/></td>
                                  <td>
                                    <a @click = "checkDel(index)" href="javascript:void(0);">删除</a>
                                  </td>
                                </tr>
                              </table>
                              <div>
                                <a @click = "checkAdd" class = "btn2" href = "javascript:void(0);">添加</a>
                              </div>
                            </div>
                            <div v-else-if = "k == 'attr_data_link_value'">
                              <el-cascader
                                clearable
                                size="small"
                                v-model="attrObj[k]"
                                :options="attrObj['attr_data_link_list']">
                              </el-cascader>
                            </div>
                            <div v-else-if = "k == 'attr_time_value'">
                              <el-time-picker
                                size="small"
                                v-model="attrObj[k]"
                                value-format="HH:mm:ss"
                                :picker-options="{
                                  selectableRange: '00:00:00 - 23:59:59'
                                }">
                              </el-time-picker>
                            </div>
                            <div v-else-if = "k == 'attr_time_range_value'">
                              <el-time-picker
                                style = "width:100%"
                                is-range
                                size="small"
                                v-model="attrObj[k]"
                                value-format="HH:mm:ss"
                                range-separator="-">
                              </el-time-picker>
                            </div>
                            <div v-else-if = "k == 'attr_data_link_list'">
                              <a @click = "popLinkSelect" href = "javascript:void(0);">设置选项</a>
                            </div>
                            <div v-else-if = "k == 'attr_date_value'">
                              <el-date-picker
                                size="small"
                                value-format="yyyy-MM-dd"
                                v-model="attrObj[k]"
                                type="date">
                              </el-date-picker>
                            </div>
                            <div v-else-if = "k == 'attr_date_range_value'">
                              <el-date-picker
                                style = "width:100%"
                                size="small"
                                value-format="yyyy-MM-dd"
                                v-model="attrObj[k]"
                                type="daterange"
                                range-separator="-">
                              </el-date-picker>
                            </div>
                            <div v-else>
                              <input type = "text" v-model = "attrObj[k]"/>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>

                    <previewBox :data = "formBox" ref = "preview"/>

                    <el-dialog
                      title="设置选项"
                      :visible.sync="linkSelectPop"
                      width="50%">
                      <div class = "linkSelectBox">
                        <div class = "l_first" v-for = "v,index in (attrObj.hasOwnProperty('attr_data_link_list') ? attrObj.attr_data_link_list : [])" :key = "index">
                          <div class = "l_row">
                            <span>文本：</span><input v-model = "v.label"/>
                            <span>值：</span><input v-model = "v.value"/>
                            <span><a @click = "linkSelectAdd(0,index)" href="javascript:void(0);">添加子选项</a></span>
                            <span><a @click = "linkSelectDel(index)" href="javascript:void(0);">删除</a></span>
                          </div>
                          <div class = "l_second" v-if = "v.hasOwnProperty('children')" v-for = "v2,index2 in v.children" :key = "index2">
                            <div class = "l_row">
                              <span>文本：</span><input v-model = "v2.label"/>
                              <span>值：</span><input v-model = "v2.value"/>
                              <span><a @click = "linkSelectAdd(0,index,index2)" href="javascript:void(0);">添加子选项</a></span>
                              <span><a @click = "linkSelectDel(index,index2)" href="javascript:void(0);">删除</a></span>
                            </div>
                            <div class = "l_third" v-if = "v2.hasOwnProperty('children')" v-for = "v3,index3 in v2.children" :key = "index3">
                              <div class = "l_row">
                                <span>文本：</span><input v-model = "v3.label"/>
                                <span>值：</span><input v-model = "v3.value"/>
                                <span><a @click = "linkSelectDel(index,index2,index3)" href="javascript:void(0);">删除</a></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class = "l_btn"><a @click = "linkSelectAdd(0)" href="javascript:void(0);">添加子选项</a></div>
                      </div>
                    </el-dialog>
                </div>
            </el-row>
        </el-row>
    </el-row>

</template>

<script>
    import draggable from "vuedraggable";
    import previewBox from "./autoForm/Preview"
    import componentObj from "./autoForm/Component.js"

    export default {
        name: "forms",
        data() {
            return {
                linkSelectPop:false,
                attrNameObj:componentObj.attr,
                componentInputBox: componentObj.inputList,
                componentSelectBox: componentObj.selectList,
                componentLayerBox: componentObj.layerList,
                formBox: [],
                moveId: -1,
                selectingId:-1,
                selectingIndex:[],
                attrObj:{}
            }
        },
        components: {
            draggable,
            previewBox
        },
        mounted() {
            
        },
        methods: {
            linkSelectDel(){
                if(this.selectingIndex.length == 1){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));

                  async function clearValue(obj,vm){
                    obj.attr_data_link_value = [];
                    vm.attrObj = obj;
                  }

                  clearValue(obj,this).then(v => {
                    if(arguments.length == 1){
                      obj.attr_data_link_list.splice(arguments[0],1);
                    }
                    else if(arguments.length == 2){
                      obj.attr_data_link_list[arguments[0]]['children'].splice(arguments[1],1);
                      if(obj.attr_data_link_list[arguments[0]]['children'].length == 0){
                        delete obj.attr_data_link_list[arguments[0]].children;
                      }
                    }
                    else if(arguments.length == 3){
                      obj.attr_data_link_list[arguments[0]]['children'][arguments[1]]['children'].splice(arguments[2],1);
                      if(obj.attr_data_link_list[arguments[0]]['children'][arguments[1]]['children'].length == 0){
                        delete obj.attr_data_link_list[arguments[0]]['children'][arguments[1]].children;
                      }
                    }

                    this.$set(this.formBox,this.selectingIndex[0],obj);
                    this.attrObj = obj;
                  });
                }
                else if(this.selectingIndex.length == 2){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));

                  async function clearValue(obj,vm){
                    obj['arr'][vm.selectingIndex[1]].attr_data_link_value = [];
                    vm.attrObj =  obj['arr'][vm.selectingIndex[1]];
                  }
                  clearValue(obj,this).then(v => {
                    if(arguments.length == 1){
                      obj['arr'][this.selectingIndex[1]].attr_data_link_list.splice(arguments[0],1);
                    }
                    else if(arguments.length == 2){
                      obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[0]]['children'].splice(arguments[1],1);
                      if(obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[0]]['children'].length == 0){
                        delete obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[0]].children;
                      }
                    }
                    else if(arguments.length == 3){
                      obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[0]]['children'][arguments[1]]['children'].splice(arguments[2],1);
                      if(obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[0]]['children'][arguments[1]]['children'].length == 0){
                        delete obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[0]]['children'][arguments[1]].children;
                      }
                    }
                    obj['arr'][this.selectingIndex[1]].attr_data_link_value = [];

                    this.$set(this.formBox,this.selectingIndex[0],obj);
                    this.attrObj = obj['arr'][this.selectingIndex[1]];
                  });

                    
                }
              },
              linkSelectAdd(){
                if(this.selectingIndex.length == 1){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));

                  if(arguments.length == 1){
                    obj.attr_data_link_list.push({label:'',value:''});
                  }
                  else if(arguments.length == 2){
                    if(!obj.attr_data_link_list[arguments[1]].hasOwnProperty('children'))
                      obj.attr_data_link_list[arguments[1]].children = [];
                    obj.attr_data_link_list[arguments[1]]['children'].push({label:'',value:''});
                  }
                  else if(arguments.length == 3){
                    if(!obj.attr_data_link_list[arguments[1]]['children'][arguments[2]].hasOwnProperty('children'))
                      obj.attr_data_link_list[arguments[1]]['children'][arguments[2]].children = [];
                    obj.attr_data_link_list[arguments[1]]['children'][arguments[2]]['children'].push({label:'',value:''});
                  }

                  
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj;
                }
                else if(this.selectingIndex.length == 2){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));

                  if(arguments.length == 1){
                    obj['arr'][this.selectingIndex[1]].attr_data_link_list.push({label:'',value:''});
                  }
                  else if(arguments.length == 2){
                    if(!obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[1]].hasOwnProperty('children'))
                      obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[1]].children = [];
                    obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[1]]['children'].push({label:'',value:''});
                  }
                  else if(arguments.length == 3){
                    if(!obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[1]]['children'][arguments[2]].hasOwnProperty('children'))
                      obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[1]]['children'][arguments[2]].children = [];
                    obj['arr'][this.selectingIndex[1]].attr_data_link_list[arguments[1]]['children'][arguments[2]]['children'].push({label:'',value:''});
                  }

                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj['arr'][this.selectingIndex[1]];
                }
              },
              popLinkSelect(){
                this.linkSelectPop = true;
              },
              checkSelect(index){

                if(this.selectingIndex.length == 1){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  
                  var newArr = [];
                  obj.attr_data_check_list.forEach(function(e){
                    if(e.check){
                      newArr.push(e.name);
                    }
                  });
                  obj.data_value = newArr;
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj;
                }
                else if(this.selectingIndex.length == 2){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  var newArr = [];
                  obj['arr'][this.selectingIndex[1]].attr_data_check_list.forEach(function(e){
                    if(e.check){
                      newArr.push(e.name);
                    }
                  });
                  obj['arr'][this.selectingIndex[1]].data_value = newArr;
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj['arr'][this.selectingIndex[1]];
                }
              },
              checkAdd(){
                if(this.selectingIndex.length == 1){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  //console.log(obj);
                  var newId = obj.attr_data_check_list.length == 0 ? 1 : obj.attr_data_check_list[obj.attr_data_check_list.length - 1].id + 1;
                  obj.attr_data_check_list.push({id:newId,name:'',check:false});
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj;
                }
                else if(this.selectingIndex.length == 2){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  
                  var newId = obj['arr'][this.selectingIndex[1]].attr_data_check_list.length == 0 ? 1 : obj['arr'][this.selectingIndex[1]].attr_data_check_list[obj['arr'][this.selectingIndex[1]].attr_data_check_list.length - 1].id + 1;

                  obj['arr'][this.selectingIndex[1]].attr_data_check_list.push({id:newId,name:'',check:false});
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj['arr'][this.selectingIndex[1]];
                }
              },
              checkDel(index){
                if(this.selectingIndex.length == 1){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  //console.log(obj);
                  obj.attr_data_check_list.splice(index,1);
                  obj.data_value = [];
                  for(var i = 0;i < obj.attr_data_check_list.length;i++){
                    if(obj.attr_data_check_list[i].check){
                      obj.data_value.push(obj.attr_data_check_list[i].name);
                    }
                  }
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj;
                }
                else if(this.selectingIndex.length == 2){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  //console.log(obj);
                  obj['arr'][this.selectingIndex[1]].attr_data_check_list.splice(index,1);
                  obj['arr'][this.selectingIndex[1]].data_value = [];
                  for(var i = 0;i < obj['arr'][this.selectingIndex[1]].attr_data_check_list.length;i++){
                    if(obj['arr'][this.selectingIndex[1]].attr_data_check_list[i].check){
                      obj['arr'][this.selectingIndex[1]].data_value.push(obj['arr'][this.selectingIndex[1]].attr_data_check_list[i].name);
                    }
                  }
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj['arr'][this.selectingIndex[1]];
                }
              },
              selectAdd(){
                if(this.selectingIndex.length == 1){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  //console.log(obj);
                  var newId = obj.attr_data_list.length == 0 ? 1 : obj.attr_data_list[obj.attr_data_list.length - 1].id + 1;
                  obj.attr_data_list.push({id:newId,name:''});
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj;
                }
                else if(this.selectingIndex.length == 2){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  
                  var newId = obj['arr'][this.selectingIndex[1]].attr_data_list.length == 0 ? 1 : obj['arr'][this.selectingIndex[1]].attr_data_list[obj['arr'][this.selectingIndex[1]].attr_data_list.length - 1].id + 1;

                  obj['arr'][this.selectingIndex[1]].attr_data_list.push({id:newId,name:''});
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj['arr'][this.selectingIndex[1]];
                }
              },
              selectDefault(index){
                if(this.selectingIndex.length == 1){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  //console.log(obj);
                  obj.data_index = index;
                  obj.data_value = obj.attr_data_list[index].name;
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj;
                }
                else if(this.selectingIndex.length == 2){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  //console.log(obj);
                  obj['arr'][this.selectingIndex[1]].data_index = index;
                  obj['arr'][this.selectingIndex[1]].data_value = obj['arr'][this.selectingIndex[1]].attr_data_list[index].name;
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj['arr'][this.selectingIndex[1]];
                }
              },
              selectDel(index){
                if(this.selectingIndex.length == 1){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  //console.log(obj);
                  obj.attr_data_list.splice(index,1);
                  if(obj.data_index >= obj.attr_data_list.length){
                    obj.data_index = obj.attr_data_list.length - 1;
                    obj.data_value = '';
                    if(obj.data_index < 0){
                      obj.data_index = 0;
                      obj.data_value = '';
                    }
                  }
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj;
                }
                else if(this.selectingIndex.length == 2){
                  var obj = JSON.parse(JSON.stringify(this.formBox[this.selectingIndex[0]]));
                  //console.log(obj);
                  obj['arr'][this.selectingIndex[1]].attr_data_list.splice(index,1);
                  if(obj['arr'][this.selectingIndex[1]].data_index >= obj['arr'][this.selectingIndex[1]].attr_data_list.length){
                    obj['arr'][this.selectingIndex[1]].data_index = obj['arr'][this.selectingIndex[1]].attr_data_list.length - 1;
                    obj['arr'][this.selectingIndex[1]].data_value = '';
                    if(obj['arr'][this.selectingIndex[1]].data_index < 0){
                      obj['arr'][this.selectingIndex[1]].data_index = 0;
                      obj['arr'][this.selectingIndex[1]].data_value = '';
                    }
                  }
                  this.$set(this.formBox,this.selectingIndex[0],obj);
                  this.attrObj = obj['arr'][this.selectingIndex[1]];
                }
              },
              toPreview(){
                this.$refs.preview.showFn();
              },
              toClear(){
                this.formBox = [];
              },
              //move回调方法
              onMove(e, originalEvent) {
                  //console.log(e.relatedContext.component.$el.dataset);
                  if(typeof e.relatedContext.element == 'undefined'){
                    if (e.draggedContext.element.type == 'childForm' && e.relatedContext.component.$el.dataset.type == 'childForm')return false;
                    return true;
                  }
                  this.moveId = e.relatedContext.element.id;
                  //不允许停靠
                  // if (e.draggedContext.element.id != 1 && e.relatedContext.element.id == 1) return false;
                  // if (e.draggedContext.element.id != 2 && e.relatedContext.element.id == 2) return false;
                  // if (e.draggedContext.element.id != 3 && e.relatedContext.element.id == 3) return false;
                  // if (e.draggedContext.element.id != 4 && e.relatedContext.element.id == 4) return false;
                  // if (e.draggedContext.element.id != 5 && e.relatedContext.element.id == 5) return false;
                  if (e.draggedContext.element.id != e.relatedContext.element.id && e.relatedContext.element.belongTo == 'componentBox')
                    return false;

                  if (e.draggedContext.element.type == 'childForm' && e.relatedContext.element.belongTo == 'formItem')return false;
                  return true;
              },
              onAdd(e){
                const newIndex = e.newIndex;
                  //console.log(newIndex);
                  let arr = JSON.parse(JSON.stringify(this.formBox));
                  let obj = arr[newIndex];
                  obj.id = 'module_' + new Date().getTime();
                  obj.belongTo = 'formBox';
                  this.selectingId = obj.id;
                  //console.log(this.selectingId);
                  this.selectingIndex = [newIndex];
                  if(obj.type == 'childForm'){
                    obj.arr = [];
                    obj.dataList = [];
                  }
                  this.attrObj = obj;
                  this.$set(this.formBox, newIndex,obj);
                  //console.log(this.attrObj);
                  //console.log(this.formBox);
              },
              onAddChild(e){
                //console.log(e);
                const newIndex = e.newIndex;
                const parentIndex = parseInt(e.target.dataset.index);
                // console.log(newIndex);
                let obj = JSON.parse(JSON.stringify(this.formBox[parentIndex]));
                obj.arr[newIndex].id = 'module_' + new Date().getTime();
                obj.arr[newIndex].belongTo = 'formItem';
                obj.dataList = [];
                this.selectingId = obj.arr[newIndex].id;
                this.selectingIndex = [parentIndex,newIndex];
                this.attrObj = obj.arr[newIndex];
                this.$set(this.formBox, parentIndex, obj);
                //console.log(this.formBox);
              },
              delCompent(){
                event.preventDefault();
        　　    event.stopPropagation();
                if(this.selectingIndex.length == 1){
                  const index = this.selectingIndex[0];
                  let arr = JSON.parse(JSON.stringify(this.formBox));
                  arr.splice(index,1);
                  if(arr.length == 0){
                    this.selectingId = -1;
                    this.selectingIndex = [];
                  }
                  else{
                    if(this.selectingIndex[0] > arr.length - 1){
                      this.selectingIndex[0]--;
                    }
                    this.selectingId = arr[this.selectingIndex[0]].id;
                  }
                  this.formBox = arr;
                }
                else if(this.selectingIndex.length == 2){
                  const index = this.selectingIndex[0];
                  const index2 = this.selectingIndex[1];
                  let obj = JSON.parse(JSON.stringify(this.formBox))[index];
                  obj.arr.splice(index2,1);
                  obj.dataList = [];

                  if(obj.arr.length == 0){
                    this.selectingIndex = [index];
                    this.selectingId = obj.id;
                  }
                  else{
                    if(this.selectingIndex[1] > obj.arr.length - 1)
                      this.selectingIndex[1] --;
                    this.selectingId = obj.arr[this.selectingIndex[1]].id;
                  }

                  this.$set(this.formBox,index,obj);
                }
              },
              selectItem(){
                event.preventDefault();
        　　    event.stopPropagation();

                if(arguments.length == 1){
                  const index = arguments[0];
                  let obj = this.formBox[index];
                  this.selectingId = obj.id;
                  this.selectingIndex = [index];
                  this.attrObj = obj;
                }
                else if(arguments.length == 2){
                  const index = arguments[0];
                  const index2 = arguments[1];
                  let obj = this.formBox[index]['arr'][index2];
                  this.selectingId = obj.id;
                  this.selectingIndex = [index,index2];
                  this.attrObj = obj;
                }
              }
        }
    }

</script>

<style lang="less" scoped>
@mainColor: #409eff;
@borderColor:#dcdfe6;
@borderColor2:#ccc;

.board {
  display: flex;
  height: 100vh;
  box-sizing: border-box;
  .leftBox {
    border: 1px solid #aaa;
    width: 262px;
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
    margin-right: 10px;
    .l_li{
      &>p{
        margin:0;
        padding: 0 0 10px;
      }
      &>div{
        font-size: 0;
        text-align: left;

      }
    }
  }
  .centerBox {
    box-sizing: border-box;
    border: 1px solid #aaa;
    flex-grow: 1;
    padding: 10px;
    width: 0;
  }
  .rightBox {
    border: 1px solid #aaa;
    width: 260px;
    padding: 10px;
    height: 100%;
    box-sizing: border-box;
    margin-left: 10px;

    .btn{
      width:100%;
      text-align:center;
      border-radius: 4px;
      border:1px solid #ccc;
      font-size: 12px;
      display: block;
      height: 30px;
      line-height: 30px;
      margin:0;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .btn2{
      font-size:14px;
    }
    .attrBox{
      text-align:left;
      .row{
        padding-bottom:10px;
        &>p{
          padding-bottom:6px;
          margin:0;
        }
        input{
          width:100%;
          border:none;
          border:1px solid @borderColor2;
          padding:6px 10px;
          box-sizing:border-box;
        }
      }
    }
    .selectList{
      margin-bottom:10px;
      border:1px solid @borderColor2;
      border-collapse: collapse;
      width:100%;
      tr{
        height:40px;
      }
      th,
      td{
        border:1px solid @borderColor;
        font-size:14px;
        padding-left:6px;
      }
      input{
        border:none;
        border:1px solid @borderColor2;
        width:100px !important;
      }
      input[type='checkbox']{
        width:auto !important;
      }
      a{font-size:14px;margin-right:10px;}
    }
  }
}

.linkSelectBox{
  text-align:left;
  .l_first{
    padding-top:10px;
    border-bottom:1px solid #ddd;
    padding-bottom:10px;
    .l_second{
      padding-left:30px;
      padding-top:10px;
      .l_third{
        padding-left:30px;
        padding-top:10px;
      }
    }
  }
  .l_row{

    span{
      padding-left:10px;
    }
    input{
      width:90px;
      border:none;
      border:1px solid @borderColor2;
      border-radius:6px;
      font-size:14px;
      color:#666;
      padding:4px 6px;
    }
  }
  .l_btn{padding-left:10px;padding-top:10px;}
}

.areaBox{
  height: 100%;
}

.ghostClass {
  background-color: blue !important;
}
.chosenClass {
  background-color: red !important;
  opacity: 1 !important;
}
.dragClass {
  background-color: yellow !important;
  opacity: 1 !important;
  box-shadow: none !important;
  outline: none !important;
  background-image: none !important;
}
.itxst {
  margin: 10px;
}
.title {
  padding: 6px 12px;
}

.blankBox{
  height: 100%;
}
.componentItem {
  display: inline-block;
  vertical-align: top;
  padding: 6px 12px;
  border: 1px solid #eee;
  background-color: #f4f4f4;
  font-size: 14px;
  width: 112px;
  margin-bottom: 10px;
}
.componentItem:hover {
  border:1px dashed @mainColor;
  cursor: move;
  color: @mainColor;
}
.componentItem:nth-child(2n){
  margin-left:12px;
}

.formItem{
  background: #f8f8f8;
  border:1px dashed #aaa;
  padding: 10px;
  min-height: 40px;
  position: relative;
  &>.dragBtn{
    cursor: move;
    display: none;
    position: absolute;
    z-index: 100;
    top:-2px;
    left: -2px;
    width: 20px;
    height: 20px;
    background:url('../../../../assets/image/form/icon_move.png')  no-repeat center center;
    background-size: 16px;
    background-color:@mainColor;
  }
  &>.delBtn{
    cursor: pointer;
    display: none;
    position: absolute;
    z-index: 100;
    bottom:-2px;
    right: -2px;
    width: 20px;
    height: 20px;
    background:url('../../../../assets/image/form/icon_del.png')  no-repeat center center;
    background-size: 12px;
    background-color:@mainColor;
  }
}
.formItem + .formItem{
  margin-top: 6px;
}
.selecting{
  border:3px solid @mainColor;
  &>.dragBtn,
  &>.delBtn{
    display: block;
  }
}


.formItemButton{
  text-align: left;
  span{
    display: inline-block;
    vertical-align: top;
    width: 90px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border:1px solid #ccc;
    border-radius: 4px;
    font-size: 12px;
    background: #fff;
  }
}



.formItemInput{
  display:flex;
  span{
    padding-right:10px;
  }
  input{
    flex-grow:1;
    outline:none;
    border:none;
    border:1px solid @borderColor;
  }
  textarea{
    flex-grow:1;
    outline:none;
    resize:none;
    border:none;
    border:1px solid @borderColor;
  }
  .inputBox{
    width:160px;
    height:36px;
    position:relative;
    padding-right:0;
    input{
      width:100%;
      height:38px;
      text-align:center;
      outline:none;
      border:none;
      border:1px solid @borderColor;
      padding:0;
    }

    &::before,
    &::after{
      content:'';
      display:block;
      position:absolute;
      top:0;
      z-index:10;
      text-align:center;
      width:36px;
      height:36px;
      line-height:36px;
      border:1px solid @borderColor;
      background:#f5f7fa;
    }
    &::before{
      left:0;
      content:'-';
    }
    &::after{
      content:'+';
      right:0px;
    }
  }
  .selectBox{
    width:190px;
    height:36px;
    position:relative;
    padding-right:0;
    input{
      width:100%;
      height:36px;
      text-align:center;
      padding-right:10px;
      outline:none;
      border:none;
      border:1px solid @borderColor;
    }
    &::after{
      content:'';
      display:block;
      position:absolute;
      top:50%;
      margin-top:-6px;
      right:10px;
      z-index:10;
      border-right:2px solid #ddd;
      border-bottom:2px solid #ddd;
      width:8px;
      height:8px;
      transform:rotate(45deg);
      -webkit-transform:rotate(45deg);
      -moz-transform:rotate(45deg);
      -ms-transform:rotate(45deg);
      -o-transform:rotate(45deg);
    }
  }
  .checkBox{
    label{
      display: inline-block;
      vertical-align: top;
      margin-right: 10px;
    }
  }
  .radioBox{
    width: 0;
    flex-grow: 1;
    text-align: left;
    label{
      display: inline-block;
      vertical-align: top;
      margin-right: 10px;
    }
  }
  .switchBox{
    width:48px;
    height:24px;
    padding:2px;
    background:#DCDFE6;
    border-radius:20px;
    text-align:left;
    b{
      display:inline-block;
      width:20px;
      height:20px;
      background:#fff;
      border-radius:100px;
    }
    &.on{
      background:#1890FF;
      text-align:right;
    }
  }
  .uploadBox{
    width:100px;
    height:100px;
    border:1px dashed #aaa;
    border-radius:10px;
    text-align:center;
    padding:0;
    span{
      font-size:30px;
      color:#aaa;
      line-height:100px;
      padding:0;
    }
  }
}

.formItemTable{
  display:flex;
  .label{
    padding-right:10px;
  }
  .area{
    flex-grow:1;
    width:0;
    border:1px solid #ccc;
    background:#fff;
    .childAreaBox{
      min-height: 60px;
      display:flex;
      overflow-x:auto;
      padding-right:100px;
      .formItem{
        min-width:210px;
        border:none;
        border-right:1px dashed #aaa;
        text-align: left;
        &>p{
          padding-bottom:10px;
        }
      }
      .formItem + .formItem{
        margin-top: 0;
      }
      .selecting{
        border:3px solid @mainColor !important;
        &>.dragBtn,
        &>.delBtn{
          display: block;
        }
      }
      .defaultValue{
        font-size:12px;
        color:#999;
      }
      input,
      textarea{
        width:100%;
        border:none;
        border:1px solid #dcdfe6;
      }
      .inputBox{
        height: 40px;
      }
      .inputNumberBox{
        width:100%;
        height:38px;
        position:relative;
        padding-right:0;
        input{
          width:100%;
          height:38px;
          text-align:center;
          outline:none;
          border:none;
          border:1px solid #dcdfe6;
        }

        &::before,
        &::after{
          text-align: center;
          content:'';
          display:block;
          position:absolute;
          top:0;
          z-index:10;
          width:36px;
          height:36px;
          line-height:36px;
          border:1px solid #dcdfe6;
          background:#f5f7fa;
        }
        &::before{
          left:0;
          content:'-';
        }
        &::after{
          content:'+';
          right:0px;
        }
      }
      .selectBox{
        width:100%;
        height:36px;
        position:relative;
        padding-right:0;
        input{
          width:100%;
          height:36px;
          text-align:center;
          padding-right:10px;
          outline:none;
          border:none;
          border:1px solid @borderColor;
          box-sizing:border-box;
        }
        &::after{
          content:'';
          display:block;
          position:absolute;
          top:50%;
          margin-top:-6px;
          right:10px;
          z-index:10;
          border-right:2px solid #ddd;
          border-bottom:2px solid #ddd;
          width:8px;
          height:8px;
          transform:rotate(45deg);
          -webkit-transform:rotate(45deg);
          -moz-transform:rotate(45deg);
          -ms-transform:rotate(45deg);
          -o-transform:rotate(45deg);
        }
      }
      .radioBox{
        text-align:left;
        input{
            width:auto;
        }
      }
      .switchBox{
        width:48px;
        height:24px;
        padding:2px;
        background:#DCDFE6;
        border-radius:20px;
        text-align:left;
        b{
          display:inline-block;
          width:20px;
          height:20px;
          background:#fff;
          border-radius:100px;
        }
        &.on{
          background:#1890FF;
          text-align:right;
        }
      }
      .checkBox{
        label{
          display: block;
          vertical-align: top;
          margin-right: 10px;
        }
        input{
            width:auto;
        }
      }
      .uploadBox{
        width:100px;
        height:100px;
        border:1px dashed #aaa;
        border-radius:10px;
        text-align:center;
        padding:0;
        span{
          font-size:30px;
          color:#aaa;
          line-height:100px;
          padding:0;
        }
      }
    }
  }
}

.dr-placeholder{
  width: 100%;
  background-color: #ff4400 !important;
  padding: 0 !important;
  height: 3px !important;
  min-height: 3px !important;
  max-height: 3px !important;
  font-size: 0 !important;
  > * {
    display: none;
  }
}


</style>