const formSchema = require('../model/forms')
const fieldsSchema = require('../model/fields')

// Create a custom form
exports.createForm = async (req, res) => {
    try {
        const newFormObj = new formSchema({
            name: req.body.name,
            fields: []
        });
        let form = await newFormObj.save()
        req.body.fields.map(async (el) => {
            let name = el.name.toLowerCase();
            let type = el.type.toLowerCase();
            let fieldsExists = await fieldsSchema.findOne({ name: name, type: type })
            if (fieldsExists) {
                await formSchema.findOneAndUpdate({ _id: form._id }, {
                    $push:
                    {
                        fields: fieldsExists._id
                    }
                })
            }
            else {
                if (type == "") {
                    type = "text"
                }
                const newFieldsObj = new fieldsSchema({
                    name: name,
                    type: type
                });
                let result = await newFieldsObj.save()
                await formSchema.findOneAndUpdate({ _id: form._id }, {
                    $push:
                    {
                        fields: result._id
                    }
                })
            }
        })
        res.status(201).json({
            status: "ok",
            message: "Form created"
        })
    }
    catch (e) {
        res.status(500).json({
            status: "error",
            message: "Sorry something went wrong",
            error: e
        })
    }
}

// Deleting a Form
exports.deleteForm = async (req, res) => {
    try {
        console.log(req.body)
        req.body.forms.map(async (el) => {
            await formSchema.findByIdAndRemove(el)
        })
        res.status(202).json({
            status: "ok",
            message: "Form deleted successfully"
        })
    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            status: "error",
            message: "Sorry something went wrong",
            error: e
        })
    }
}

// Get One form By Id 
exports.getFormById = async (req, res) => {
    try {
        formSchema
            .findOne({ _id: req.params.id })
            .select('name fields')
            .populate('fields', "name type")
            .exec(function (err, form) {
                if (err) return err;
                res.status(200).send(form);
            })
    }
    catch (e) {
        res.status(500).json({
            status: "error",
            message: "Sorry something went wrong",
            error: e
        })
    }
}

// Edit form Fields 
exports.editFormFields = async (req, res) => {
    try {
        let name = req.body.fieldName.toLowerCase();
        let type;
        if (req.body.type) {
            type = req.body.fieldType.toLowerCase();
        }
        if (!req.body.type) {
            type = "text"
        }
        let formToEdit = await formSchema
            .findOneAndUpdate({ _id: req.body.formId }, {
                $pull: {
                    fields: req.body.fieldId
                }
            })
        let fieldsExists = await fieldsSchema.findOne({ name: name, type: type })
        if (fieldsExists) {
            await formSchema.findOneAndUpdate({ _id: formToEdit._id }, {
                $push:
                {
                    fields: fieldsExists._id
                }
            })
        }
        else {
            const newFieldsObj = new fieldsSchema({
                name: name,
                type: type
            });
            let result = await newFieldsObj.save()
            await formSchema.findOneAndUpdate({ _id: formToEdit._id }, {
                $push:
                {
                    fields: result._id
                }
            })
        }
        res.status(200).json({
            status: "ok",
            message: "Field Updated Successfully"
        })
    }
    catch (e) {
        res.status(500).json({
            status: "error",
            message: "Sorry something went wrong",
            error: e
        })
    }
}

// Delete form Fields 
exports.deleteFormFields = async (req, res) => {
    try {
        req.body.fields.map(async (el) => {
            await formSchema
                .findOneAndUpdate({ _id: req.body.formId }, {
                    $pull: {
                        fields: el
                    }
                })
        })
        res.status(200).json({
            status: "ok",
            message: "Field Deleted Successfully"
        })
    }
    catch (e) {
        res.status(500).json({
            status: "error",
            message: "Sorry something went wrong",
            error: e
        })
    }
}

// Add New form Fields 
exports.newFormField = async (req, res) => {
    try {
        let name = req.body.name.toLowerCase();
        let type;
        if (req.body.type) {
            type = req.body.type.toLowerCase();
        }
        if (!req.body.type) {
            type = "text"
        }
        let fieldsExists = await fieldsSchema.findOne({ name: name, type: type })
        if (fieldsExists) {
            await formSchema.findOneAndUpdate({ _id: req.body.formId }, {
                $push: {
                    fields: fieldsExists._id
                }
            })
        }
        else {
            const newFieldsObj = new fieldsSchema({
                name: name,
                type: type
            });
            let result = await newFieldsObj.save()
            await formSchema.findOneAndUpdate({ _id: req.body.formId }, {
                $push:
                {
                    fields: result._id
                }
            })
        }
        res.status(200).json({
            status: "ok",
            message: "Field Added Successfully"
        })
    }
    catch (e) {
        res.status(500).json({
            status: "error",
            message: "Sorry something went wrong",
            error: e
        })
    }
}
// Get All Forms
exports.getAllForms = (req, res) => {
    try {
        formSchema.find((error, response) => {
            res.status(200).send(response)
            if (error) return error
        })
    }
    catch (e) {
        console.log(e)
    }
}

