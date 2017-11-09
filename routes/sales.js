var express = require("express");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var passport = require("passport");
var validator = require("express-validator");
var passportlocal = require("passport-local");

var router = express.Router();
var bcrypt   = require('bcrypt-nodejs');
var saltRounds = 10;
var nodemailer = require("nodemailer");

var async = require('async');        //azeem ullah's commit
var multer  = require('multer');
var path = require('path');
const fs = require('fs');
var dbName = "sprout";
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'usama4slash@gmail.com',
        pass: 'usama4slash1234'
    }

});

var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "192.168.100.106",
    user: "sprout",
    password: "sprout12345",
    database: "sprout"
});
connection.connect(function (err) {
    if(err){
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("connected as id "+ connection.threadId);
});

/***********************************************    sales customer start      ****************************************************/
//createcontactstuff
router.post('/contacttable', function (req, res, next) {
    connection.query("select * from contact limit 20", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/contacttablenext', function (req, res, next) {
    connection.query('SELECT * from contact limit 20 OFFSET '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/contacttableback', function (req, res, next) {
    connection.query('SELECT * from contact limit 20 OFFSET  '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/company_name', function (req, res, next) {

    connection.query("select * from users_company", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/state', function (req, res, next) {

    connection.query("select * from country_states", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/country', function (req, res, next) {

    connection.query("select * from country", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/selectuser', function (req, res, next) {

    connection.query("select * from user", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/selectacoount', function (req, res, next) {

    connection.query("select * from account", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
//gridcontactstuff
// router.post('/selectgrid', function (req, res, next) {
//
//     connection.query("select * from contact  limit 2", function (error, results, fields) {
//         if (error) res.json({"status": "failed", "message": error.message});
//         else{
//             res.json({"status": "ok", "data": results});
//         }
//     });
// });
router.post('/selectgrid', function (req, res, next) {
    connection.query("SELECT contact.id,contact.name,contact.street1,contact.street2,contact.city,contact.country,contact.email, tags_contacts.tag_id ,tags.name AS tags_name FROM contact left JOIN tags_contacts ON contact.id = tags_contacts.contact_id left JOIN tags ON tags_contacts.tag_id = tags.id   limit 20", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/delete_contact', function (req, res, next) {
    for (var i = 0; i < req.body.delete_items.length; ++i) {
        connection.query('DELETE FROM `contact` WHERE id = "'+req.body.delete_items[i]+'"' , function (error, results, fields) {
            if (error){
                res.json({"status": "failed", "message": error.message});
            }
        });
    }
    console.log(req.body.delete_items);

});
router.post('/selectgridnext', function (req, res, next) {

    connection.query('SELECT contact.id,contact.name,contact.street1,contact.street2,contact.city,contact.country,contact.email, tags_contacts.tag_id ,tags.name AS tags_name FROM contact left JOIN tags_contacts ON contact.id = tags_contacts.contact_id left JOIN tags ON tags_contacts.tag_id = tags.id limit 20 OFFSET '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/selectgridback', function (req, res, next) {
    connection.query('SELECT contact.id,contact.name,contact.street1,contact.street2,contact.city,contact.country,contact.email, tags_contacts.tag_id ,tags.name AS tags_name FROM contact left JOIN tags_contacts ON contact.id = tags_contacts.contact_id left JOIN tags ON tags_contacts.tag_id = tags.id limit 20 OFFSET  '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/selectgridtag', function (req, res, next) {
    connection.query("select * from tags_contacts", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
//contactcreatestuff
router.post('/createcontact', function (req, res, next) {
    if(!(req.body.zip)){
        req.body.zip=0;
    }
    if(!(req.body.individual)){
        req.body.individual=0;
    }
    if(!(req.body.is_Customer)){
        req.body.is_Customer=0;
    }
    if(!(req.body.is_vendor)){
        req.body.is_vendor=0;
    }
    if(!(req.body.lasting)){
        req.body.lasting=0;
    }
    if(!(req.body.internal_reference_id)){
        req.body.internal_reference_id=0;
    }
    if(!(req.body.internal_reference_id)){
        req.body.internal_reference_id=0;
    }
    if(!(req.body.account_reciveable)){
        req.body.account_reciveable=null;
    }
    if(!(req.body.is_sales_person)){
        req.body.is_sales_person=null;
    }
    if(!(req.body.account_payable)){
        req.body.account_payable=null;
    }
    if(!(req.body.tags)){
        req.body.tags=0;
    }
    //modal

    connection.query('INSERT INTO `contact_notes`(`notes`) VALUES ("'+req.body.notes_id+'")', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }
        else {
            connection.query('INSERT INTO `contact`(`name`,`street1`,`street2`,`individual`,`company`,`city`,`states`,`zip`,`country`,`title`,`website`,`job_position`,`phone_number`,`mobile_number`,`fax_number`,`email`,`language`,`notes_id`,`is_Customer`,`is_sales_person`,`internal_reference_id`,`account_reciveable`,`account_payable`,`is_vendor`,`barcode`,`customer_payment_terms`,`degree_of_trust`,`vendor_payment_terms`) VALUES ("'+req.body.name+'","'+req.body.street1+'","'+req.body.street2+'",'+req.body.individual+',"'+req.body.company+'","'+req.body.city+'","'+req.body.states+'",'+req.body.zip+',"'+req.body.country+'","'+req.body.title+'","'+req.body.website+'","'+req.body.job_position+'","'+req.body.phone_number+'","'+req.body.mobile_number+'","'+req.body.fax_number+'","'+req.body.email+'","'+req.body.language+'",'+results.insertId+','+req.body.is_Customer+',"'+req.body.is_sales_person+'",'+req.body.internal_reference_id+','+req.body.account_reciveable+','+req.body.account_payable+','+req.body.is_vendor+',"'+req.body.barcode+'","'+req.body.customer_payment_terms+'","'+req.body.degree_of_trust+'","'+req.body.vendor_payment_terms+'")', function (error, results2, fields) {
                if (error) {

                    res.json({"status": "failed", "message": error.message});
                }
                else {
                    connection.query('UPDATE contact_contacts_addresses SET parent_contact_id = '+results2.insertId+' WHERE parent_contact_id = '+ req.body.lasting +'', function (error, results1, fields) {
                        if (error) {
                            res.json({"status": "failed", "message": error.message});
                        }
                    });
                    console.log('INSERT INTO `tags_contacts`(`tag_id`,`contact_id`) VALUES ('+req.body.tags+',' + results2.insertId + ')');
                    connection.query('INSERT INTO `tags_contacts`(`tag_id`,`contact_id`) VALUES ('+req.body.tags+',' + results2.insertId + ')', function (error, results1, fields) {
                        if (error) {
                            console.log(error.message);
                            res.json({"status": "failed", "message": error.message});
                        }
                    });
                }
            });
        }
    });
})
router.post('/createcontactmodal', function (req, res, next) {
    if(!(req.body.zip)){
        req.body.zip=0;
    }
    if(!(req.body.individual)){
        req.body.individual=0;
    }
    if(!(req.body.is_Customer)){
        req.body.is_Customer=0;
    }
    if(!(req.body.is_vendor)){
        req.body.is_vendor=0;
    }
    if(!(req.body.lasting)){
        req.body.lasting=0;
    }
    if(!(req.body.internal_reference_id)){
        req.body.internal_reference_id=null;
    }
    if(!(req.body.internal_reference_id)){
        req.body.internal_reference_id=0;
    }
    if(!(req.body.account_reciveable)){
        req.body.account_reciveable=null;
    }
    if(!(req.body.account_payable)){
        req.body.account_payable=null;
    }
    if(!(req.body.tags)){
        req.body.tags=null;
    }

    connection.query('INSERT INTO `contact_notes`(`notes`) VALUES ("' + req.body.mnotes_id + '")', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }
        else {
            console.log('INSERT INTO `contact`(`name`,`street1`,`street2`,`city`,`states`,`zip`,`country`,`title`,`job_position`,`phone_number`,`mobile_number`,`email`,`notes_id`)' +
                ' VALUES ("'+req.body.name+'","'+req.body.street1+'","'+req.body.street2+'","'+req.body.city+'","'+req.body.states+'",'+req.body.zip+',"'+req.body.country+'","'+req.body.title+'","'+req.body.job_position+'","'+req.body.phone_number+'","'+req.body.mobile_number+'","'+req.body.email+'",'+results.insertId+')');
            connection.query('INSERT INTO `contact`(`name`,`street1`,`street2`,`city`,`states`,`zip`,`country`,`title`,`job_position`,`phone_number`,`mobile_number`,`email`,`notes_id`) VALUES ("'+req.body.name+'","'+req.body.street1+'","'+req.body.street2+'","'+req.body.city+'","'+req.body.states+'",'+req.body.zip+',"'+req.body.country+'","'+req.body.title+'","'+req.body.job_position+'","'+req.body.phone_number+'","'+req.body.mobile_number+'","'+req.body.email+'",'+results.insertId+')', function (error, results1, fields) {
                if (error) {
                    res.json({"status": "failed", "message": error.message});
                }
                else {
                    console.log(req.body);
                    connection.query('INSERT INTO `contact_contacts_addresses`(`parent_contact_id`,`child_contact_id`) VALUES (' + req.body.lasting + ',' + results1.insertId + ')', function (error, results1, fields) {
                        if (error) {
                            res.json({"status": "failed", "message": error.message});
                        }
                    });
                }
            });
        }
    });
});
router.post('/createcontactmodal_create', function (req, res, next) {
    if(!(req.body.zip)){
        req.body.zip=0;
    }
    if(!(req.body.individual)){
        req.body.individual=0;
    }
    if(!(req.body.is_Customer)){
        req.body.is_Customer=0;
    }
    if(!(req.body.is_vendor)){
        req.body.is_vendor=0;
    }
    if(!(req.body.lasting)){
        req.body.lasting=0;
    }
    if(!(req.body.internal_reference_id)){
        req.body.internal_reference_id=null;
    }
    if(!(req.body.internal_reference_id)){
        req.body.internal_reference_id=0;
    }
    if(!(req.body.account_reciveable)){
        req.body.account_reciveable=null;
    }
    if(!(req.body.account_payable)){
        req.body.account_payable=null;
    }
    if(!(req.body.tags)){
        req.body.tags=null;
    }

    connection.query('INSERT INTO `contact_notes`(`notes`) VALUES ("' + req.body.mnotes_id + '")', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }
        else {
            console.log('INSERT INTO `contact`(`name`,`street1`,`street2`,`city`,`states`,`zip`,`country`,`title`,`job_position`,`phone_number`,`mobile_number`,`email`,`notes_id`)' +
                ' VALUES ("'+req.body.name+'","'+req.body.street1+'","'+req.body.street2+'","'+req.body.city+'","'+req.body.states+'",'+req.body.zip+',"'+req.body.country+'","'+req.body.title+'","'+req.body.job_position+'","'+req.body.phone_number+'","'+req.body.mobile_number+'","'+req.body.email+'",'+results.insertId+')');
            connection.query('INSERT INTO `contact`(`name`,`street1`,`street2`,`city`,`states`,`zip`,`country`,`title`,`job_position`,`phone_number`,`mobile_number`,`email`,`notes_id`) VALUES ("'+req.body.name+'","'+req.body.street1+'","'+req.body.street2+'","'+req.body.city+'","'+req.body.states+'",'+req.body.zip+',"'+req.body.country+'","'+req.body.title+'","'+req.body.job_position+'","'+req.body.phone_number+'","'+req.body.mobile_number+'","'+req.body.email+'",'+results.insertId+')', function (error, results1, fields) {
                if (error) {
                    res.json({"status": "failed", "message": error.message});
                }
                else {
                    console.log(req.body);
                    connection.query('INSERT INTO `contact_contacts_addresses`(`parent_contact_id`,`child_contact_id`) VALUES (' + req.body.id + ',' + results1.insertId + ')', function (error, results1, fields) {
                        if (error) {
                            res.json({"status": "failed", "message": error.message});
                        }
                    });
                }
            });
        }
    });
});
router.post('/tags', function (req, res, next) {

    connection.query("select * from tags", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});

        }
    });
});
//==================================================ContactInfo=========================================================
router.post('/selectcontactinfo', function (req, res, next) {

    connection.query('SELECT * from contact  where  id='+"'"+ req.body.id +"'" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
router.post('/ctags', function (req, res, next) {

    connection.query('SELECT name as tname from tags  where  id='+"'"+ req.body.tid +"'" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
router.post('/ctag', function (req, res, next) {

    connection.query('SELECT * from tags_contacts  where  contact_id='+"'"+ req.body.id +"'" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
router.post('/selectcontactinfo1', function (req, res, next) {

    connection.query('SELECT * from contact  where  id='+"'"+ req.body.id +"'" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
router.post('/selectchild', function (req, res, next) {

    connection.query('SELECT contact.id,contact.name,contact.email,contact.job_position FROM contact WHERE contact.id IN (SELECT contact_contacts_addresses.child_contact_id FROM contact_contacts_addresses WHERE contact_contacts_addresses.parent_contact_id = "'+req.body.id+'")', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
            console.log(results)
        }
    });

});
router.post('/selectchilds', function (req, res, next) {
    connection.query('SELECT contact.id,contact.name,contact.email,contact.job_position FROM contact WHERE contact.id IN (SELECT contact_contacts_addresses.child_contact_id FROM contact_contacts_addresses WHERE contact_contacts_addresses.parent_contact_id = "'+req.body.id+'")', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            res.json({"status": "ok", "data": results});
            console.log(results)
        }
    });

});
router.post('/mycontact', function (req, res, next) {

    connection.query('SELECT * from contact  where  id='+"'"+ req.body.child_contact_id +"'" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/selectnote', function (req, res, next) {

    connection.query('SELECT * from contact_notes  where  id='+"'"+ req.body.notes_id +"'" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/selectnote1', function (req, res, next) {

    connection.query('SELECT * from contact_notes  where  id='+"'"+ req.body.notes_id +"'" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
router.post('/selectaccount', function (req, res, next) {

    connection.query('SELECT name as aname from account    where  id='+"'"+ req.body.account_reciveable +"'" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
router.post('/account_payable', function (req, res, next) {
    connection.query('SELECT name as bname from account    where  id='+"'"+ req.body.account_payable +"'" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
router.post('/contactdeletes', function (req, res, next) {
    connection.query('DELETE  from contact where id='+"'"+ req.body.id +"'" +'', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/contactdeletes1', function (req, res, next) {
    connection.query('DELETE  from contact_contacts_addresses where child_contact_id= "'+req.body.id+'"', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((EDITCONTACT))))))))))))))))))))))))))))))
router.post('/createcontactedit', function (req, res, next) {
    console.log(req.body);
    if(!(req.body.zip)){
        req.body.zip=0;
    }if(!(req.body.individual)){
        req.body.individual=0;
    }if(!(req.body.is_Customer)){
        req.body.is_Customer=0;
    }if(!(req.body.is_vendor)){
        req.body.is_vendor=0;
    }if(!(req.body.lasting)){
        req.body.lasting=0;
    }if(!(req.body.internal_reference_id)){
        req.body.internal_reference_id=0;
    }if(!(req.body.internal_reference_id)){
        req.body.internal_reference_id=0;
    }if(!(req.body.account_reciveable)){
        req.body.account_reciveable=null;
    }if(!(req.body.account_payable)){
        req.body.account_payable=null;
    }if(!(req.body.is_sales_person)){
        req.body.is_sales_person=0;
    }
    connection.query('UPDATE contact SET name = "'+req.body.name+'",street1 = "'+req.body.street1+'",city = "'+req.body.city+'",' +
        'states = "'+req.body.states+'",zip = '+req.body.zip+',country = "'+req.body.country+'",website = "'+req.body.website+'",' +
        'street2 = "'+req.body.street2+'",company = "'+req.body.company+'", job_position = "'+req.body.job_position+'",' +
        'phone_number = "'+req.body.phone_number+'",mobile_number = "'+req.body.mobile_number+'",fax_number = "'+req.body.fax_number+'",' +
        'email = "'+req.body.email+'",title = "'+req.body.title+'",language = "'+req.body.language+'",is_Customer = '+req.body.is_Customer+',' +
        'is_sales_person = "'+req.body.is_sales_person+'",internal_reference_id = '+req.body.internal_reference_id+',' +
        'is_vendor = '+req.body.is_vendor+',barcode = "'+req.body.barcode+'",account_reciveable = '+req.body.account_reciveable+',' +
        'account_payable = '+req.body.account_payable+',vendor_payment_terms = "'+req.body.vendor_payment_terms+'",' +
        'degree_of_trust = "'+req.body.degree_of_trust+'",customer_payment_terms = "'+req.body.customer_payment_terms+'" ' +
        'WHERE id = '+ req.body.id +'', function (error, results1, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            console.log("1");
        }
    });
    connection.query('UPDATE contact_contacts_addresses SET parent_contact_id = '+req.body.id+' WHERE parent_contact_id = '+ req.body.lasting +'', function (error, results3, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            console.log("2");
        }
    });
    connection.query('UPDATE contact_notes SET notes = "'+req.body.notes+'" WHERE id = '+ req.body.notes_id +'', function (error, results4, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            console.log("3");
        }
    });
    console.log('SELECT `tag_id`, `contact_id` FROM `tags_contacts` WHERE contact_id = "'+req.body.id+'" AND tag_id = "'+req.body.tags+'" ');
    connection.query('SELECT `tag_id`, `contact_id` FROM `tags_contacts` WHERE contact_id = "'+req.body.id+'" AND tag_id = "'+req.body.tags+'" ',function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            console.log("4::"+results);
            res.json({"status": "ok", "datareturn": results});
        }
    });
});
// tag update respone good
router.post('/tag_res_good_update', function (req, res, next) {
    console.log('UPDATE tags_contacts SET tag_id = '+req.body.tags+' WHERE contact_id = '+ req.body.id +'');
    connection.query('UPDATE tags_contacts SET tag_id = '+req.body.tags+' WHERE contact_id = '+ req.body.id +'', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// tag insert respone bad
router.post('/tag_res_bad_insert', function (req, res, next) {
    console.log('INSERT INTO `tags_contacts`(`tag_id`,`contact_id`) VALUES ('+req.body.tags+','+req.body.id+')');
    connection.query('INSERT INTO `tags_contacts`(`tag_id`,`contact_id`) VALUES ('+req.body.tags+','+req.body.id+')', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/createcontacteditmodal', function (req, res, next) {
    console.log(req.body);
    if(!(req.body.zip)){
        req.body.zip=0;
    }
    console.log('UPDATE contact SET name = "'+req.body.name+'",street1 = "'+req.body.street1+'",city = "'+req.body.city+'",states = "'+req.body.states+'",zip = '+req.body.zip+',country = "'+req.body.country+'",website = "'+req.body.website+'",street2 = "'+req.body.street2+'", job_position = "'+req.body.job_position+'",phone_number = "'+req.body.phone_number+'",mobile_number = "'+req.body.mobile_number+'",fax_number = "'+req.body.fax_number+'",email = "'+req.body.email+'",title = "'+req.body.title+'" WHERE id = '+ req.body.id +'');
    connection.query('UPDATE contact SET name = "'+req.body.name+'",street1 = "'+req.body.street1+'",city = "'+req.body.city+'",states = "'+req.body.states+'",zip = '+req.body.zip+',country = "'+req.body.country+'",website = "'+req.body.website+'",street2 = "'+req.body.street2+'", job_position = "'+req.body.job_position+'",phone_number = "'+req.body.phone_number+'",mobile_number = "'+req.body.mobile_number+'",fax_number = "'+req.body.fax_number+'",email = "'+req.body.email+'",title = "'+req.body.title+'" WHERE id = '+ req.body.id +'', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }
    });
    connection.query('UPDATE contact_notes SET notes = "'+req.body.notes+'" WHERE id = '+ req.body.notes_id +'', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }
        // console.log(results);
    });
    //req.session.success = true;
});
//pagination of contact
router.post('/contactpage', function (req, res, next) {

    connection.query('SELECT * FROM contact WHERE id = ( SELECT max( id ) FROM contact WHERE id <'+"'"+ req.body.id +"'" +')',function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/contactpage2', function (req, res, next) {
    connection.query('SELECT * FROM contact WHERE id = ( SELECT MIN( id ) FROM contact WHERE id >'+"'"+ req.body.id +"'" +')',function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
router.post('/numcontact', function (req, res, next) {
    connection.query("select COUNT(*) as count from contact", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
/***********************************************    sales customer end      ****************************************************/
/***********************************************    sales quotation  start    ****************************************************/
// sales quotation create
router.post('/sales_quotation_create', function (req, res, next) {
    if(!(req.body.customer_name_get)){
        req.body.customer_name_get=null;
    }if(!(req.body.order_date)){
        req.body.order_date=null;
    }if(!(req.body.pricelist_id)){
        req.body.pricelist_id=null;
    }if(!(req.body.payment_term_get)){
        req.body.payment_term_get=null;
    }if(!(req.body.setup_default_get)){
        req.body.setup_default_get=null;
    }if(!(req.body.Incoterms_get)){
        req.body.Incoterms_get=null;
    }if(!(req.body.shipping_policy_get)){
        req.body.shipping_policy_get=null;
    }if(!(req.body.fiscal_pos_get)){
        req.body.fiscal_pos_get=null;
    }if(!(req.body.salesperson_get)){
        req.body.salesperson_get=null;
    }if(!(req.body.sales_team_get)){
        req.body.sales_team_get=null;
    }if(!(req.body.customer_ref_get)){
        req.body.customer_ref_get=null;
    }if(!(req.body.customer_name_get1)){
        req.body.customer_name_get1=null;
    }if(!(req.body.invoice_address_get)){
        req.body.invoice_address_get=null;
    }if(!(req.body.delivery_address_get)){
        req.body.delivery_address_get=null;
    }
    connection.query('INSERT INTO `sales_quotation`(`customer_id`,`invoice_address`,`delivery_address`, `order_date`, `expiration_date`, `pricelist_id`, `payment_terms_id`, `untaxed_amount`, `taxes`, `total`, `terms_conditions`, `incoterms`, `shiping_policy`, `fiscal_position_id`, `sales_person_id`, `sales_team_id`, `customer_reference`,`status`) ' +
        'VALUES ("'+req.body.customer_name_get + '",'+req.body.invoice_address_get+','+req.body.delivery_address_get+',"' + req.body.order_date + '","' + req.body.expirition_date + '",'+ req.body.pricelist_id+',' +
        '"' + req.body.payment_term_get + '","' + req.body.untaxed_amount_get + '","' + req.body.taxed_get + '","' + req.body.total_get + '",' +
        '"' + req.body.setup_default_get + '","' + req.body.Incoterms_get + '","' + req.body.shipping_policy_get + '","' + req.body.fiscal_pos_get + '",' +
        '"' + req.body.salesperson_get + '","' + req.body.sales_team_get + '","' + req.body.customer_ref_get + '", "'+req.body.status+'")', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        } else {
           connection.query('INSERT INTO `sales_quotation_order_lines`(`sales_quotation_id`, `product_id`, `description`, `ordered_quantity`, `unit_price`, `subtotal`) ' +
                'VALUES ("'+ results.insertId +'","'+req.body.customer_name_get1 + '","'+req.body.pro_names + '","'+req.body.pro_qty + '","'+req.body.pro_unitprice + '","'+req.body.total_get+'")', function (error1, results1, fields) {
                if (error1) {
                    res.json({"status": "failed", "message": error1.message});
                } else {
                    connection.query('SELECT sales_quotation.id , user.username, contact.name, sales_quotation.total, sales_quotation.order_date, sales_quotation.status ,sales_quotation.expiration_date ,sales_quotation.untaxed_amount, sales_quotation.taxes, sales_quotation.total ,sales_quotation.terms_conditions, sales_quotation.incoterms,sales_quotation.shiping_policy,  sales_quotation.customer_reference, pricelists.name AS pricelist_name ,payment_terms.payment_terms, fiscal_position.name AS fiscal_position_name ,sales_team.name AS sales_team_name FROM sales_quotation, user ,contact ,pricelists,payment_terms,fiscal_position,sales_team WHERE sales_quotation.id= "'+ results.insertId +'"  AND sales_quotation.sales_person_id = user.id AND contact.id = sales_quotation.customer_id AND pricelists.id = sales_quotation.pricelist_id AND sales_quotation.payment_terms_id = payment_terms.id AND sales_quotation.fiscal_position_id = fiscal_position.id AND sales_quotation.sales_team_id = sales_team.id', function (error, results2, fields) {
                        if (!error) {
                            res.json({"status": "ok", "result1": results2});
                        } else {
                            res.json({"status": "failed", "message": error.message});
                        }
                    });
                }
            });
        }
    });
});
//click product to id detail
router.post('/products_detail', function (req, res, next) {
    connection.query('SELECT * from sales_quotation_order_lines  where id='+"'"+ req.body.id +"'" +'',function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
//customers list
router.post('/customers_name', function (req, res, next) {
    connection.query('SELECT * FROM `contact`', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// payment terms
router.post('/payment_terms', function (req, res, next) {
    connection.query('SELECT * FROM `payment_terms`', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//sales quotation
router.post('/sales_quotations', function (req, res, next) {
    connection.query('SELECT * FROM `sales_quotation`', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// users
router.post('/users', function (req, res, next) {
    connection.query('SELECT * FROM `user`', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//tags
router.post('/tags', function (req, res, next) {
    connection.query('SELECT * FROM `tags`', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/tags_customer', function (req, res, next) {
    connection.query('SELECT id FROM `tags`', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//fiscial
router.post('/fiscial', function (req, res, next) {
    connection.query('SELECT * FROM `fiscal_position`', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// sales team id
router.post('/sales_team_id', function (req, res, next) {
    connection.query('SELECT * FROM `sales_team`', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//sales products name
router.post('/sales_product_name', function (req, res, next) {
    connection.query('SELECT * FROM `products`', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// sales product order line
router.post('/sales_product_order_line', function (req, res, next) {
    connection.query('SELECT sales_quotation_order_lines.description , products.name, sales_quotation_order_lines.ordered_quantity , sales_quotation_order_lines.unit_price, sales_quotation_order_lines.subtotal, sales_quotation_order_lines.id, sales_quotation_order_lines_taxes.taxes_id , taxes.amount FROM  sales_quotation_order_lines INNER JOIN sales_quotation ON sales_quotation.id = sales_quotation_order_lines.sales_quotation_id INNER JOIN products ON sales_quotation_order_lines.product_id = products.id INNER JOIN sales_quotation_order_lines_taxes ON sales_quotation_order_lines.id = sales_quotation_order_lines_taxes.sales_quotation_order_lines_id INNER JOIN taxes ON sales_quotation_order_lines_taxes.taxes_id = taxes.id ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//select all product
router.post('/sales_product_all', function (req, res, next) {
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_products_data', function (req, res, next) {
    connection.query('SELECT * FROM products  WHERE id = "'+req.body.customer_name_get1+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// sales views
router.post('/sales_view', function (req, res, next) {
    connection.query('SELECT sales_quotation.id,sales_quotation.customer_id,sales_quotation.pricelist_id  , user.username, contact.name, sales_quotation.total, sales_quotation.order_date, sales_quotation.status ,sales_quotation.expiration_date ,sales_quotation.untaxed_amount, sales_quotation.taxes, sales_quotation.total ,sales_quotation.terms_conditions, sales_quotation.incoterms,sales_quotation.shiping_policy,  sales_quotation.customer_reference, pricelists.name AS pricelist_name ,payment_terms.payment_terms, fiscal_position.name AS fiscal_position_name ,sales_team.name AS sales_team_name FROM sales_quotation, user ,contact ,pricelists,payment_terms,fiscal_position,sales_team WHERE sales_quotation.id= "'+req.body.id+'"  AND sales_quotation.sales_person_id = user.id AND contact.id = sales_quotation.customer_id AND pricelists.id = sales_quotation.pricelist_id AND sales_quotation.payment_terms_id = payment_terms.id AND sales_quotation.fiscal_position_id = fiscal_position.id AND sales_quotation.sales_team_id = sales_team.id', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// sales_quotation table
router.post('/sales_quotation_table', function (req, res, next) {
        connection.query('SELECT sales_quotation.id , user.username, contact.name, sales_quotation.total, sales_quotation.order_date, sales_quotation.status FROM sales_quotation INNER JOIN user ON sales_quotation.sales_person_id = user.id INNER JOIN contact ON contact.id = sales_quotation.customer_id WHERE sales_quotation.status = "quotation"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_pricelists_all_data', function (req, res, next) {
        connection.query('SELECT * FROM pricelists', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// sales_ORDER table
router.post('/sales_order_table', function (req, res, next) {
    connection.query('SELECT sales_quotation.id , user.username, contact.name, sales_quotation.total, sales_quotation.order_date, sales_quotation.status FROM sales_quotation INNER JOIN user ON sales_quotation.sales_person_id = user.id INNER JOIN contact ON contact.id = sales_quotation.customer_id WHERE sales_quotation.status = "SalesOrder"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// sales quotation all data
router.post('/sales_quotation_all_data', function (req, res, next) {
    connection.query('SELECT * FROM `sales_quotation` WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// sales quotaion update
router.post('/sales_quotaion_update', function (req, res , results) {
    if(!(req.body.customer_name_get)){
        req.body.customer_name_get=null;
    }if(!(req.body.order_date)){
        req.body.order_date=null;
    }if(!(req.body.pricelist_id)){
        req.body.pricelist_id=0;
    }if(!(req.body.payment_term_get)){
        req.body.payment_term_get=null;
    }if(!(req.body.setup_default_get)){
        req.body.setup_default_get=null;
    }if(!(req.body.Incoterms_get)){
        req.body.Incoterms_get=null;
    }if(!(req.body.shipping_policy_get)){
        req.body.shipping_policy_get=null;
    }if(!(req.body.fiscal_pos_get)){
        req.body.fiscal_pos_get=null;
    }if(!(req.body.salesperson_get)){
        req.body.salesperson_get=null;
    }if(!(req.body.sales_team_get)){
        req.body.sales_team_get=null;
    }if(!(req.body.customer_ref_get)){
        req.body.customer_ref_get=null;
    }if(!(req.body.customer_name_get1)){
        req.body.customer_name_get1=null;
    }if(!(req.body.untaxed_amount_get)){
        req.body.untaxed_amount_get=0;
    }if(!(req.body.taxed_get)){
        req.body.taxed_get=0;
    }if(!(req.body.total_get)){
        req.body.total_get=0;
    }
    console.log('UPDATE sales_quotation SET `customer_id`= "'+req.body.customer_name_get+'",`order_date`="'+req.body.order_date+'",`expiration_date`="'+req.body.expirition_date+'",`pricelist_id`="'+req.body.pricelist_id+'",`payment_terms_id`="'+req.body.payment_term_get+'",`untaxed_amount`="'+req.body.untaxed_amount_get+'",`taxes`="'+req.body.taxed_get+'",`total`="'+req.body.total_get+'",`terms_conditions`="'+req.body.terms_conditions+'",`incoterms`="'+req.body.Incoterms_get+'",`shiping_policy`="'+req.body.shipping_policy_get+'",`fiscal_position_id`="'+req.body.fiscal_pos_get+'",`sales_person_id`="'+req.body.salesperson_get+'",`sales_team_id`="'+req.body.sales_team_get+'",`customer_reference`="'+req.body.customer_ref_get+'" WHERE id = "'+req.body.id+'" ');
    connection.query('UPDATE sales_quotation SET `customer_id`= "'+req.body.customer_name_get+'",' +
        '`order_date`="'+req.body.order_date+'",`expiration_date`="'+req.body.expirition_date+'",' +
        '`pricelist_id`="'+req.body.pricelist_id+'",`payment_terms_id`="'+req.body.payment_term_get+'",' +
        '`untaxed_amount`="'+req.body.untaxed_amount_get+'",`taxes`="'+req.body.taxed_get+'",' +
        '`total`="'+req.body.total_get+'",`terms_conditions`="'+req.body.terms_conditions+'",' +
        '`incoterms`="'+req.body.Incoterms_get+'",`shiping_policy`="'+req.body.shipping_policy_get+'",' +
        '`fiscal_position_id`="'+req.body.fiscal_pos_get+'",`sales_person_id`="'+req.body.salesperson_get+'",' +
        '`sales_team_id`="'+req.body.sales_team_get+'",`customer_reference`="'+req.body.customer_ref_get+'" ' +
        'WHERE id = "'+req.body.id+'" ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });

});
// status update
router.post('/sales_quotaion_status_update', function (req, res , results) {
    console.log('UPDATE `sales_quotation` SET `status`= "'+req.body.status+'" WHERE id = "'+req.body.id+'"');
    connection.query('UPDATE `sales_quotation` SET `status`= "'+req.body.status+'" WHERE id = "'+req.body.id+'" ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });

});
// sales quotation delete
router.post('/delete_sales_quotation', function (req, res, next) {
    for (var i = 0; i < req.body.delete_items.length; ++i) {
        connection.query('DELETE FROM `sales_quotation` WHERE id = "'+req.body.delete_items[i]+'"' , function (error, results, fields) {
            if (error){
                res.json({"status": "failed", "message": error.message});
            }
        });
    }
    console.log(req.body.delete_items);
});
router.post('/delete_sales_quotation_inside', function (req, res, next) {
    connection.query('DELETE FROM `sales_quotation` WHERE id = "' +req.body.id+'"', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else {
        }
    });
});
// sales team modal create
router.post('/sales_team_modal_create', function (req, res, next) {
    if(!(req.body.team_quotation)){
        req.body.team_quotation=0;
    }
    if(!(req.body.team_invoices)){
        req.body.team_invoices=0;
    }
    if(!(req.body.team_opportunities)){
        req.body.team_opportunities=0;
    }
    if(!(req.body.team_lead)){
        req.body.team_lead=null;
    }
    connection.query('INSERT INTO `sales_team`(`name`,`team_leader_id`,`email_alias`,`quotations`,`invoices`,`opportunities`) VALUES ' +
        '("'+req.body.name+'",'+req.body.team_lead+',"'+req.body.email+'",'+req.body.team_quotation+','+req.body.team_invoices+','+req.body.team_opportunities+')', function (error, results, fields) {
        console.log(req.body);
        if (error) {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
        console.log(results);
    });
});

/***********************************************    sales quotation end   ****************************************************/
/***********************************************    sales product start   ****************************************************/
//select all product
router.post('/select_all_product', function (req, res, next) {
    connection.query('SELECT * FROM `products` limit 2', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// product_table pagination next
router.post('/select_all_productnext', function (req, res, next) {

    connection.query('SELECT * FROM `products`  limit 2  OFFSET '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            res.json({"status": "ok", "result": results});
        }
    });
});
// product table pagination previous
router.post('/select_all_productback', function (req, res, next) {

    connection.query('SELECT * FROM `products`  limit 2  OFFSET '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            res.json({"status": "ok", "result": results});
        }
    });
});
//product_pagination_next
router.post('/product_pagination_next', function (req, res, next) {
    connection.query('SELECT products.id,products.description_quotation_id, products.description_vendors_id, products.description_pickings_id, products.name,products.sold, products.purchase,products.expense, products.internal_reference, products.barcode,products.sale_price,products.cost,products.bill_type,products.route_type,products.manufacture, products.buy,products.make_to_order,products.weight,products.volume,products.customer_lead_time, products.manufacturing_lead_time,products.invoicing_policy ,products.re_invoice_expenses,products.on_hand, products.forecasted_quality,description_quotation.description AS quotation_description, description_vendors.description AS vendors_description,description_pickings.description AS pickings_description, product_type.name AS product_name,product_category.name AS product_category_name,product_pos_details.pos_category_id, product_pos_details.avaliablity_in_pos,product_pos_details.scale_weight,account.name AS account_name, account_to.name AS expance_account_name ,account_price_difference_account.name AS price_difference_account_name, taxes.name AS customer_taxes_name, taxes_to.name AS vendor_taxes_name FROM products,description_quotation,description_vendors,description_pickings,product_type,product_category,product_pos_details,account, (select * from account) AS account_to,(select * from account) AS account_price_difference_account,taxes,(select * from taxes) AS taxes_to WHERE products.id = (SELECT max( id ) FROM products WHERE id > "'+req.body.id+'") AND products.description_quotation_id = description_quotation.id AND products.description_vendors_id = description_vendors.id AND products.description_pickings_id = description_pickings.id AND products.type_id = product_type.id AND products.product_category_id = product_category.id AND products.product_pos_details_id = product_pos_details.id AND products.income_account_id = account.id AND products.customer_tax_id = taxes.id AND products.expance_account_id = account_to.id AND products.price_difference_account_id = account_price_difference_account.id AND products.vendor_taxes_id = taxes_to.id',function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            res.json({"status": "ok", "result": results});
        }
    });

});
// product_pagination_previous
router.post('/product_pagination_previous', function (req, res, next) {
    connection.query('SELECT products.id,products.description_quotation_id, products.description_vendors_id, products.description_pickings_id, products.name,products.sold, products.purchase,products.expense, products.internal_reference, products.barcode,products.sale_price,products.cost,products.bill_type,products.route_type,products.manufacture, products.buy,products.make_to_order,products.weight,products.volume,products.customer_lead_time, products.manufacturing_lead_time,products.invoicing_policy ,products.re_invoice_expenses,products.on_hand, products.forecasted_quality,description_quotation.description AS quotation_description, description_vendors.description AS vendors_description,description_pickings.description AS pickings_description, product_type.name AS product_name,product_category.name AS product_category_name,product_pos_details.pos_category_id, product_pos_details.avaliablity_in_pos,product_pos_details.scale_weight,account.name AS account_name, account_to.name AS expance_account_name ,account_price_difference_account.name AS price_difference_account_name, taxes.name AS customer_taxes_name, taxes_to.name AS vendor_taxes_name FROM products,description_quotation,description_vendors,description_pickings,product_type,product_category,product_pos_details,account, (select * from account) AS account_to,(select * from account) AS account_price_difference_account,taxes,(select * from taxes) AS taxes_to WHERE products.id = (SELECT max( id ) FROM products WHERE id < "'+req.body.id+'") AND products.description_quotation_id = description_quotation.id AND products.description_vendors_id = description_vendors.id AND products.description_pickings_id = description_pickings.id AND products.type_id = product_type.id AND products.product_category_id = product_category.id AND products.product_pos_details_id = product_pos_details.id AND products.income_account_id = account.id AND products.customer_tax_id = taxes.id AND products.expance_account_id = account_to.id AND products.price_difference_account_id = account_price_difference_account.id AND products.vendor_taxes_id = taxes_to.id',function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            res.json({"status": "ok", "result": results});
        }
    });
});
// products table view
router.post('/select_all_product_table_view', function (req, res, next) {
    connection.query('SELECT products.id, products.forecasted_quality , products.name , product_type.name AS producttype_name , products.internal_reference, products.sale_price, products.cost, products.on_hand , product_category.name AS product_category_name FROM products INNER JOIN product_type ON product_type.id = products.type_id INNER JOIN product_category ON products.product_category_id = product_category.id ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// ptoduct type
router.post('/select_all_product_type', function (req, res, next) {
    connection.query('SELECT * FROM `product_type` ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// product category
router.post('/select_all_product_category', function (req, res, next) {
    connection.query('SELECT * FROM `product_category` ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/select_all_journal', function (req, res, next) {
    connection.query('SELECT * FROM `journal` ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// pos category
router.post('/select_all_pos_category', function (req, res, next) {
    connection.query('SELECT * FROM `pos_category` ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// **************************modal use***********************
router.post('/select_all_pos_category_id', function (req, res, next) {
    connection.query('SELECT * FROM `pos_category` WHERE id = "'+req.body.id+'" ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/select_all_product_category_id', function (req, res, next) {
    connection.query('SELECT * FROM `product_category` WHERE id = "'+req.body.id+'" ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/select_all_account_id', function (req, res, next) {
    connection.query('SELECT * FROM `account` WHERE id = '+req.body.id+'', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// **************************modal use***********************
//account
router.post('/select_all_account', function (req, res, next) {
    connection.query('SELECT * FROM `account` ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//taxes
router.post('/select_all_taxes', function (req, res, next) {
    connection.query('SELECT * FROM `taxes` ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//product_vendor
router.post('/select_all_product_vendor', function (req, res, next) {
    connection.query('select * from product_vendor where product_id="0"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//contact
router.post('/select_all_vendor', function (req, res, next) {
    connection.query('SELECT * FROM `contact` ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//add_product
router.post('/add_products', function (req, res, next) {
    connection.query('INSERT INTO `description_quotation`(`description`) ' +
        'VALUES ("'+req.body.description_for_quotations_get+'")', function (error1, results1, fields) {
        if (error1) {
            res.json({"status": "failed", "message": error1.message});
        } else {
            connection.query('INSERT INTO `description_pickings`(`description`) ' +
                'VALUES ("'+req.body.description_for_picking_get+'")', function (error, results2, fields) {
                if (!error) {
                    connection.query('INSERT INTO `description_vendors`(`description`) ' +
                        'VALUES ("'+req.body.description_for_vendor_get+'")', function (error3, results3, fields) {
                        if (!error3) {
                            connection.query('INSERT INTO `product_pos_details`(`pos_category_id`,`scale_weight`,`avaliablity_in_pos`) ' +
                                'VALUES ("'+req.body.pos_category_get+'",'+req.body.weigh_with_scale_get+',"'+req.body.pos_get+'")', function (error4, results4, fields) {
                                if (!error4) {
                                    console.log('INSERT INTO `products`(`name`,`sold`, `purchase`, `expense`, `type_id`, `internal_reference`, `barcode`, `sale_price`, `cost`, `bill_type`, `route_type`,`manufacture`,`buy`,`make_to_order`, `weight`, `volume`, `product_category_id`, `customer_lead_time`, `manufacturing_lead_time`, `product_pos_details_id`, `income_account_id`, `customer_tax_id`, `expance_account_id`, `vendor_taxes_id`,`price_difference_account_id`, `invoicing_policy`,`re_invoice_expenses`,`description_quotation_id`,`description_vendors_id`,`description_pickings_id`) ' +
                                        'VALUES ("'+req.body.product_name_get+'",'+req.body.can_be_sold_get+','+req.body.can_be_prchased_get+','+req.body.can_be_expensed_get+',"'+req.body.product_type_get+'","'+req.body.internal_refrence_get+'","'+req.body.barcode_get+'","'+req.body.sales_price_get+'","'+req.body.cost_get+'","'+req.body.control_purchase_bills_get+'","'+req.body.routes_get+'","'+req.body.routes_manufacture_get+'","'+req.body.routes_buy_get+'",'+req.body.routes_order_get+',"'+req.body.weight_get+'","'+req.body.volume_get+'","'+req.body.internal_category_get+'","'+req.body.customer_lead_time_get+'","'+req.body.manufacturing_lead_time_get+'","'+results4.insertId+'","'+req.body.income_account_get+'","'+req.body.customer_taxes_get+'","'+req.body.expanece_account_get+'","'+req.body.vendor_taxes_get+'","'+req.body.price_diff_account_get+'","'+req.body.ordered_quantities_get+'","'+req.body.re_invoice_expenses_get+'",' + results1.insertId + ',' + results3.insertId + ',' + results2.insertId + ')');
                                    connection.query('INSERT INTO `products`(`name`,`sold`, `purchase`, `expense`, `type_id`, `internal_reference`, `barcode`, `sale_price`, `cost`, `bill_type`, `route_type`,`manufacture`,`buy`,`make_to_order`, `weight`, `volume`, `product_category_id`, `customer_lead_time`, `manufacturing_lead_time`, `product_pos_details_id`, `income_account_id`, `customer_tax_id`, `expance_account_id`, `vendor_taxes_id`,`price_difference_account_id`, `invoicing_policy`,`re_invoice_expenses`,`description_quotation_id`,`description_vendors_id`,`description_pickings_id`) ' +
                                        'VALUES ("'+req.body.product_name_get+'",'+req.body.can_be_sold_get+','+req.body.can_be_prchased_get+','+req.body.can_be_expensed_get+',"'+req.body.product_type_get+'","'+req.body.internal_refrence_get+'","'+req.body.barcode_get+'","'+req.body.sales_price_get+'","'+req.body.cost_get+'","'+req.body.control_purchase_bills_get+'","'+req.body.routes_get+'","'+req.body.routes_manufacture_get+'","'+req.body.routes_buy_get+'",'+req.body.routes_order_get+',"'+req.body.weight_get+'","'+req.body.volume_get+'","'+req.body.internal_category_get+'","'+req.body.customer_lead_time_get+'","'+req.body.manufacturing_lead_time_get+'","'+results4.insertId+'","'+req.body.income_account_get+'","'+req.body.customer_taxes_get+'","'+req.body.expanece_account_get+'","'+req.body.vendor_taxes_get+'","'+req.body.price_diff_account_get+'","'+req.body.ordered_quantities_get+'","'+req.body.re_invoice_expenses_get+'",' + results1.insertId + ',' + results3.insertId + ',' + results2.insertId + ')', function (error12, results, fields) {
                                        if (!error12) {
                                            console.log('UPDATE product_vendor SET product_id = '+results.insertId+' WHERE product_id = "0"');
                                            connection.query('INSERT INTO `product_vendor`(`product_id`,`vendor_id`) ' +
                                                'VALUES ('+results.insertId+',"0","'+req.body.vendor_product_name_get+'")', function (error, results, fields) {
                                                if (!error) {
                                                    res.json({"status": "ok", "result": results});
                                                } else {
                                                    res.json({"status": "failed", "message": error.message});
                                                }
                                            });
                                        } else {
                                            res.json({"status": "failed", "message": error.message});
                                        }
                                    });
                                } else {
                                    res.json({"status": "failed", "message": error4.message});
                                }
                            });
                        } else {
                            res.json({"status": "failed", "message": error4.message});
                        }
                    });
                } else {
                    res.json({"status": "failed", "message": error.message});
                }
            });
        }
    });
});
// add product vendor
router.post('/add_products_vendor', function (req, res, next) {
    connection.query('INSERT INTO `product_vendor`(`contact_id`,`product_id`, `vendor_product_name`, `vendor_product_code`, `delivery_lead_time`, `minimal_quantity`, `price`, `validity_start`, `validity_end`) ' +
        'VALUES ("'+req.body.vendor_get+'","0","'+req.body.vendor_product_name_get+'","'+req.body.vendor_product_code_get+'","'+req.body.delivery_lead_time_get+'","'+req.body.minimal_quantity_get+'","'+req.body.price_get+'","'+req.body.validate+'","'+req.body.to+'")', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//show product view
router.post('/show_product_view_1', function (req, res, next) {
    connection.query('SELECT * FROM pos_category WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/show_product_view', function (req, res, next) {
    connection.query('SELECT products.id,products.description_quotation_id, products.description_vendors_id, products.description_pickings_id, products.name,products.sold, products.purchase,products.expense, products.internal_reference, products.barcode,products.sale_price,products.cost,products.bill_type,products.route_type,products.manufacture, products.buy,products.make_to_order,products.weight,products.volume,products.customer_lead_time, products.manufacturing_lead_time,products.invoicing_policy ,products.re_invoice_expenses,products.on_hand, products.forecasted_quality,description_quotation.description AS quotation_description, description_vendors.description AS vendors_description,description_pickings.description AS pickings_description, product_type.name AS product_name,product_category.name AS product_category_name,product_pos_details.pos_category_id, product_pos_details.avaliablity_in_pos,product_pos_details.scale_weight,account.name AS account_name, account_to.name AS expance_account_name ,account_price_difference_account.name AS price_difference_account_name, taxes.name AS customer_taxes_name, taxes_to.name AS vendor_taxes_name FROM products,description_quotation,description_vendors,description_pickings,product_type,product_category,product_pos_details,account, (select * from account) AS account_to,(select * from account) AS account_price_difference_account,taxes,(select * from taxes) AS taxes_to WHERE products.id = "'+req.body.id+'" AND products.description_quotation_id = description_quotation.id AND products.description_vendors_id = description_vendors.id AND products.description_pickings_id = description_pickings.id AND products.type_id = product_type.id AND products.product_category_id = product_category.id AND products.product_pos_details_id = product_pos_details.id AND products.income_account_id = account.id AND products.customer_tax_id = taxes.id AND products.expance_account_id = account_to.id AND products.price_difference_account_id = account_price_difference_account.id AND products.vendor_taxes_id = taxes_to.id', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "faileds", "message": error.message});
        }
    });
});
router.post('/show_product_table_view_2', function (req, res, next) {
    connection.query('SELECT product_vendor.id,product_vendor.vendor_product_name , product_vendor.delivery_lead_time,product_vendor.minimal_quantity,' +
        'product_vendor.price,product_vendor.validity_start,product_vendor.validity_end FROM product_vendor ,products ' +
        'WHERE products.id = "'+req.body.id+'" AND product_vendor.product_id = products.id', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//product update
router.post('/sales_product_update', function (req, res , results) {

    // if(!(req.body.vendor_taxes_get)){
    //     req.body.vendor_taxes_get=1;
    // }
    connection.query('UPDATE `products` SET `name`= "'+req.body.name+'",`sold`= '+req.body.sold+',`purchase`= '+req.body.purchase+',' +
        '`expense`= '+req.body.expense+',`type_id`= '+req.body.product_name_k+',`internal_reference`="'+req.body.internal_reference+'",`barcode`="'+req.body.barcode+'",' +
        '`sale_price`= '+req.body.sale_price+',' +
        '`cost`= '+req.body.cost+',`bill_type`="'+req.body.bill_type+'",`manufacture`= '+req.body.manufacture+',`buy`= '+req.body.buy+',' +
        '`make_to_order`= '+req.body.make_to_order+',`weight`= '+req.body.weight+',`volume`= '+req.body.volume+',`product_category_id`= "'+req.body.product_category_get+'",' +
        '`customer_lead_time`= "'+req.body.customer_lead_time+'",`manufacturing_lead_time`= "'+req.body.manufacturing_lead_time+'",`product_pos_details_id`= "'+req.body.pos_category_get+'",' +
        '`income_account_id`= "'+req.body.income_account_get+'",`customer_tax_id`= '+req.body.customer_taxes_get+',`expance_account_id`= '+req.body.expanece_account_get+',`vendor_taxes_id`='+req.body.vendor_taxes_get+',' +
        '`price_difference_account_id`="'+req.body.price_diff_account_get+'",`invoicing_policy`= "'+req.body.invoicing_policy+'",' +
        '`re_invoice_expenses`= "'+req.body.re_invoice_expenses+'" WHERE id = '+req.body.id+'', function (error, results, fields) {
        if (!error) {
            connection.query('UPDATE `description_pickings` SET `description`= "'+req.body.pickings_description+'" WHERE id = '+req.body.description_pickings_id+'', function (error, results, fields) {
                if (!error) {
                    connection.query('UPDATE `description_quotation` SET `description`= "'+req.body.quotation_description+'" WHERE id = '+req.body.description_quotation_id+'', function (error, results, fields) {
                        if (!error) {
                            connection.query('UPDATE `description_vendors` SET `description`= "'+req.body.vendors_description+'" WHERE id = '+req.body.description_vendors_id+'', function (error, results, fields) {
                                if (!error) {
                                    res.json({"status": "ok", "result": results});
                                } else {
                                    res.json({"status": "failed", "message": error.message});
                                }
                            });
                        } else {
                            res.json({"status": "failed", "message": error.message});
                        }
                    });
                } else {
                    res.json({"status": "failed", "message": error.message});
                }
            });
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });

});
// product vendor delete from product edit
router.post('/product_vendor_delete_from_product_edit', function (req, res, next) {
    console.log(req);
    connection.query('DELETE  from product_vendor where id='+"'"+ req.body.id +"'" +'', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// vendor product update
router.post('/vendor_product_update', function (req, res, next) {
    connection.query('INSERT INTO `product_vendor`(`contact_id`,`product_id`, `vendor_product_name`, `vendor_product_code`, `delivery_lead_time`, `minimal_quantity`, `price`, `validity_start`, `validity_end`) ' +
        'VALUES ('+req.body.vendor_get+','+req.body.id+',"'+req.body.vendor_product_name_get+'","'+req.body.vendor_product_code_get+'",'+req.body.delivery_lead_time_get+','+req.body.minimal_quantity_get+','+req.body.price_get+',"'+req.body.validate+'","'+req.body.to+'")', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//pos catergory parent name
router.post('/pos_catergory_parent_name', function (req, res, next) {
    connection.query('SELECT category_name FROM pos_category WHERE id = (SELECT parent_id FROM pos_category WHERE id = "'+req.body.id+'")', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// product count
router.post('/product_count', function (req, res, next) {
    connection.query('SELECT COUNT(*) AS pro_name FROM products', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// select all account
router.post('/all_account_by_id', function (req, res, next) {
    connection.query('SELECT * FROM account WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// sselect all account type
router.post('/all_account_type_by_id', function (req, res, next) {
    connection.query('SELECT * FROM account_type', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// select all default_tax
router.post('/all_default_tax_by_id', function (req, res, next) {
    connection.query('SELECT * FROM default_tax', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// select  all force_removal_strategy
router.post('/all_force_removal_strategy_by_id', function (req, res, next) {
    connection.query('SELECT * FROM force_removal_strategy', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/all_force_removal_strategy_by_id_modal', function (req, res, next) {
    connection.query('SELECT * FROM force_removal_strategy  WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// select all routes
router.post('/all_routes', function (req, res, next) {
    connection.query('SELECT * FROM routes', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// select routes by id
router.post('/all_routes_by_id', function (req, res, next) {
    connection.query('SELECT * FROM routes WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// select all location
router.post('/all_location', function (req, res, next) {
    connection.query('SELECT * FROM location ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// select all picking_type
router.post('/all_picking_type', function (req, res, next) {
    connection.query('SELECT * FROM picking_type ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// pos_catergory_update
router.post('/pos_catergory_update', function (req, res, next) {
    connection.query('UPDATE `pos_category` SET `category_name`= "'+req.body.category_name+'",`parent_id`= "'+req.body.modal_pos_category_get+'",`sequence`= "'+req.body.sequence+'" WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// internal Category
router.post('/internal_category_update', function (req, res, next) {
    connection.query('UPDATE `product_category` SET `name`= "'+req.body.internal_category_name+'",`parent_category_id`="'+req.body.internal_category_get+'",`category_type`= "'+req.body.category_type_get+'",' +
        '`inventory_valuation`="'+req.body.inventory_valuation_get+'",`price_difference_account_id`= "'+req.body.price_diff_account_get+'",`income_account_id`= "'+req.body.income_account_get+'",`expense_account_id`="'+req.body.expanece_account_get+'",' +
        '`stock_input_account_id`="'+req.body.stock_input_account_get+'",`stock_output_account_id`="'+req.body.stock_output_account_get+'",`stock_valuation_account_id`="'+req.body.stock_valuation_account_get+'",' +
        '`stock_journal_id`="'+req.body.stock_journal_account_get+'" , `removal_strategy` = '+req.body.force_removal_strategy_get+' WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// price_difference_account_modal_update
router.post('/price_difference_account_modal_update', function (req, res, next) {
    connection.query('UPDATE `account` SET `account_number`="'+req.body.account_number+'",`name`="'+req.body.price_difference_account_name+'",`type_id`='+req.body.dfa_account_type_get+',' +
        '`default_tax_id`='+req.body.dfa_default_get+',`tags_id`='+req.body.dfa_tags_get+',`allow_reconciliation`='+req.body.price_diff_account_allow_reconciliation+',' +
        '`deprecated`= '+req.body.price_diff_account_deprecated+' WHERE id ="'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
// force_removal_strategy update
router.post('/force_removal_strategy_modal_update', function (req, res, next) {
    console.log(req.body);
    connection.query('UPDATE `force_removal_strategy` SET `name`= "'+req.body.force_removal_strategy_name+'",`method`="'+req.body.force_removal_strategy_method+'" WHERE id ="'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//routes insert data
router.post('/routes_create_modal', function (req, res, next) {
    if(!(req.body.product_categ_modal_get)){
        req.body.product_categ_modal_get=0;
    }if(!(req.body.product_modal_get)){
        req.body.product_modal_get=0;
    }if(!(req.body.warehouse_modal_get)){
        req.body.warehouse_modal_get=0;
    }if(!(req.body.sale_modal_get)){
        req.body.sale_modal_get=0;
    }
    console.log('INSERT INTO `routes`(`name`,`product_categories`, `products`, `warehouses`, `sale_order_lines`)' +
        ' VALUES ("'+req.body.routes_name_modal_get+'","'+req.body.product_categ_modal_get+'","'+req.body.product_modal_get+'",' +
        '"'+req.body.warehouse_modal_get+'","'+req.body.sale_modal_get+'")');
    connection.query('INSERT INTO `routes`(`name`,`product_categories`, `products`, `warehouses`, `sale_order_lines`)' +
        ' VALUES ("'+req.body.routes_name_modal_get+'","'+req.body.product_categ_modal_get+'","'+req.body.product_modal_get+'",' +
        '"'+req.body.warehouse_modal_get+'","'+req.body.sale_modal_get+'")', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        } else {
            res.json({"status": "success", "result": results});
        }
    });
});
// push_rules insert data
router.post('/push_rules_modal', function (req, res, next) {
    console.log('INSERT INTO `push_rules`(`name`, `sequence`, `source_location_id`, `destination_location_id`, `auto_move`,' +
        ' `picking_type_id`, `delay`) VALUES ("'+req.body.operation_name_get+'","'+req.body.sequence_get+'","'+req.body.source_location_get+'",' +
        '"'+req.body.destination_location_get+'","'+req.body.automatic_move_get+'","'+req.body.picking_type_get+'","'+req.body.delay_get+'")');
    connection.query('INSERT INTO `push_rules`(`name`, `sequence`, `source_location_id`, `destination_location_id`, `auto_move`,' +
        ' `picking_type_id`, `delay`) VALUES ("'+req.body.operation_name_get+'","'+req.body.sequence_get+'","'+req.body.source_location_get+'",' +
        '"'+req.body.destination_location_get+'","'+req.body.automatic_move_get+'","'+req.body.picking_type_get+'","'+req.body.delay_get+'")', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        } else {
            res.json({"status": "success", "result": results});
        }
    });
});
router.post('/delete_products', function (req, res, next) {
    for (var i = 0; i < req.body.delete_items.length; ++i) {
        connection.query('DELETE FROM `products` WHERE id = "'+req.body.delete_items[i]+'"' , function (error, results, fields) {
            if (error){
                res.json({"status": "failed", "message": error.message});
            }
        });
    }
    console.log(req.body.delete_items);
});


/***********************************************    sales product end   ****************************************************/
/***********************************************    sameer work start  ****************************************************/
router.post('/create_nextactivity', function (req, res, next) {
    console.log(req);
    console.log('INSERT INTO `sub_pipe`(`opportunity_title`,`customer_id`,`email`,`phone`,`sales_person_id`,`sales_team`,`expected_revenue`,`probability`,`internal_notes`,`campain_id`,`medium_id`,`source_id`,`referred_by`,`expected_closing_date`,`contact_name`,`city`,`state`,`zip`,`next_activity`,`street_one`,`street_two`,`country_id`,`customer_name`,`person_tittle_id`,`job_position`,`mobile`,`fax`,`opt_out`,`next_activity_date`,`next_activity_description`,`pipeline_id`,`rating`) VALUES ' +
        '("'+req.body.opportunity_tit+'",'+req.body.current_company+',"'+req.body.email+'",'+req.body.phone+','+req.body.sales_persons_id+',"'+req.body.sales_team_name+'",'+req.body.expect_revenue+','+req.body.probability_revenue+',"'+req.body.internal_notes_text+'",'+req.body.campaign_id_name+','+req.body.medium_name_id+','+req.body.source_name_id+',"'+req.body.referred_by_name+'","'+req.body.dates_value+'","'+req.body.name+'","'+req.body.city+'",'+req.body.states+','+req.body.zip+',"'+req.body.next_activity+'","'+req.body.street1+'","'+req.body.street2+'",'+req.body.countrys_id+',"'+req.body.name+'","'+req.body.title_name+'","'+req.body.job_position+'","'+req.body.fax_number+'","'+req.body.mobile_number+'",'+req.body.opt_checkbox+',"'+req.body.dates_value1+'","'+req.body.next_act_desc+'",'+req.body.pipeline_name+','+req.body.rating_bar+')');
    connection.query('INSERT INTO `sub_pipe`(`opportunity_title`,`customer_id`,`email`,`phone`,`sales_person_id`,`sales_team`,`expected_revenue`,`probability`,`internal_notes`,`campain_id`,`medium_id`,`source_id`,`referred_by`,`expected_closing_date`,`contact_name`,`city`,`state`,`zip`,`next_activity`,`street_one`,`street_two`,`country_id`,`customer_name`,`person_tittle_id`,`job_position`,`mobile`,`fax`,`opt_out`,`next_activity_date`,`next_activity_description`,`pipeline_id`,`rating`) VALUES ' +
        '("'+req.body.opportunity_tit+'",'+req.body.current_company+',"'+req.body.email+'",'+req.body.phone+','+req.body.sales_persons_id+',"'+req.body.sales_team_name+'",'+req.body.expect_revenue+','+req.body.probability_revenue+',"'+req.body.internal_notes_text+'",'+req.body.campaign_id_name+','+req.body.medium_name_id+','+req.body.source_name_id+',"'+req.body.referred_by_name+'","'+req.body.dates_value+'","'+req.body.name+'","'+req.body.city+'",'+req.body.states+','+req.body.zip+',"'+req.body.next_activity+'","'+req.body.street1+'","'+req.body.street2+'",'+req.body.countrys_id+',"'+req.body.name+'","'+req.body.title_name+'","'+req.body.job_position+'","'+req.body.fax_number+'","'+req.body.mobile_number+'",'+req.body.opt_checkbox+',"'+req.body.dates_value1+'","'+req.body.next_act_desc+'",'+req.body.pipeline_name+','+req.body.rating_bar+')', function (error, results, fields) {
        if (error) {
            console.log(error.message);
            res.json({"status": "failed", "message": error.message});
        }else{
            console.log(results);}
    });
});
router.post('/sales_team_id', function (req, res, next) {
    connection.query('SELECT * FROM `sales_team`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/tags', function (req, res, next) {
    connection.query('SELECT * FROM `tags`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/salesperson', function (req, res, next) {
    connection.query('SELECT * FROM `contact`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/custname', function (req, res, next) {
    connection.query('SELECT * FROM `contact`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/campaign_name', function (req, res, next) {
    connection.query('SELECT * FROM `campain`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/medium_name', function (req, res, next) {
    connection.query('SELECT * FROM `medium`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/contacts', function (req, res, next) {
    connection.query('SELECT * from contact  where id='+"'"+ req.body.current_company +"'" +'',function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
router.post('/contact', function (req, res, next) {

    connection.query("select * from contact", function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});

        }
    });
});
router.post('/source_name', function (req, res, next) {
    connection.query('SELECT * FROM `source`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/title_name', function (req, res, next) {
    connection.query('SELECT * FROM `person_tittle`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/state_name', function (req, res, next) {
    connection.query('SELECT * FROM `contact`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/country_name', function (req, res, next) {
    connection.query('SELECT * FROM `country`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/product_name', function (req, res, next) {
    connection.query('SELECT * FROM `products`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/domain_alias', function (req, res, next) {
    connection.query('SELECT * FROM `general_settings`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/team_leader', function (req, res, next) {
    connection.query('SELECT * FROM `user`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/team_leader_id_table', function (req, res, next) {
    console.log(req.body.id);
    var ids = req.body.id;
    var grab_data = [];
    if(ids.length > 0){
        ids.forEach(function(id, ind, arr){
            connection.query('SELECT * FROM `user` where id = "'+id+'" ', function (error, results, fields) {
                if (!error) {
                    // grab_data[id] = results;
                    grab_data.push(results);
                }
                if(ind === arr.length-1){
                    res.json({"status": "ok", "result": grab_data});
                }
            });
        });
    }else{
        res.json({"status": "failed", "message": "No Ids Select!"});
    }
});
router.post('/customer_name_orderupsell', function (req, res, next) {
    connection.query('SELECT * FROM `contact`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/payment_terms_orderupsell', function (req, res, next) {
    connection.query('SELECT * FROM `contact`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sale_activity_name', function (req, res, next) {
    connection.query('SELECT * FROM `sales_team`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sale_recommend_activity', function (req, res, next) {
    connection.query('SELECT * FROM `sales_activity`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/saleactivitycreatetopbar', function (req, res, next) {
    connection.query('SELECT * FROM `pipeline`', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_activity_create', function (req, res, next) {

    if(!(req.body.days_number)){
        req.body.days_number=0;
    }


    console.log('INSERT INTO `sales_activity`(`message_type`,`sales_team_id`,`description`,`number_of_days`,`default_val`,`recomended_next_activity_id`) VALUES ' +
        '("'+req.body.message_type+'",'+req.body.sales_id_team+',"'+req.body.description_name+'",'+req.body.days_number+',"'+req.body.default_value+'",'+req.body.recommended_activity+'');
    connection.query('INSERT INTO `sales_activity`(`message_type`,`sales_team_id`,`description`,`number_of_days`,`default_val`,`recomended_next_activity_id`) VALUES ' +
        '("'+req.body.message_type+'",'+req.body.sales_id_team+',"'+req.body.description_name+'",'+req.body.days_number+',"'+req.body.default_value+'",'+req.body.recommended_activity+')', function (error, results, fields) {
        if (error) {
            console.log(error.message);
            res.json({"status": "failed", "message": error.message});
        }else{
            console.log(results);}
    });
});
router.post('/sales_pricelist_create', function (req, res, next) {
    console.log('INSERT INTO `pricelists`(`name`,`discount_policy`) VALUES ("'+req.body.pricelist_name+'","'+req.body.discount_poli+'")')
    connection.query('INSERT INTO `pricelists`(`name`,`discount_policy`) VALUES ("'+req.body.price_name+'","'+req.body.discount_poli+'")', function (error, results, fields) {
        if (error) {
            console.log(error.message);
            res.json({"status": "failed", "message": error.message});
        }else{
            console.log(results);}
    });
});
router.post('/sales_table_call', function (req, res, next) {
    connection.query('SELECT user.username,sales_team.id, sales_team.name, sales_team.email_alias FROM sales_team LEFT JOIN user ON sales_team.team_leader_id = user.id limit 5', function (error, results, fields) {
        if (!error) {
            console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/salesteam_tablenext', function (req, res, next) {

    connection.query('SELECT  user.username,sales_team.id, sales_team.name, sales_team.email_alias FROM sales_team LEFT JOIN user ON sales_team.team_leader_id = user.id limit 5  OFFSET '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/salesteam_tableback', function (req, res, next) {

    connection.query('SELECT  user.username,sales_team.id, sales_team.name, sales_team.email_alias FROM sales_team LEFT JOIN user ON sales_team.team_leader_id = user.id limit 5  OFFSET '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });
});
router.post('/sales_table_pricelist', function (req, res, next) {
    console.log('SELECT * FROM pricelists limit 5 ')
    connection.query('SELECT * FROM pricelists limit 5', function (error, results, fields) {
        if (!error) {
            console.log(results);
            res.json({"status": "ok", "data": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/salespricelist_table_next', function (req, res, next) {
    console.log('SELECT * FROM pricelists limit 5 OFFSET '+""+ req.body.counter +"" );
    connection.query('SELECT * FROM pricelists limit 5 OFFSET '+""+ req.body.counter +"" +'' , function (error, results, fields) {
        if (!error) {
            console.log(results);
            res.json({"status": "ok", "data": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/salespricelist_table_back', function (req, res, next) {
    console.log('SELECT * FROM pricelists limit 5 OFFSET '+""+ req.body.counter +"" +'');
    connection.query('SELECT * FROM pricelists limit 5 OFFSET '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (!error) {
            console.log(results);
            res.json({"status": "ok", "data": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_team_modal_table', function (req, res, next) {
    connection.query('SELECT * FROM user', function (error, results, fields) {
        if (!error) {
            console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_pricelist_edit', function (req, res, next) {
    connection.query('SELECT pricelists.id, pricelists.name, pricelists.discount_policy FROM pricelists WHERE pricelists.id = "'+req.body.id+'" ', function (error, results, fields) {
        if (!error) {
            console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }

    });
});
router.post('/sales_next_edit', function (req, res, next) {
    connection.query('SELECT contact.name, sub_pipe.opportunity_title,sub_pipe.expected_revenue, sub_pipe.rating,sub_pipe.probability, sub_pipe.email,sub_pipe.phone,sub_pipe.next_activity,sub_pipe.next_activity_date,sub_pipe.next_activity_description,sub_pipe.expected_closing_date,sub_pipe.sales_team,sub_pipe.internal_notes,sub_pipe.customer_name,sub_pipe.street_one,sub_pipe.street_two,sub_pipe.city,sub_pipe.state, ' +
        'sub_pipe.zip,sub_pipe.contact_name,sub_pipe.job_position,sub_pipe.mobile,sub_pipe.fax,sub_pipe.referred_by FROM sub_pipe,contact WHERE sub_pipe.id = "'+req.body.id+'" AND sub_pipe.customer_id = contact.id', function (error, results, fields) {
        if (!error) {
            console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }

    });
});
router.post('/sales_form_edit', function (req, res, next) {
    connection.query('SELECT * FROM `sales_team` WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }

    });
});
router.post('/sales_form_call', function (req, res, next) {
    connection.query('SELECT user.username,sales_team.id,user.phone_no,user.email, sales_team.name, sales_team.email_alias, sales_team.quotations ,sales_team.invoices, sales_team.opportunities FROM sales_team , user WHERE sales_team.id = "'+req.body.id+'" AND sales_team.team_leader_id = user.id', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_team_team_member', function (req, res, next) {
    connection.query('SELECT sales_team.name ,sales_team.id  ,sales_team_team_members.team_member_id ,' +
        'user.username FROM sales_team , sales_team_team_members ,user WHERE sales_team.id = "'+req.body.id+'" ' +
        'AND sales_team.id = sales_team_team_members.sales_team_id ' +
        'AND sales_team_team_members.team_member_id = user.id', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/users_team_m', function (req, res, next) {
    connection.query('SELECT * FROM `user` WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/users_team_m_delete', function (req, res, next) {
   connection.query('DELETE FROM `sales_team_team_members` WHERE team_member_id = "'+req.body.id+'" AND sales_team_id = "'+req.body.ids+'" ', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else {
            res.json({"status": "ok", "result": results});
        }
    });

});

router.post('/sales_pricelist_form', function (req, res, next) {
    connection.query('SELECT pricelists.id, pricelists.name, pricelists.discount_policy FROM pricelists WHERE pricelists.id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_pricelist_form_next', function (req, res, next) {
    connection.query('SELECT * FROM pricelists WHERE id = ( SELECT MIN( id ) FROM pricelists WHERE id >'+"'"+ req.body.id +"'" +')', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_pricelist_form_back', function (req, res, next) {
    connection.query('SELECT * FROM pricelists WHERE id = ( SELECT MAX( id ) FROM pricelists WHERE id <'+"'"+ req.body.id +"'" +')', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_activity_form', function (req, res, next) {
    connection.query('SELECT sales_activity.message_type,sales_activity.number_of_days,sales_activity.description,sales_activity.default_val AS default_name,sales_activity.recomended_next_activity_id , sales_team.name FROM sales_activity, sales_team WHERE sales_activity.id = "'+req.body.id+'" AND sales_activity.sales_team_id = sales_team.id', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_activity_form_next', function (req, res, next) {
    connection.query('SELECT * FROM sales_activity WHERE id = ( SELECT MIN( id ) FROM sales_activity WHERE id >'+"'"+ req.body.id +"'" +')', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_activity_form_back', function (req, res, next) {
    connection.query('SELECT * FROM sales_activity WHERE id = ( SELECT MAX( id ) FROM sales_activity WHERE id <'+"'"+ req.body.id +"'" +')', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_next_activity_view', function (req, res, next) {
    connection.query('SELECT sub_pipe.opportunity_title,sub_pipe.expected_revenue,sub_pipe.rating,sub_pipe.probability,sub_pipe.email,sub_pipe.phone,sub_pipe.next_activity,sub_pipe.next_activity_date,sub_pipe.next_activity_description,sub_pipe.expected_closing_date,sub_pipe.sales_team,sub_pipe.internal_notes,sub_pipe.customer_name,sub_pipe.street_one,sub_pipe.street_two,sub_pipe.city,' +
        'sub_pipe.state,sub_pipe.zip,sub_pipe.contact_name,sub_pipe.job_position,sub_pipe.mobile,sub_pipe.fax,sub_pipe.referred_by,contact_sales.is_sales_person,' +
        'pipeline.name AS pipe_name,source.name AS source_name,campain.campain_name AS camp_name,medium.name AS medium_name,person_tittle.tittle,country.country_name,contact.name ' +
        'FROM sub_pipe, contact,medium,source,campain,pipeline,person_tittle,(SELECT * FROM contact) AS contact_sales,country WHERE sub_pipe.id = "'+req.body.id+'" AND sub_pipe.customer_id = contact.id ' +
        'AND sub_pipe.source_id = source.id AND sub_pipe.medium_id = medium.id AND sub_pipe.campain_id = campain.id AND sub_pipe.person_tittle_id = person_tittle.id ' +
        'AND sub_pipe.country_id = country.id AND sub_pipe.sales_person_id = contact_sales.id AND sub_pipe.pipeline_id = pipeline.id', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_next_activity_view_next', function (req, res, next) {
    connection.query('SELECT * FROM sub_pipe WHERE id = ( SELECT MIN( id ) FROM sub_pipe WHERE id >'+"'"+ req.body.id +"'" +')', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_next_activity_view_back', function (req, res, next) {
    connection.query('SELECT * FROM sub_pipe WHERE id = ( SELECT MAX( id ) FROM sub_pipe WHERE id <'+"'"+ req.body.id +"'" +')', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_activity_id', function (req, res, next) {
    connection.query('SELECT * FROM sales_activity WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }

        router.post('/sales_next_activity_id', function (req, res, next) {    });
    });
    connection.query('SELECT * FROM sub_pipe WHERE id = "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_activity_edit', function (req, res, next) {
    console.log('SELECT * FROM `sales_activity` WHERE sales_activity.id = "'+req.body.id+'" ');
    connection.query('SELECT * FROM `sales_activity` WHERE sales_activity.id = "'+req.body.id+'" ', function (error, results, fields) {
        if (!error) {
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }

    });
});
router.post('/sales_activity_table', function (req, res, next) {
    connection.query('SELECT sales_activity.message_type,sales_activity.number_of_days,sales_activity.id, sales_team.name FROM sales_activity INNER JOIN sales_team ON sales_activity.sales_team_id = sales_team.id', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_activity_table_next', function (req, res, next) {
    connection.query('SELECT sales_activity.message_type,sales_activity.number_of_days,sales_activity.id, sales_team.name FROM sales_activity INNER JOIN sales_team ON sales_activity.sales_team_id = sales_team.id limit 2 OFFSET '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_activity_table_back', function (req, res, next) {
    connection.query('SELECT sales_activity.message_type,sales_activity.number_of_days,sales_activity.id, sales_team.name FROM sales_activity INNER JOIN sales_team ON sales_activity.sales_team_id = sales_team.id limit 2 OFFSET '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/next_activity_table', function (req, res, next) {
    connection.query('SELECT sub_pipe.id ,sub_pipe.opportunity_title,sub_pipe.customer_name,sub_pipe.next_activity_date,sub_pipe.next_activity,sub_pipe.next_activity_description,pipeline.name,sub_pipe.expected_revenue,sub_pipe.expected_closing_date FROM sub_pipe INNER JOIN pipeline ON sub_pipe.pipeline_id = pipeline.id limit 5', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/next_activity_table_next', function (req, res, next) {
    connection.query('SELECT sub_pipe.id ,sub_pipe.opportunity_title,sub_pipe.customer_name,sub_pipe.next_activity_date,sub_pipe.next_activity,sub_pipe.next_activity_description,pipeline.name,sub_pipe.expected_revenue,sub_pipe.expected_closing_date FROM sub_pipe INNER JOIN pipeline ON sub_pipe.pipeline_id = pipeline.id limit 5 OFFSET '+""+ req.body.counter +"" +'', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/next_activity_table_back', function (req, res, next) {
    connection.query('SELECT sub_pipe.id ,sub_pipe.opportunity_title,sub_pipe.customer_name,sub_pipe.next_activity_date,sub_pipe.next_activity,sub_pipe.next_activity_description,pipeline.name,sub_pipe.expected_revenue,sub_pipe.expected_closing_date FROM sub_pipe INNER JOIN pipeline ON sub_pipe.pipeline_id = pipeline.id limit 5 OFFSET '+""+ req.body.counter +""+'', function (error, results, fields) {
        if (!error) {
            //console.log(results);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
//Outgoing Mail Server
router.post('/sales_settings', function (req, res, next) {
    if(!(req.body.leads_name)){
        req.body.leads_name=0;
    }
    if(!(req.body.pro_name)){
        req.body.pro_name=0;
    }
    if(!(req.body.unit_name)){
        req.body.unit_name=0;
    }
    if(!(req.body.default_invo)){
        req.body.default_invo=0;
    }

    if(!(req.body.digital_name)){
        req.body.digital_name=0;
    }

    if(!(req.body.sale_price_name)){
        req.body.sale_price_name=0;
    }

    if(!(req.body.address_name)){
        req.body.address_name=0;
    }

    if(!(req.body.incoterms_name)){
        req.body.incoterms_name=0;
    }

    if(!(req.body.discounts_name)){
        req.body.discounts_name=0;
    }

    if(!(req.body.margins_name)){
        req.body.margins_name=0;
    }

    if(!(req.body.sales_layout_name)){
        req.body.sales_layout_name=0;
    }

    if(!(req.body.sales_modi_name)){
        req.body.sales_modi_name=0;
    }

    if(!(req.body.order_route_name)){
        req.body.order_route_name=0;
    }

    if(!(req.body.date_name)){
        req.body.date_name=0;
    }

    if(!(req.body.online_quote_name)){
        req.body.online_quote_name=0;
    }
    if(!(req.body.online_quote_name)){
        req.body.online_quote_name=0;
    }

    if(!(req.body.online_quote_name)){
        req.body.online_quote_name=0;
    }

    if(!(req.body.online_quote_name)){
        req.body.online_quote_name=0;
    }

    if(!(req.body.online_quote_name)){
        req.body.online_quote_name=0;
    }
    if(!(req.body.sales_safety_name)){
        req.body.sales_safety_name=0;
    }

    if(!(req.body.shipping_name)){
        req.body.shipping_name=0;
    }

    if(!(req.body.default_ship_name)){
        req.body.default_ship_name=0;
    }





    console.log(req.body);
    connection.query('INSERT INTO `sales_setting`(`lead_email`,`leads`,`product_variants`,`unit_measure`,`default_invoice`,`digital_images`,`sale_price`,`terms_and_conditions`,`addresses`,`incoterms`,`discount`,`margins`,`sales_layout`,`sale_order`,`warning`,`tax_display`,`order_routing`,`date`,`online_quotations`,`sales_safety_days`,`shipping`,`shipping_policy`) VALUES ' +
        '("'+req.body.leads_emails+'","'+req.body.leads_name+'","'+req.body.pro_name+'","'+req.body.unit_name+'","'+req.body.default_invo+'","'+req.body.digital_name+'","'+req.body.sale_price_name+'","'+req.body.default_terms_name+'","'+req.body.address_name+'","'+req.body.incoterms_name+'","'+req.body.discounts_name+'","'+req.body.margins_name+'","'+req.body.sales_layout_name+'","'+req.body.sales_modi_name+'","'+req.body.warning_name+'","'+req.body.tax_total_name+'","'+req.body.order_route_name+'","'+req.body.date_name+'","'+req.body.online_quote_name+'",'+req.body.sales_safety_name+',"'+req.body.shipping_name+'","'+req.body.default_ship_name+'")', function (error, results, fields) {
        if (error) {
            console.log(error);
            res.json({"status": "failed", "message": error.message});
        }
        console.log(results);
    });
});
router.post('/sales_team', function (req, res, next) {
    if(!(req.body.team_quotation)){
        req.body.team_quotation=0;
    }
    if(!(req.body.team_invoices)){
        req.body.team_invoices=0;
    }
    if(!(req.body.team_opportunities)){
        req.body.team_opportunities=0;
    }
    if(!(req.body.team_lead)){
        req.body.team_lead=null;
    }
    connection.query('INSERT INTO `sales_team`(`name`,`team_leader_id`,`email_alias`,`quotations`,`invoices`,`opportunities`) VALUES ' +
        '("'+req.body.name+'",'+req.body.team_lead+',"'+req.body.email+'",'+req.body.team_quotation+','+req.body.team_invoices+','+req.body.team_opportunities+')', function (error, results, fields) {
        console.log(req.body);
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{

            for (var i = 0; i < req.body.lp_value.length; ++i) {
                connection.query('INSERT INTO `sales_team_team_members`(`team_member_id`, `sales_team_id`) VALUES ('+req.body.lp_value[i]+','+results.insertId +')', function (error, results1, fields) {
                    if (error) {
                        res.json({"status": "failed", "message": error.message});
                    }
                });
            }
        }
    });
});
router.post('/sales_team_team', function (req, res, next) {
    connection.query('INSERT INTO `sales_team_team_members`(`sales_team_id`,`team_leader_id`) VALUES ' +
        '("'+req.body.name+'",'+req.body.team_lead+')', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }
    });
});
router.post('/sales_form_update', function (req, res , results) {
    console.log('UPDATE sales_team SET name = "'+req.body.sales_name+'",team_leader_id = "'+req.body.team_lead_name+'",email_alias = "'+req.body.email_name+'" where id="'+req.body.id+'"');
    connection.query('UPDATE sales_team SET name = "'+req.body.sales_name+'",team_leader_id = "'+req.body.team_lead_name+'",email_alias = "'+req.body.email_name+'" where id="'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            console.log(req.body.id);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });

});
router.post('/sales_next_edit_update', function (req, res , results) {
    console.log('UPDATE sub_pipe SET opportunity_title = "'+req.body.opportunity_title+'", expected_revenue = "'+req.body.expected_revenue+'", probability = "'+req.body.probability+'" , email = "'+req.body.email+'" , phone = "'+req.body.phone+'" , next_activity = "'+req.body.next_activity+'" , next_activity_date = "'+req.body.next_activity_date+'" ' +
        ',next_activity_description = "'+req.body.next_activity_description+'",expected_closing_date = "'+req.body.expected_closing_date+'",sales_team = "'+req.body.sales_team+'",internal_notes = "'+req.body.internal_notes+'",customer_name = "'+req.body.customer_name+'",street_one = "'+req.body.street_one+'",street_two = "'+req.body.street_two+'",city = "'+req.body.city+'",state = "'+req.body.state+'", zip = "'+req.body.zip+'", contact_name = "'+req.body.contact_name+'", job_position = "'+req.body.job_position+'", mobile = "'+req.body.mobile+'", fax = "'+req.body.fax+'", referred_by = "'+req.body.referred_by+'" where id= "'+req.body.id+'" ')

    connection.query('UPDATE sub_pipe SET opportunity_title = "'+req.body.opportunity_title+'", expected_revenue = "'+req.body.expected_revenue+'", probability = "'+req.body.probability+'" , email = "'+req.body.email+'" ,' +
        ' phone = "'+req.body.phone+'" , next_activity = "'+req.body.next_activity+'" , next_activity_date = "'+req.body.next_activity_date+'" ,next_activity_description = "'+req.body.next_activity_description+'",expected_closing_date = "'+req.body.expected_closing_date+'",sales_team = "'+req.body.sales_team+'",' +
        'internal_notes = "'+req.body.internal_notes+'",customer_name = "'+req.body.customer_name+'",street_one = "'+req.body.street_one+'",street_two = "'+req.body.street_two+'",city = "'+req.body.city+'",state = "'+req.body.state+'", zip = "'+req.body.zip+'", contact_name = "'+req.body.contact_name+'", job_position = "'+req.body.job_position+'",' +
        ' mobile = "'+req.body.mobile+'", fax = "'+req.body.fax+'", referred_by = "'+req.body.referred_by+'", customer_id = "'+req.body.customer_name_drop+'" where id= "'+req.body.id+'" ', function (error, results, fields) {
        if (!error) {
            console.log(req.body.id);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });

});
router.post('/sales_pricelist_update', function (req, res , results) {

    connection.query('UPDATE pricelists SET name = "'+req.body.price_name+'",discount_policy = "'+req.body.dis_policy+'" where id= "'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            console.log(req.body.id);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });

});
router.post('/sales_activity_form_update', function (req, res , results) {
    if(!(req.body.name)){
        req.body.name=0;
    }if(!(req.body.number_of_days)){
        req.body.number_of_days=null;
    }if(!(req.body.default)){
        req.body.default=0;
    }if(!(req.body.recomended_next_activity_id)){
        req.body.recomended_next_activity_id=null;
    }
    console.log('UPDATE sales_activity SET message_type = "'+req.body.message_type+'",' +
        ' sales_team_id = '+req.body.name+' ,description = "'+req.body.description+'",' +
        ' number_of_days = "'+req.body.number_of_days+'", default_val = "'+req.body.default+'" ,' +
        ' recomended_next_activity_id = '+req.body.recomended_next_activity_id+'' +
        ' where id="'+req.body.id+'"');
    connection.query('UPDATE sales_activity SET message_type = "'+req.body.message_type+'",' +
        ' sales_team_id = '+req.body.name+' ,description = "'+req.body.description+'",' +
        ' number_of_days = "'+req.body.number_of_days+'", default_val = "'+req.body.default+'" ,' +
        ' recomended_next_activity_id = '+req.body.recomended_next_activity_id+'' +
        ' where id="'+req.body.id+'"', function (error, results, fields) {
        if (!error) {
            console.log(req.body.id);
            res.json({"status": "ok", "result": results});
        } else {
            res.json({"status": "failed", "message": error.message});
        }
    });

});
router.post('/update_team_member_status', function (req, res, next) {
    console.log(req.body);

    for (var i = 0; i < req.body.delete_items.length; ++i) {
        connection.query('UPDATE user SET team_member_id = 1 WHERE id = "'+req.body.delete_items[i]+'"' , function (error, results, fields) {
            if (error){
                res.json({"status": "failed", "message": error.message});
            }
            // console.log(results);
        });
    }
    console.log(req.body.delete_items);

});
router.post('/sales_team_modal_outside', function (req, res, next) {

    connection.query('SELECT * FROM user WHERE team_member_id = "1"',function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else{
            res.json({"status": "ok", "data": results});

        }
    });

});
//user delete
router.post('/delete_sales_team_table', function (req, res, next) {
    console.log(req.body)
    for (var i = 0; i < req.body.delete_items.length; ++i) {

        connection.query('DELETE FROM `sales_team` WHERE id = "'+req.body.delete_items[i]+'"' , function (error, results, fields) {
            if (error){
                res.json({"status": "failed", "message": error.message});
            }
            // console.log(results);
        });
    }
    console.log(req.body.delete_items);

});
router.post('/delete_sales_team_inside', function (req, res, next) {
    connection.query('DELETE FROM `sales_team` WHERE id = "' +req.body.id+'"', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else {
        }
        // res.redirect('setting/users')
        // console.log(results);
    });
    //console.log(req.body.delete_items);
});
router.post('/delete_sales_pricelists_inside', function (req, res, next) {
    connection.query('DELETE FROM `pricelists` WHERE id = "' +req.body.id+'"', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else {
        }
        // res.redirect('setting/users')
        // console.log(results);
    });
    //console.log(req.body.delete_items);
});
router.post('/delete_sales_activity_inside', function (req, res, next) {
    connection.query('DELETE FROM `sales_activity` WHERE id = "' +req.body.id+'"', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else {
        }
        // res.redirect('setting/users')
        // console.log(results);
    });
    //console.log(req.body.delete_items);
});
router.post('/delete_next_activities_form_delete', function (req, res, next) {
    connection.query('DELETE FROM `sub_pipe` WHERE id = "' +req.body.id+'"', function (error, results, fields) {
        if (error) {
            res.json({"status": "failed", "message": error.message});
        }else {
        }
        // res.redirect('setting/users')
        // console.log(results);
    });
    //console.log(req.body.delete_items);
});
router.post('/sales_team_form_next', function (req, res, next) {

    connection.query('SELECT * FROM sales_team WHERE id = ( SELECT MIN( id ) FROM sales_team WHERE id >'+"'"+ req.body.id +"'" +')',function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});

        }
    });

});
router.post('/sales_team_form_back', function (req, res, next) {

    connection.query('SELECT * FROM sales_team WHERE id = ( SELECT max( id ) FROM sales_team WHERE id <'+"'"+ req.body.id +"'" +')',function (error, results, fields) {
        if (error) res.json({"status": "failed", "message": error.message});
        else{
            res.json({"status": "ok", "data": results});
        }
    });

});
router.post('/salesteamtabledelete', function (req, res, next) {

    for (var i = 0; i < req.body.delete_items.length; ++i) {
        console.log(req.body.delete_items[i]);
        console.log('DELETE FROM `sales_team` WHERE id = "'+req.body.delete_items[i]+'"');
        connection.query('DELETE FROM `sales_team` WHERE id = "'+req.body.delete_items[i]+'"' , function (error, results, fields) {
            if (error){
                res.json({"status": "failed", "message": error.message});
            }
            // console.log(results);
        });
    }
    console.log(req.body.delete_items);

});
router.post('/salesactivitytabledelete', function (req, res, next) {

    for (var i = 0; i < req.body.delete_items.length; ++i) {
        console.log(req.body.delete_items[i]);
        console.log('DELETE FROM `sales_activity` WHERE id = "'+req.body.delete_items[i]+'"');
        connection.query('DELETE FROM `sales_activity` WHERE id = "'+req.body.delete_items[i]+'"' , function (error, results, fields) {
            if (error){
                res.json({"status": "failed", "message": error.message});
            }
            // console.log(results);
        });
    }
    console.log(req.body.delete_items);

});
router.post('/salespricelisttabledelete', function (req, res, next) {

    for (var i = 0; i < req.body.delete_items.length; ++i) {
        console.log(req.body.delete_items[i]);
        console.log('DELETE FROM `pricelists` WHERE id = "'+req.body.delete_items[i]+'"');
        connection.query('DELETE FROM `pricelists` WHERE id = "'+req.body.delete_items[i]+'"' , function (error, results, fields) {
            if (error){
                res.json({"status": "failed", "message": error.message});
            }
            // console.log(results);
        });
    }
    console.log(req.body.delete_items);

});
router.post('/salesnnextactivitytabledelete', function (req, res, next) {

    for (var i = 0; i < req.body.delete_items.length; ++i) {
        console.log(req.body.delete_items[i]);
        console.log('DELETE FROM `sub_pipe` WHERE id = "'+req.body.delete_items[i]+'"');
        connection.query('DELETE FROM `sub_pipe` WHERE id = "'+req.body.delete_items[i]+'"' , function (error, results, fields) {
            if (error){
                res.json({"status": "failed", "message": error.message});
            }
            // console.log(results);
        });
    }
    console.log(req.body.delete_items);

});


/***********************************************    sameer work end  ****************************************************/


module.exports = router;

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}