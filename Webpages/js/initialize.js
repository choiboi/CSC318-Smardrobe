app = {
	initialize: function() {
		this.setupClothes();

	},

	setupClothes: function() {
		var id1 = addNewClothes(ClothesData.coat1);
		associateTagClothes('outerwear', id1);
		associateTagClothes('black', id1);

		var id2 = addNewClothes(ClothesData.pant1);
		associateTagClothes('black', id2);
		associateTagClothes('pant', id2);

		var id3 = addNewClothes(ClothesData.shirt1);
		associateTagClothes('black', id3);
		associateTagClothes('tshirt', id3);

		var id4 = addNewClothes(ClothesData.shirt2);
		associateTagClothes('blue', id4);
		associateTagClothes('tshirt', id4);

		var id5 = addNewClothes(ClothesData.shoe1);
		associateTagClothes('casual', id5);
		associateTagClothes('shoe', id5);
		associateTagClothes('black', id5);

		var id6 = addNewClothes(ClothesData.shoe2);
		associateTagClothes('casual', id6);
		associateTagClothes('shoe', id6);
		associateTagClothes('brown', id6);

		var id7 = addNewClothes(ClothesData.shoe3);
		associateTagClothes('casual', id7);
		associateTagClothes('shoe', id7);
		associateTagClothes('white', id7);

		var id8 = addNewClothes(ClothesData.shoe4);
		associateTagClothes('formal', id8);
		associateTagClothes('shoe', id8);
		associateTagClothes('brown', id8);

		var id9 = addNewClothes(ClothesData.shoe5);
		associateTagClothes('casual', id9);
		associateTagClothes('shoe', id9);
		associateTagClothes('brown', id9);

		var id10 = addNewClothes(ClothesData.shoe6);
		associateTagClothes('formal', id10);
		associateTagClothes('shoe', id10);
		associateTagClothes('formal', id10);
		associateTagClothes('heels', id10);
	}
};