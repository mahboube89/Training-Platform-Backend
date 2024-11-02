/**
 * @Copyright 2024 mae-mahboube89
 * @license MIT
*/

"use strict";

// ----- Node modules -----
const {isValidObjectId} = require("mongoose");

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

    try {

        const [mainMenus, submenus] = await Promise.all([
            menuModel.find({parentId: null}).populate({path: "categoryId", select: "_id title" }).sort({ order:1 }).lean(),
            menuModel.find({parentId: { $ne: null}}).populate({path: "categoryId", select: "_id title" }).sort({ order:1 }).lean()
        ]);

        // If no menus found, return a 404 response
        if (mainMenus.length === 0) {
            return res.status(404).json({ message: "No menus found." });
        }

        // Create a mapping of main menu IDs to their submenus

        const submenuMap = {}; // Initialize an empty object to map main menu IDs to their associated submenus

        // Loop through each submenu to populate submenuMap
        submenus.forEach(submenu => {
            const parentId = submenu.parentId.toString();

            // If this main menu ID doesn't have an entry yet, create an empty array for its submenus
            if (!submenuMap[parentId]) {
                submenuMap[parentId] = [];
            }

            // Add the current submenu to the array of its corresponding main menu in submenuMap
            submenuMap[parentId].push(submenu);
        });

        // Create a new array of main menus, each with its associated submenus added
        const menuWithSubmenu = mainMenus.map( mainMenu => ({
            // Spread existing properties of the main menu
            ...mainMenu, 
            // Add a 'submenus' property: retrieve submenus from submenuMap by main menu ID, or use an empty array if none exist
            submenus: submenuMap[mainMenu._id.toString()] || []
        }));

        return res.status(200).json({ message: "All Menus retrieved successfully. " , menuWithSubmenu});
        
    } catch (error) {
        console.error("Error during add Menu: ", error);
        return res.status(500).json({message: "Internal server error."});
    }
    
};


exports.getSingleMenu = async (req, res) => {

    try {
        
        const {menuId} = req.params;
    
        // Check if menuId is a valid ObjectId
        if (!isValidObjectId(menuId)) {
            return res.status(422).json({ message: "Invalid submenu ID." });
        }
    
        // Find the main menu by its ID and ensure it's not a submenu
        const menu = await menuModel.findOne({ _id: menuId , parentId : null}).lean();
    
        // If no main menu is found, return a 404 error
        if (!menu) {
            return res.status(404).json({ message: "Menu not found" });
        }
    
        // Find all submenus associated with this main menu
        const submenus = await menuModel.find({ parentId: menuId}).lean();
    
        // Structure to hold the menu and its submenus
        const menuWithSubmenu = {
            ...menu, // Spread existing properties of the main menu
            submenus: submenus || [] // Add submenus if they exist, otherwise an empty array
        };
    
        return res.status(200).json({ message: "The menu retrieved successfully. " , menuWithSubmenu});

    } catch (error) {
        console.error("Error retrieving single menu: ", error);
        return res.status(500).json({ message: "Internal server error." });
    }

};