const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const { logger } = require('../service/logService');

// Create a new form
router.post('/', async (req, res) => {
  try {
    const newForm = new Form(req.body);
    const savedForm = await newForm.save();

    res.status(201).json(savedForm);
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
});

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find().select('title');
    res.json(forms);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get a specific form
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      logger.error('Form not found');
      return res.status(404).json({ message: 'Form not found' })
    };

    res.json(form);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// Submit a form response
router.post('/:id/submit', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      logger.error('Form not found');
      return res.status(404).json({ message: 'Form not found' })
    };
    
    form.responses.push(req.body.answers);
    await form.save();

    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;