const itemsService = require('../services/itemService');

async function getItems(req, res) {
    const items = await itemsService.getItems();
    res.status(200).json({
        success: true,
        message: "Items have been retrieved successfully",
        data: items
    });
}

async function getItemsById(req, res) {
    const id = req.params.id;

    const items = await itemsService.getItemsbyId(id);
    if (items.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Item not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Item has been retrieved successfully",
        data: items
    });
}

async function getItemByOffset(req,res) {
    const start = req.params.start
    const limit = req.params.limit

    const item = await itemsService.getItemsOffSet(start,limit)
    res.status(200).json({
        success: true,
        message: "Items has been retrieved successfully",
        data: item
    })
}
async function getItemsByCount(req, res) {
    const count = req.params.id;

    const items = await itemsService.getItemsbyCount(count);
    if (items.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Items not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Items have been retrieved successfully",
        data: items
    });
}

async function addItems(req, res) {
    const newItem = req.body;

    const addedItem = await itemsService.addItem(newItem);
    res.status(201).json({
        success: true,
        message: "Item added successfully",
        data: addedItem
    });
}

async function updateItems(req, res) {
    const id = req.params.id;
    const updates = req.body;

    await itemsService.updateItem(id, updates);
    res.status(200).json({
        success: true,
        message: "Item updated successfully",
        id: id
    });
}

async function deleteItems(req, res) {
    const id = req.params.id;

    await itemsService.deleteItem(id);
    res.status(204).json({
        success: true,
        message: "Item successfully deleted"
    });
}

module.exports = { getItems, getItemsById, getItemsByCount, getItemByOffset, addItems, updateItems, deleteItems };
