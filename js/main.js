var idbApp = (function() {
	'use strict';

	var dbPromises = idb.open('android',	1,	function(upgradeDB)	{
		var	store	=	upgradeDB.createObjectStore('version',	{keyPath:	'id'});
		store.put({id: 1, name: 'cupcake', versi: 1.5, api: 3});
		store.put({id: 2, name: 'donut', versi: 1.6, api: 4});
		store.put({id: 3, name: 'eclair', versi: 2.0, api: 5});
		store.put({id: 4, name: 'froyo', versi: 2.2, api: 8});
		store.put({id: 5, name: 'gingerbread', versi: 2.3, api: 9});
		store.put({id: 6, name: 'honeycomb', versi: 3.0, api: 11});
		store.put({id: 7, name: 'ice_cream_sandwich', versi: 4.0, api: 14});
		store.put({id: 8, name: 'jelly_bean', versi: 4.1, api: 16});
		store.put({id: 9, name: 'kitkat', versi: 4.4, api: 19});
		store.put({id: 10, name: 'lollipop', versi: 5.0, api: 21});
		store.put({id: 11, name: 'marshmallow', versi: 6.0, api: 23});
	});

	function showProducts() {
		var s = '';
		dbPromises.then(function(db) {
		  var tx = db.transaction('version', 'readonly');
		  var store = tx.objectStore('version');
		  return store.openCursor();
		}).then(function showRange(cursor) {
		  if (!cursor) {return;}
		  console.log('Cursored at:', cursor.value.name);

		  s += '<h2>' + cursor.value.name + '</h2>';
		  s += '<img src="images/' + cursor.value.name + '.png"><p>';
		  s += 'versi: ' + cursor.value.versi + ', API-' + cursor.value.api + '<br/>';
		  s += '</p><hr>';

		  return cursor.continue().then(showRange);
		}).then(function() {
		  if (s === '') {s = '<p>No results.</p>';}
		  document.getElementById('results').innerHTML = s;
		});
	}
  
	return {
		showProducts: (showProducts)
	};
})();