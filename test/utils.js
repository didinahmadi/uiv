import $ from 'jquery'
import Vue from 'vue'

export const transition = 300

export const keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
}

export const triggerEvent = (elm, name, evtProps = {}, ...opts) => {
  let eventName
  let evt
  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
    evt = new KeyboardEvent(name, evtProps)
  } else {
    eventName = 'HTMLEvents'
  }
  if (!evt) {
    evt = document.createEvent(eventName)
    evt.initEvent(name, ...opts)
    for (let k in evtProps) {
      evt[k] = evtProps[k]
    }
  }
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt)
  return elm
}

export const triggerKey = (el, key, type = 'down') => {
  if (document.createEventObject) {
    let eventObj = document.createEventObject()
    eventObj.keyCode = key
    el.fireEvent(`onkey${type}`, eventObj)
    eventObj.keyCode = key
  } else if (document.createEvent) {
    let eventObj = document.createEvent('Events')
    eventObj.initEvent(`key${type}`, true, true)
    eventObj.which = key
    eventObj.keyCode = key
    el.dispatchEvent(eventObj)
  }
}

export const sleep = (time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export const createVm = (template, _data, _options) => {
  $('<div id="app"><div id="mount"></div></div>').appendTo('body')
  const res = Vue.compile(template)
  return new Vue({
    data () {
      return {
        ..._data
      }
    },
    ..._options,
    render: res.render,
    staticRenderFns: res.staticRenderFns
  }).$mount('#mount')
}

export const destroyVm = (vm) => {
  if (!vm) {
    return
  }
  $(vm.$el).remove()
  $('#app').remove()
  vm.$destroy()
}
