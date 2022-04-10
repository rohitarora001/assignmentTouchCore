const express = require('express');
const router = express.Router();
const { createForm, deleteForm, getFormById, editFormFields, deleteFormFields, newFormField, getAllForms } = require('../controllers/Forms')

// Create a custom form
router.post('/createForm', createForm);

// Delete Form
router.post('/deleteForm', deleteForm);

// Get one form by ID
router.get('/getFormById/:id', getFormById);

// Edit Form Fields 
router.post('/editFormFields', editFormFields);

// Delete Form Fields
router.post('/deleteFormField', deleteFormFields);

// Add New Form Fields
router.post('/newFormField', newFormField);

// Get all forms
router.get('/getAllForms', getAllForms);

module.exports = router;