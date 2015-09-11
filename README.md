# select2-synced-multi
This is a plugin that works with well known select2 jquery replacement for select boxes and provides ability to sync 2 or more select box's contents

# How to use it
This a jquery plugin, so to call it simply write

```
$('#first').sync_select2_multi({
	    data: myData,
	    placeholder: "-- Select Keys --",
	    sync:['#second']
	})
	
```

