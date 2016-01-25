_ajaxReq = (argRequest,argOnEvent) ->
  jqxhr = $.ajax( argRequest
  ).done((resp) =>
    if not isUnset(argOnEvent) and 'done' of argOnEvent
      if toString.call(argOnEvent.done) == "[object Array]"
        for iterFunction in argOnEvent.done
          iterFunction(resp)
      else if toString.call(argOnEvent.done) == "[object Function]"
        argOnEvent.done(resp)
    return
  ).fail((jqXHR, textStatus, error) =>
    if not isUnset(argOnEvent) and 'fail' of argOnEvent
      if toString.call(argOnEvent.fail) == "[object Array]"
        for iterFunction in argOnEvent.fail
          iterFunction(jqXHR, textStatus, error)
      else if toString.call(argOnEvent.fail) == "[object Function]"
        argOnEvent.fail(jqXHR, textStatus, error)
    return
  ).always((resp) =>
    if not isUnset(argOnEvent) and 'always' of argOnEvent
      if toString.call(argOnEvent.always) == "[object Array]"
        for iterFunction in argOnEvent.always
          iterFunction(resp)
      else if toString.call(argOnEvent.always) == "[object Function]"
        argOnEvent.always(resp)
    return
  )
  return

_elementCreater = (argTag, argClass, argAppendTo) ->
  element = undefined
  element = document.createElement(argTag)
  if not isUnset(argClass)
    element.setAttribute 'class', argClass
  if not isUnset(argAppendTo)
    argAppendTo.appendChild element
  return element

isUnset = (argValue, argDefault) ->
  if typeof argDefault != "undefined" && argDefault != null
    if typeof argValue != "undefined" && argValue != null
      return argValue
    else
      return argDefault
  else
    if typeof argValue != "undefined" && argValue != null
      return false
    else
      return true
  return

doSubmit = () ->
  tInput = document.getElementById('MainInput')

  tempOnEvent = {}
  tempOnEvent.done = []
  tempOnEvent.fail = []
  tempOnEvent.always = []

  tempOnEvent.always.push(doRefresh)

  tempRequest = {}
  tempRequest.type = "POST"
  tempRequest.url = "http://127.0.0.1:3000/api/message/"
  tempRequest.contentType = 'application/json; charset=utf-8'
  tempRequest.dataType = 'json'
  tempRequest.data = JSON.stringify({'message':tInput.value})
  _ajaxReq(tempRequest,tempOnEvent)
  return

doRefresh = () ->
  console.log 'refresh started'
  tempOnEvent = {}
  tempOnEvent.done = []
  tempOnEvent.fail = []
  tempOnEvent.always = []
  tempOnEvent.always.push((resp) ->
    console.log 'always'
    console.log resp
    return)

  onDone = (resp) ->
    console.log resp
    tDump = document.getElementById('MainDiv')
    while tDump.lastChild
      tDump.removeChild(tDump.lastChild)
    for msg in resp.r
      tDiv = _elementCreater('div',null,tDump)
      tDiv.appendChild(document.createTextNode(msg.MESSAGE))
    return
  tempOnEvent.done = [onDone]

  tempRequest = {}
  tempRequest.type = "GET"
  tempRequest.url = "http://127.0.0.1:3000/api/message/0"
  tempRequest.contentType = 'application/json; charset=utf-8'
  tempRequest.dataType = 'json'
  _ajaxReq(tempRequest,tempOnEvent)
  return

# Init
tButton = document.getElementById('MainSubmit')
tButton.onclick = doSubmit

tButton = document.getElementById('MainRefresh')
tButton.onclick = doRefresh
