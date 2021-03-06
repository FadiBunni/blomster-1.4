	var Products = {
		init: function( config ){
			this.config = config;
			this.SetupTemplates();
			this.bindEvents();
		},

		SetupTemplates: function() {
			this.config.productsListTemplate = Handlebars.compile(this.config.productsListTemplate);
		},

		bindEvents: function() {
			this.config.selectByCategory.on('click', this.fetchProductsByCategory);
			this.config.selectBySubCategory.on('click', this.fetchProductsBySubCategory);
		},

		fetchProductsByCategory: function() {
			var self = Products;
			var textByCategory = $(this).text();

			$.ajax({
				url: '../inc/sortiment.php',
				type: 'POST',
				data: {Search_Category:textByCategory},
				dataType: 'json',
				success: function(results) {
						self.config.productsList.empty().append(self.config.productsListTemplate(results));
				}
			});
		},

		fetchProductsBySubCategory: function() {
			var self = Products;
			var textBySubCategory = $(this).text();
			$.ajax({
				url: '../inc/sortiment.php',
				type: 'POST',
				data: {Search_SubCategory:textBySubCategory},
				dataType: 'json',
				success: function(results) {
						self.config.productsList.empty().append(self.config.productsListTemplate(results));
				}
			});
		}
	};

	Products.init({
		selectByCategory: $('#Slide_Menu > ul > li > a'),
		selectBySubCategory: $(".Left_Sub_Nav > li > a"),
		productsListTemplate: $('#Products_List_Template').html(),
		productsList: $('ul.Products_List')
	});
