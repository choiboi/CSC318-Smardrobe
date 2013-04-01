app = {
	initialize: function() {
		this.setupClothes();
	},

	setupClothes: function() {
		var id1 = addNewClothes(ClothesData.coat1);
		associateTagClothes('outerwear', id1);
		associateTagClothes('black', id1);
		associateTagClothes('casual', id1);
		associateTagClothes('formal', id1);

		id1 = addNewClothes(ClothesData.coat2);
		associateTagClothes('outerwear', id1);
		associateTagClothes('white', id1);
		associateTagClothes('casual', id1);

		id1 = addNewClothes(ClothesData.coat3);
		associateTagClothes('outerwear', id1);
		associateTagClothes('brown', id1);
		associateTagClothes('casual', id1);

		id1 = addNewClothes(ClothesData.coat4);
		associateTagClothes('outerwear', id1);
		associateTagClothes('pink', id1);
		associateTagClothes('casual', id1);

		id1 = addNewClothes(ClothesData.coat5);
		associateTagClothes('outerwear', id1);
		associateTagClothes('red', id1);
		associateTagClothes('casual', id1);

		var id2 = addNewClothes(ClothesData.pant1);
		associateTagClothes('black', id2);
		associateTagClothes('pant', id2);
		associateTagClothes('casual', id2);

		id2 = addNewClothes(ClothesData.pant2);
		associateTagClothes('tan', id2);
		associateTagClothes('pant', id2);
		associateTagClothes('casual', id2);

		id2 = addNewClothes(ClothesData.pant3);
		associateTagClothes('tan', id2);
		associateTagClothes('pant', id2);
		associateTagClothes('casual', id2);
		associateTagClothes('formal', id2);

		id2 = addNewClothes(ClothesData.pant4);
		associateTagClothes('blue', id2);
		associateTagClothes('pant', id2);
		associateTagClothes('casual', id2);
		associateTagClothes('formal', id2);

		id2 = addNewClothes(ClothesData.pant5);
		associateTagClothes('black', id2);
		associateTagClothes('pant', id2);
		associateTagClothes('casual', id2);

		var id3 = addNewClothes(ClothesData.tshirt1);
		associateTagClothes('blue', id3);
		associateTagClothes('tshirt', id3);
		associateTagClothes('casual', id3);

		id3 = addNewClothes(ClothesData.tshirt2);
		associateTagClothes('white', id3);
		associateTagClothes('tshirt', id3);
		associateTagClothes('casual', id3);

		id3 = addNewClothes(ClothesData.tshirt3);
		associateTagClothes('black', id3);
		associateTagClothes('tshirt', id3);
		associateTagClothes('casual', id3);

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

		var id11 = addNewClothes(ClothesData.sweater1);
		associateTagClothes('casual', id11);
		associateTagClothes('outerwear', id11);
		associateTagClothes('white', id11);

		id11 = addNewClothes(ClothesData.sweater2);
		associateTagClothes('casual', id11);
		associateTagClothes('outerwear', id11);
		associateTagClothes('grey', id11);

		id11 = addNewClothes(ClothesData.sweater3);
		associateTagClothes('casual', id11);
		associateTagClothes('outerwear', id11);
		associateTagClothes('black', id11);

		id11 = addNewClothes(ClothesData.sweater4);
		associateTagClothes('casual', id11);
		associateTagClothes('outerwear', id11);
		associateTagClothes('grey', id11);

		id11 = addNewClothes(ClothesData.sweater5);
		associateTagClothes('casual', id11);
		associateTagClothes('outerwear', id11);
		associateTagClothes('blue', id11);

		id11 = addNewClothes(ClothesData.sweater6);
		associateTagClothes('casual', id11);
		associateTagClothes('outerwear', id11);
		associateTagClothes('red', id11);
	}
};