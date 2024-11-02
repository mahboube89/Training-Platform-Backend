/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----

// ----- Custom modules -----
const menuModel = require("./../../models/menu_model");
const menuValidator = require("./../../validators/menu_validator");
const generatePath = require("./../../utils/pathGenerator_util");



async function adjustOrder(parentId, newOrder) {
    await menuModel.updateMany(
        { parentId, order: { $gte: newOrder } },
        { $inc: { order: 1 } }
    );
}

async function getMaxOrder(parentId) {
    const maxOrderItem = await menuModel.findOne({ parentId })
        .sort({ order: -1 })
        .select("order");
    return maxOrderItem ? maxOrderItem.order : 0;
}


exports.createMenu = async(req, res)=> {

    try {

        // Validate the model body using Joi validator
        const {error} = menuValidator.validate(req.body);
        if(error){
            return res.status(422).json({ errors: error.details.map(err => err.message) });
        }

       const {title, order, parentId, categoryId} = req.body;

       let finalOrder;

       // If parentId is null, it's a main menu item
       if (!parentId) {
            // Auto-generate Order for Main Menus
            // Main menu: find the highest existing order and increment by 1
            finalOrder = await getMaxOrder(null) + 1;

        } else {

            // Submenu: validate or set the order based on existing submenus under the same parent
            const maxOrder = await getMaxOrder(parentId);

            // If order is not provided or invalid, set to maxOrder + 1
            finalOrder = order && order <= maxOrder + 1 ? order : maxOrder + 1;

            // Adjust other submenus’ order if there’s a conflict
            await adjustOrder(parentId, finalOrder);
        }

       // Generate a unique path from the title
       const path = await generatePath(title);       

       // Create the new menu item
       const newMenu = await menuModel.create({
        title,
        path,
        order: finalOrder,
        parentId: parentId || null,
        categoryId
       });

       if(newMenu){
           return res.status(201).json({message: "New menu added successfully. ", newMenu}); 
       }      
        
    } catch (error) {
        console.error("Error during add Menu: ", error);
        return res.status(500).json({message: "Internal server error."}); 
    }

};



exports.getAllMenus = async (req, res) => {
    
};


exports.getSingleMenu = async (req, res) => {
    
};