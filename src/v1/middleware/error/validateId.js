function validateId(req, res, next) {
  const id = req.params.id; // Assuming the ID is sent as part of the URL parameters
  
  try {
    if (id === null || isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid ID Format!",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = validateId;
