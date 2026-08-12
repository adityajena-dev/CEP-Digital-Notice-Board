const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const Notice = require("./models/notice");
const Group = require("./models/group");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// ========================
// Home Route
// ========================

app.get("/", (req, res) => {
    res.send("Digital Notice Board Backend is Running!");
});


// ========================
// GET Notices
// ========================

app.get("/api/notices", async (req, res) => {

    try {

        const groupCode = req.query.groupCode;

        if (!groupCode) {
            return res.status(400).json({
                message: "Group code is required."
            });
        }

        const notices = await Notice.find({
            groupCode: groupCode
        }).sort({ _id: -1 });

        res.json(notices);

    } catch (error) {

        console.error("Error fetching notices:", error);

        res.status(500).json({
            message: "Failed to fetch notices."
        });

    }

});

app.post("/api/groups", async (req, res) => {

    try {

        const { name, code, teacherPassword } = req.body;


        if (!name || !code || !teacherPassword) {

            return res.status(400).json({
                message:
                    "Group name, code and teacher password are required."
            });

        }


        const existingGroup =
            await Group.findOne({ code });


        if (existingGroup) {

            return res.status(400).json({
                message: "Group code already exists."
            });

        }


        // Hash teacher password

        const hashedPassword =
            await bcrypt.hash(teacherPassword, 10);


        const group = new Group({

            name,
            code,
            teacherPassword: hashedPassword

        });


        const savedGroup =
            await group.save();


        res.status(201).json({

            message:
                "Group created successfully!",

            group: {

                name: savedGroup.name,
                code: savedGroup.code

            }

        });


    } catch (error) {

        console.error(
            "Error creating group:",
            error
        );

        res.status(500).json({

            message:
                "Failed to create group."

        });

    }

});


// ========================
// POST Notice
// ========================

app.post("/api/notices", async (req, res) => {

    try {

        const notice = new Notice(req.body);

        const savedNotice = await notice.save();

        console.log("Notice saved:", savedNotice);

        res.status(201).json({
            message: "Notice saved successfully!",
            notice: savedNotice
        });

    } catch (error) {

        console.error("Error saving notice:", error);

        res.status(500).json({
            message: "Failed to save notice."
        });

    }

});

// ========================
// JOIN GROUP
// ========================

app.post("/api/groups/join", async (req, res) => {

    try {

        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                message: "Group code is required."
            });
        }

        const group = await Group.findOne({ code });

        if (!group) {
            return res.status(404).json({
                message: "Group not found."
            });
        }

        res.json({
            message: "Group joined successfully!",
            group: group
        });

    } catch (error) {

        console.error("Error joining group:", error);

        res.status(500).json({
            message: "Failed to join group."
        });

    }

});

// ========================
// TEACHER ACCESS
// ========================

app.post("/api/groups/teacher-access", async (req, res) => {

    try {

        const { code, teacherPassword } = req.body;


        if (!code || !teacherPassword) {

            return res.status(400).json({

                message:
                    "Group code and teacher password are required."

            });

        }


        const group =
            await Group.findOne({ code });


        if (!group) {

            return res.status(404).json({

                message:
                    "Group not found."

            });

        }


        // Check password

        const passwordMatch =
            await bcrypt.compare(
                teacherPassword,
                group.teacherPassword
            );


        if (!passwordMatch) {

            return res.status(401).json({

                message:
                    "Incorrect teacher password."

            });

        }


        res.json({

            message:
                "Teacher access granted!",

            group: {

                name: group.name,
                code: group.code

            }

        });


    } catch (error) {

        console.error(
            "Error during teacher access:",
            error
        );

        res.status(500).json({

            message:
                "Failed to verify teacher access."

        });

    }

});

// ========================
// UPDATE NOTICE
// ========================

app.put("/api/notices/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const updatedNotice = await Notice.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedNotice) {
            return res.status(404).json({
                message: "Notice not found."
            });
        }

        res.json({
            message: "Notice updated successfully!",
            notice: updatedNotice
        });

    } catch (error) {

        console.error("Error updating notice:", error);

        res.status(500).json({
            message: "Failed to update notice."
        });

    }

});


// ========================
// DELETE NOTICE
// ========================

app.delete("/api/notices/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const deletedNotice = await Notice.findByIdAndDelete(id);

        if (!deletedNotice) {
            return res.status(404).json({
                message: "Notice not found."
            });
        }

        res.json({
            message: "Notice deleted successfully!"
        });

    } catch (error) {

        console.error("Error deleting notice:", error);

        res.status(500).json({
            message: "Failed to delete notice."
        });

    }

});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});