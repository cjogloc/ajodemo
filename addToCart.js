var dsnType = localStorage.getItem("dsnType");

console.log(">>>>> DSN Template: " + dsnType);

function addToCart() {
	var cart = [];
	var currency = localStorage.getItem("brandcurrency");
	var price = Number(dataLayer.product.price.replace(currency,""));  // get selected product's price
	var name = dataLayer.product.name;  // get product name
	var qty = dataLayer.product.quantity;  // get quantity
	var productUrl = dataLayer.product.productURL;
	var imageUrl = dataLayer.product.imageURL;

	var item = {productName: name, productPrice: price, productQty: qty, productUrl: productUrl, productImageUrl: imageUrl};

	if(localStorage.getItem("cart") === null){
		//console.log("Cart doesn't exist: ");
		cart.push(item);
	}else{
		cart = JSON.parse(localStorage.getItem("cart"));
		for (var i in cart) {
			//console.log(cart[i].productName);
			if(cart[i].productName == name){
				cart[i].productQty += qty; 
				saveCart(cart);
				showCart(cart);
				addToCartP();
				return
	        }
	    }
		cart.push(item);
	}    	
	saveCart(cart);
	showCart(cart);
	addToCartP();
}

function addToCartP() {
	var cartP = [];
	var currency = localStorage.getItem("brandcurrency");
	var channel = "Desktop";
	var price = Number(dataLayer.product.price.replace(currency,""));
	var productName = dataLayer.product.name;
	var productSKU = dataLayer.product.sku;
	if(productSKU === "undefined"){
		productSKU = productName;
	}
	var qty = dataLayer.product.quantity;
	var productUrl = dataLayer.product.productURL;
	var imageUrl = dataLayer.product.imageURL;

	var itemP = {SKU: productSKU, priceTotal: price, quantity: qty, name: productName, product: imageUrl, productAddMethod: channel};

	if(dsnType === "International"){
		itemP = {SKU: productSKU, priceTotal: price, quantity: qty, name: productName, product: imageUrl, productAddMethod: channel};
	}else{
		itemP = {SKU: productSKU, priceTotal: price, quantity: qty, name: productName, product: imageUrl, productAddMethod: channel};
		itemP[localStorage.getItem("aepTenantId")] = { core:{ imageURL: imageUrl, productURL: productUrl}}
	}

	if(localStorage.getItem("cartP") === null){
		//console.log("DEBUG: CartP is null. Adding product.");
		cartP.push(itemP);
		saveCartP(cartP);

		var currentDataLayer = {};
		currentDataLayer = JSON.parse(localStorage.getItem("currentDataLayer"));
		currentDataLayer.cartArray = JSON.parse(localStorage.getItem("cartP"));
		currentDataLayer.action = "productAddToCart";
		window.dataLayer = currentDataLayer;
        localStorage.setItem("currentDataLayer", JSON.stringify(currentDataLayer));
	}else{
		cartP = JSON.parse(localStorage.getItem("cartP"));
		//console.log("DEBUG: CartP exists");
		//var count = Object.keys(cart).length;
		//console.log("Cart exists - " + count + " items in cart.");

		for (i = 0; i < cartP.length; i++) {
			console.log("DEBUG: CART Product Name" + cartP[i].name + ", productName: " + productName);
			if(cartP[i].name === productName){
				cartP[i].quantity += qty;
				saveCartP(cartP);
				var currentDataLayer = {};
			    currentDataLayer = JSON.parse(localStorage.getItem("currentDataLayer"));
			    currentDataLayer.cartArray = JSON.parse(localStorage.getItem("cartP"));
				currentDataLayer.action = "productAddToCart";
			    window.dataLayer = currentDataLayer;
            	localStorage.setItem("currentDataLayer", JSON.stringify(currentDataLayer));
				return;
			}
	    }

		cartP.push(itemP);
		saveCartP(cartP);

		var currentDataLayer = {};
		currentDataLayer = JSON.parse(localStorage.getItem("currentDataLayer"));
		currentDataLayer.cartArray = JSON.parse(localStorage.getItem("cartP"));
		currentDataLayer.action = "productAddToCart";
		window.dataLayer = currentDataLayer;
        localStorage.setItem("currentDataLayer", JSON.stringify(currentDataLayer));
	}
}

function thisAddToCart() {
	var thisAddToCart = [];
	var currency = localStorage.getItem("brandcurrency");
	var channel = "Desktop";
	var price = Number(dataLayer.product.price.replace(currency,""));
	var productName = dataLayer.product.name;
	var productSKU = dataLayer.product.sku;
	if(productSKU === "undefined"){
		productSKU = productName;
	}
	
	var qty = 1;  // get quantity
	var productUrl = dataLayer.product.productURL;
	var imageUrl = dataLayer.product.imageURL;

	var thisAddToCartP = {};

	if(dsnType === "International"){
		thisAddToCartP = {SKU: productSKU, priceTotal: price, quantity: qty, name: productName, product: imageUrl, productAddMethod: channel};
	}else{
		thisAddToCartP = {SKU: productSKU, priceTotal: price, quantity: qty, name: productName, product: imageUrl, productAddMethod: channel};
		thisAddToCartP[localStorage.getItem("aepTenantId")] = { core:{ imageURL: imageUrl, productURL: productUrl}}
	}

	thisAddToCart.push(thisAddToCartP);
	
	if(localStorage.getItem("thisAddToCart") !== null){
		localStorage.removeItem("thisAddToCart")
		localStorage.setItem("thisAddToCart", JSON.stringify(thisAddToCart));
	}else{
		localStorage.setItem("thisAddToCart", JSON.stringify(thisAddToCart));
	}

	var currentDataLayer = {};
	currentDataLayer = JSON.parse(localStorage.getItem("currentDataLayer"));
	currentDataLayer.addToCartArray = JSON.parse(localStorage.getItem("thisAddToCart"));
	currentDataLayer.action = "productAddToCart";
	window.dataLayer = currentDataLayer;
    localStorage.setItem("currentDataLayer", JSON.stringify(currentDataLayer));
}

function thisProductView() {
	if(digitalData.category.pageType !== "Media"){
		localStorage.removeItem("thisProductView");
		var thisProductView = [];
		var currency = localStorage.getItem("brandcurrency");
		var channel = "Desktop";
		var price = Number(dataLayer.product.price.replace(currency,""));
		var productName = dataLayer.product.name;
		var productSKU = dataLayer.product.sku;
		if(productSKU === "undefined"){
			productSKU = productName;
		}
		var qty = dataLayer.product.quantity;
		var productUrl = dataLayer.product.productURL;
		var imageUrl = dataLayer.product.imageURL;
		var thisProductViewP = {};

		if(dsnType === "International"){
			thisProductViewP = {SKU: productSKU, priceTotal: price, quantity: qty, name: productName, product: imageUrl, productAddMethod: channel};
		}else{
			thisProductViewP = {SKU: productSKU, priceTotal: price, quantity: qty, name: productName, product: imageUrl, productAddMethod: channel};
			thisProductViewP[localStorage.getItem("aepTenantId")] = { core:{ imageURL: imageUrl, productURL: productUrl}}
		}

		thisProductView.push(thisProductViewP);
		
		localStorage.setItem("thisProductView", JSON.stringify(thisProductView));

		var currentDataLayer = {};
		currentDataLayer = JSON.parse(localStorage.getItem("currentDataLayer"));
		currentDataLayer.productViewArray = JSON.parse(localStorage.getItem("thisProductView"));
		currentDataLayer.action = "productView";
		window.dataLayer = currentDataLayer;
        localStorage.setItem("currentDataLayer", JSON.stringify(currentDataLayer));

		_satellite.track('productview');
	}
}

function saveCart(cart) {
	//*************************************************
	// Activate Direct Call Rule in Launch
	//*************************************************
	_satellite.track('addtocart');

	console.log(">>>>> Product Added To Cart");
	if (window.localStorage){
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	if(localStorage.getItem("cart") !== null){
        cart = JSON.parse(localStorage.getItem("cart"));
        var count = 0;

        for (var i in cart) {
            count += cart[i].productQty; 
        }

        console.log("Cart exists - " + count + " items in cart.");
        if(count > 0){
            $("#carticonqty").text(count);
            $("#carticonqty").attr("style", "display:block;");
        }
    }
}

function saveCartP(cart) {
	localStorage.setItem("cartP", JSON.stringify(cart));
}

function showCart(cart) {
	var count = Object.keys(cart).length;
	//console.log("Show Cart - " + count + " items in cart.");
	for (var i in cart) {
		var item = cart[i];
		console.log("Product in Cart " + i + " - Name: " + item.productName + " - Price: " +  item.productPrice + " - Qty: " + item.productQty + " - URL: " + item.productUrl + " - Image: " + item.productImageUrl);
	}
}