const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
    res.render("contact", {
        contact: {}
    });
};

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();
    
        if(contact.errors.length > 0) {
            req.flash("errors", contact.errors);
            req.session.save(() => res.redirect("back"));
    
            return;
        }
    
        req.flash("success", "Successfully registered contact");
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
    
        return;
    } catch(e) {
        console.log(e);

        return res.render("404");
    }
};

exports.edit = async function(req, res) {
    if(!req.params.id) return res.render("404");

    const contact = await Contact.findById(req.params.id);
    if(!contact) return res.render("404");

    res.render("contact", { contact });
};