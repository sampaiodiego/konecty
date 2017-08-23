!@utils? and @utils = {}

!@utils.accentsTidy = (s) ->
	if not _.isString(s) then return ''
	r = s.toLowerCase()
	r = r.replace /\s/g      ,""
	r = r.replace /[àáâãäå]/g,"a"
	r = r.replace /æ/g       ,"ae"
	r = r.replace /ç/g       ,"c"
	r = r.replace /[èéêë]/g  ,"e"
	r = r.replace /[ìíîï]/g  ,"i"
	r = r.replace /ñ/g       ,"n"
	r = r.replace /[òóôõö]/g ,"o"
	r = r.replace /œ/g       ,"oe"
	r = r.replace /[ùúûü]/g  ,"u"
	r = r.replace /[ýÿ]/g    ,"y"
	return r

!@utils.unicodeSortArrayOfObjectsByParam = (arr, param) ->
	return arr.sort (a, b) ->
		if a[param]?
			return utils.accentsTidy(a[param]).localeCompare utils.accentsTidy(b[param])
		return 0

!@utils.sortArrayOfObjectsByParam = (arr, param) ->
	return arr.sort (a, b) ->
		if a[param]?
			return a[param].localeCompare b[param]
		return 0
